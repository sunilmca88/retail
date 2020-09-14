$(document).ready(function () {

    $('[data-toggle="tooltip"]').tooltip();

    var loanOptions = {
        "Home Loan": "HL",
        "Top-up Loan": "TL",
        "Auto Loan": "AL",
        "Education Loan": "EL",
        "Mortgage Loan": "ML",
        "Personal Loan": "PL",
        "Loan against LIP": "LL",
        "Gold Loan": "GL"
    };
    var odOptions = {
        "Home Loan OD": "HLOD",
        "Mortgage Loan OD": "MLOD",
        "Personal Loan OD": "PLOD"
    };

    var isFRR = "" ; //for enabling and disabling borrower type dropdown
    var incomeSrc = ["Latest Sal/Rent/GMBR","Sal/Rent/GMBR of Feb 2020"];
    $("#accType").change(function () {
        var selectedAccType = $('option:selected', this).val();
        var $el = $("#accScheme");
        $el.empty();
        $('#applicants').empty(); // reset  borrower/coapplicant div
        $("#noOfApplicant").val("0"); // reset coapplicant dropdown to 0
        isFRR = ""; //to disable borrower type dropdown
        incomeSrc = ["Latest Sal/Rent/GMBR","Sal/Rent/GMBR of feb 2020"];
        if ("loan" === selectedAccType) {
            $.each(loanOptions, function (key, value) {
                $el.append($("<option></option>")
                    .attr("value", value).text(key));
            });
            $el.removeAttr("disabled");
            $('#unsrvcdInt').val("").attr('disabled', true);
            $('#sanctndAmt').val("").attr('disabled', true);
        } else if ("frr" === selectedAccType) {
            isFRR = "disabled";
            $el.append($("<option></option>")
                .attr("value", "frr").text("FRR")
            );
            $el.attr('disabled', true);
            $('#unsrvcdInt').val("").attr('disabled', true);
            $('#sanctndAmt').val("").attr('disabled', true);
            incomeSrc =  ["Latest Rent", "Rent in Feb 2020"];
        } else if ("od" === selectedAccType) {
            //isOD= "";
            $.each(odOptions, function (key, value) {
                $el.append($("<option></option>")
                    .attr("value", value).text(key));
            });
            $el.removeAttr("disabled");
            $('#unsrvcdInt').removeAttr("disabled");
            $('#sanctndAmt').removeAttr("disabled");
            
        } else {
            $el.attr('disabled', true);
        }
    });


    $("#noOfApplicant").change(function () {
        $('#applicants').empty();
        for (var i = 1; i <= $('option:selected', this).text(); i++) {
            var borrowerElem = '<div class="jumbotron"><div ><h5 class="alert alert-dark text-center" role="alert">Applicant #'+ i + 
            ' Details</h5></div><div class="row"><div class="col-sm-3"><label for="borrowerType-'+ i + '">Borrower Type</label>\
                <select id="borrowerType-'+ i + '" class="form-control" '+isFRR+'><option selected value="">Select</option><option value="sal">Salaried</option>\
                  <option value="oth">Other Individual</option></select></div><div class="col-sm-3"><label id="lblIncomeLatest-'+i+'" for="latestInc-'+ i + 
                  '">'+incomeSrc[0]+'</label><input type="tel" class="form-control" id="latestInc-'+ i + 
                  '"  placeholder="Enter Value"></div><div class="col-sm-3"><label id="lblIncomeFeb20-'+i+'" for="feb20Inc-'+ i + 
                  '">'+incomeSrc[1]+'</label><input type="tel" class="form-control" id="feb20Inc-'+ i + 
                  '" placeholder="Enter Value"></div><div class="col-sm-3"><label for="totalDeduction-'+ i + 
                  '">Total Deduction</label><input type="tel" class="form-control" id="totalDeduction-'+ i + 
                  '" placeholder="Enter Value" '+isFRR+'></div></div><br/><div class="row"><div class="col-sm-8"><label for="borrowerName-'+ i + 
                  '">Customer Name</label><input type="text" class="form-control" id="borrowerName-'+ i + 
                  '" placeholder="Enter Name"></div><div class="col-sm-4"style="text-align:center;"><label>Percentage Reduction in Salary</label><br/>\
                    <h3 class="badge badge-danger" style="font-size: x-large;" id="borrowerImpact-'+ i + 
                '"></h3></div></div></div>';
            $('#applicants').append(borrowerElem);
        }


        $( "input[id^='feb20Inc']" ).blur(function (){
            var elemIndex = $(this).attr('id').split('-')[1];
            console.log("Element Index : "+elemIndex);
            var stressValue = calculateStress($('#latestInc-'+elemIndex).val(), $(this).val());
            console.log(stressValue);
            $('#borrowerImpact-'+elemIndex).html(stressValue+'%');

        });

        $( "input[id^='latestInc']" ).blur(function (){
            var elemIndex = $(this).attr('id').split('-')[1];
            $('#feb20Inc-'+elemIndex).val("");
            $('#borrowerImpact-'+elemIndex).html("");
        });

            
    $("[id^='borrowerType']" ).change(function () {
        var elemIndex = $(this).attr('id').split('-')[1];
        var selectedBorrowerType = $('option:selected', this).val();
        console.log(elemIndex);
        console.log(selectedBorrowerType);
        if(selectedBorrowerType === "sal"){
            $('#lblIncomeLatest-'+elemIndex).text("Latest Salary");
            $('#lblIncomeFeb20-'+elemIndex).text("Salary in Feb 2020");
        }else  if(selectedBorrowerType === "oth"){
            $('#lblIncomeLatest-'+elemIndex).text("Latest GMBR");
            $('#lblIncomeFeb20-'+elemIndex).text("Previous GMBR");
        }else{
            $('#lblIncomeLatest-'+elemIndex).text("");
            $('#lblIncomeFeb20-'+elemIndex).text("");
        }
    });

        var calculateStress = function(latestInc, feb20Inc){
            console.log(latestInc +"\n"+ feb20Inc);
            console.log(feb20Inc-latestInc);
            return (((feb20Inc-latestInc)/feb20Inc)*100).toFixed(2);

        };

       
    });


});