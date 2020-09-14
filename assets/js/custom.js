$(document).ready(function () {

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

    var isFRR = "" , isOD = "disabled"; //for enabling and disabling borrower type dropdown
    $("#accType").change(function () {
        var selectedAccType = $('option:selected', this).val();
        var $el = $("#accScheme");
        $el.empty();
        $('#applicants').empty(); // reset  borrower/coapplicant div
        $("#noOfApplicant").val("0"); // reset coapplicant dropdown to 0
        isFRR = ""; //to disable borrower type dropdown
        isOD = "disabled" //to disable Unserviced Interest textbox
        if ("loan" === selectedAccType) {
            $.each(loanOptions, function (key, value) {
                $el.append($("<option></option>")
                    .attr("value", value).text(key));
            });
            $el.removeAttr("disabled");
        } else if ("frr" === selectedAccType) {
            isFRR = "disabled";
            $el.append($("<option></option>")
                .attr("value", "frr").text("FRR")
            );
            $el.attr('disabled', true);
        } else if ("od" === selectedAccType) {
            isOD= "";
            $.each(odOptions, function (key, value) {
                $el.append($("<option></option>")
                    .attr("value", value).text(key));
            });
            $el.removeAttr("disabled");
        } else {
            $el.attr('disabled', true);
        }

    });


    $("#noOfApplicant").change(function () {
        $('#applicants').empty();
        for (var i = 1; i <= $('option:selected', this).text(); i++) {
            var borrowerElem = '<div class="jumbotron"><div ><h5 class="alert alert-dark text-center" role="alert">Applicant #'+ i + 
            ' Details</h5></div><div class="row"><div class="col-sm-3"><label for="borrowerType-'+ i + '">Borrower Type</label>\
                <select id="borrowerType-'+ i + '" class="form-control" '+isFRR+'><option selected>Select</option><option >Salaried</option>\
                  <option >Other Individual</option></select></div><div class="col-sm-3"><label for="latestSal-'+ i + 
                  '">Latest Salary/GMBR/Rent</label><input type="email" class="form-control" id="latestSal-'+ i + 
                  '"  placeholder="Enter Value"></div><div class="col-sm-3"><label for="feb20Salary-'+ i + 
                  '">Salary/Rent in Feb 2020</label><input type="email" class="form-control" id="feb20Salary-'+ i + 
                  '" placeholder="Enter Value"></div><div class="col-sm-3"><label for="totalDeduction-'+ i + 
                  '">Total Deduction</label><input type="email" class="form-control" id="totalDeduction-'+ i + 
                  '" placeholder="Enter Value"></div></div><br/><div class="row"><div class="col-sm-6"><label for="borrowerName-'+ i + 
                  '">Customer Name</label><input type="email" class="form-control" id="borrowerName-'+ i + 
                  '" placeholder="Enter Name"></div><div class="col-sm-3"><label for="unservicedInt-'+ i + 
                  '">Unserviced Interest</label><input type="email" class="form-control" id="unservicedInt-'+ i + 
                  '" placeholder="Enter Value" '+isOD+'></div><div class="col-sm-3"style="text-align:center;"><label>Percentage reduction in salary</label><br/>\
                    <h3 class="badge badge-danger" style="font-size: x-large;" id="borrowerImpact-'+ i + 
                '"></h3></div></div></div>';
            $('#applicants').append(borrowerElem);
        }


        $( "input[id^='feb20Salary']" ).blur(function (){
            var elemIndex = $(this).attr('id').split('-')[1];
            console.log("Element Index : "+elemIndex);
            var stressValue = calculateStress($('#latestSal-'+elemIndex).val(), $(this).val());
            console.log(stressValue);
            $('#borrowerImpact-'+elemIndex).html(stressValue+'%');

        });

        $( "input[id^='latestSal']" ).blur(function (){
            var elemIndex = $(this).attr('id').split('-')[1];
            $('#feb20Salary-'+elemIndex).val("");
            $('#borrowerImpact-'+elemIndex).html("");
        });

        var calculateStress = function(latestInc=0, feb20Inc=0){
            console.log(latestInc +"\n"+ feb20Inc);
            console.log(feb20Inc-latestInc);
            return (((feb20Inc-latestInc)/latestInc)*100).toFixed(2);

        }

       
    });


});