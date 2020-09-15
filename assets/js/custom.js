$(document).ready(function () {

    $('[data-toggle="tooltip"]').tooltip();

    var loanOptions = {
        "Select":"",
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
        "Select":"",
        "Home Loan OD": "HLOD",
        "Mortgage Loan OD": "MLOD",
        "Personal Loan OD": "PLOD"
    };

    var noOfApplicantOpt = {
        "1":"1",
        "2":"2",
        "3":"3",
        "4":"4",
        "5":"5",
        "6":"6",
        "7":"7",
        "8":"8",
        "9":"9",
        "10":"10"
    };
    var isFRR = "" ; //for enabling and disabling borrower type dropdown
    var incomeSrc = ["Latest Sal/Rent/GMBR","Sal/Rent/GMBR of Feb 2020"];
    var $accType = $("#accType");
    var $accSchm = $("#accScheme");
    $accType.change(function () {
        var $noOfApplicant = $("#noOfApplicant");
        $noOfApplicant.removeAttr('disabled');
        $noOfApplicant.empty();
        var selectedAccType = $('option:selected', this).val();
        
        $accSchm.empty();
        $('#applicants').empty(); // reset  borrower/coapplicant div
        //$("#noOfApplicant").val("0"); // reset coapplicant dropdown to 0
        isFRR = ""; //to disable borrower type dropdown
        incomeSrc = ["Latest Sal/Rent/GMBR","Sal/Rent/GMBR of feb 2020"];
        if ("loan" === selectedAccType) {
            /********Updating Scheme Options Starts here**************/
            $.each(loanOptions, function (key, value) {
                $accSchm.append($("<option></option>")
                    .attr("value", value).text(key));
            });
            /********Updating Scheme Options Ends here**************/
            $accSchm.removeAttr("disabled");
            
            /********Updating No of Applicants Options Starts here**************/
            $.each(noOfApplicantOpt, function (key, value) {
                $noOfApplicant.append($("<option></option>")
                    .attr("value", value).text(key));
            });
            /********Updating No of Applicants Options Ends here**************/
            
            $('#unsrvcdInt').val("").attr('disabled', true);
            $('#sanctndAmt').val("").attr('disabled', true);
        } else if ("frr" === selectedAccType) {
            isFRR = "disabled";
            $accSchm.append($("<option></option>")
                .attr("value", "frr").text("FRR")
            );
            $accSchm.attr('disabled', true);

            /********Updating No of Applicants Options Starts here**************/
            $noOfApplicant.append($("<option></option>")
                .attr("value", "1").text("1")).attr('disabled',true);
            /********Updating No of Applicants Options Ends here**************/
            

            $('#unsrvcdInt').val("").attr('disabled', true);
            $('#sanctndAmt').val("").attr('disabled', true);
            incomeSrc =  ["Latest Rent", "Rent in Feb 2020"];
        } else if ("od" === selectedAccType) {
            //isOD= "";
            /********Updating Scheme Options Starts here**************/
            $.each(odOptions, function (key, value) {
                $accSchm.append($("<option></option>")
                    .attr("value", value).text(key));
            });
            /********Updating Scheme Options Ends here**************/
            $accSchm.removeAttr("disabled");
            
            /********Updating No of Applicants Options Starts here**************/
             $.each(noOfApplicantOpt, function (key, value) {
                $noOfApplicant.append($("<option></option>")
                    .attr("value", value).text(key));
            });
            /********Updating No of Applicants Options Ends here**************/

            $('#unsrvcdInt').removeAttr("disabled");
            $('#sanctndAmt').removeAttr("disabled");
            
        } else {
            $accSchm.attr('disabled', true);
        }
        $noOfApplicant.val("1").change();
    });


    $("#noOfApplicant").change(function () {
        $('#applicants').empty();
        for (var i = 1; i <= $('option:selected', this).text(); i++) {
            var borrowerElem = '<div class="jumbotron"><div ><h5 class="alert alert-dark text-center" role="alert">Applicant #'+ i + 
            ' Details</h5></div><div class="row"><div class="col-sm-3"><label for="borrowerType-'+ i + '">Borrower Type</label>\
                <select id="borrowerType-'+ i + '" class="form-control" '+isFRR+'><option selected value="" disabled>Select</option><option value="sal">Salaried</option>\
                  <option value="oth">Other Individual</option></select></div><div class="col-sm-3"><label id="lblIncomeLatest-'+i+'" for="latestInc-'+ i + 
                  '">'+incomeSrc[0]+'</label><input type="tel" class="form-control" id="latestInc-'+ i + 
                  '"  placeholder="Enter Value"></div><div class="col-sm-3"><label id="lblIncomeFeb20-'+i+'" for="feb20Inc-'+ i + 
                  '">'+incomeSrc[1]+'</label><input type="tel" class="form-control" id="feb20Inc-'+ i + 
                  '" placeholder="Enter Value"></div><div class="col-sm-3"><label for="totalDeduction-'+ i + 
                  '">Total Deduction</label><input type="tel" class="form-control" id="totalDeduction-'+ i + 
                  '" placeholder="Enter Value" '+isFRR+'></div></div><br/>\
                  <div class="row"><div class="col-sm-4"><label for="foir-'+i+
                  '" data-toggle="tooltip" title="FOIR applicable as per present scheme guidelines in consonance with income level">\
                      FOIR <sup><span class="badge badge-warning">i</span></sup></label>\
                    <input type="tel" class="form-control" id="foir-'+i+'" placeholder="Enter Value"'+isFRR+'>\
                  </div><div class="col-sm-4"><label for="1920Profit-'+i+'">100% Net Profit of 2019-20 </label>\
                    <input type="tel" class="form-control" id="1920Profit-'+i+'" placeholder="Enter Value"'+isFRR+'>\
                  </div><div class="col-sm-4"><label for="1819Profit-'+i+'" data-toggle="tooltip" title="If net profit of FY 2019-20 not available">\
                      100% Net Profit of FY 2018-19 <sup><span class="badge badge-warning">i</span></sup></label>\
                    <input type="tel" class="form-control" id="1819Profit-'+i+'" placeholder="Enter Value"'+isFRR+'></div></div><br/>\
                  <div class="row"><div class="col-sm-8"><label for="borrowerName-'+ i + '">Customer Name</label><input type="text" class="form-control" id="borrowerName-'+ i + 
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
                $('#1920Profit-'+elemIndex).val("").attr('disabled', true);
                $('#1819Profit-'+elemIndex).val("").attr('disabled', true);
            }else  if(selectedBorrowerType === "oth"){
                $('#lblIncomeLatest-'+elemIndex).text("Latest GMBR");
                $('#lblIncomeFeb20-'+elemIndex).text("Previous GMBR");
                $('#1920Profit-'+elemIndex).val("").removeAttr('disabled')
                $('#1819Profit-'+elemIndex).val("").removeAttr('disabled')
            }else{
                $('#lblIncomeLatest-'+elemIndex).text("");
                $('#lblIncomeFeb20-'+elemIndex).text("");
            }
        });
    });
    var calculateStress = function(latestInc, feb20Inc){
        console.log(latestInc +"\n"+ feb20Inc);
        console.log(feb20Inc-latestInc);
        return (((feb20Inc-latestInc)/feb20Inc)*100).toFixed(2);

    };

    /*******Account level object creation starts here********/
    window.accObj = {};

    var sanctndAmt =  $('#sanctndAmt'),
        sanctLTV = $('#sanctLTV'),
        schmLTV = $('#schmLTV'),
        prsntOutstdng = $('#prsntOutstdng'),
        valOfSecurity = $('#valOfSecurity'),
        proposedROI = $('#proposedROI'),
        unsrvcdInt = $('#unsrvcdInt'),
        estIntMoratorium = $('#estIntMoratorium'),
        blncLoanTenure = $('#blncLoanTenure'),
        blncPeriodRetirement = $('#blncPeriodRetirement');



    function createAccObject(){
        accObj = {};
        console.log("Inside Create Acc Object Function : "+$accType.val());
        var accType = $accType.val(),
            accSchm = $accSchm.val(),
            accNo = $('#accNo').val().trim();
        if(accType == null || accType == ""){
            alert("Error! Please select account type");
        }else{
            accObj.accType =  accType;
        }
        
        if(accSchm == "" || accSchm == null){
            alert("Error! Please select account scheme");
        }else{
            accObj.scheme =  accSchm;
        }
        
        if(accNo == "" || accNo.length != 14){
            alert("Invalid Account Number")
        }else{
            accObj.accNo = accNo;
        }
        accObj.AppNo = $("#noOfApplicant").val();
        accObj.sanctndAmt = sanctndAmt.val().trim();
        accObj.sanctLTV = sanctLTV.val().trim();;
        accObj.schmLTV = schmLTV.val().trim();;
        accObj.prsntOutstdng = prsntOutstdng.val().trim();;
        accObj.valOfSecurity = valOfSecurity.val().trim();;
        accObj.proposedROI = proposedROI.val().trim();
        accObj.unsrvcdInt = unsrvcdInt.val().trim();;
        accObj.estIntMoratorium = estIntMoratorium.val().trim();;
        accObj.blncLoanTenure = blncLoanTenure.val().trim();
        accObj.blncPeriodRetirement = blncPeriodRetirement.val().trim();
        console.log("Account Level Object : "+ JSON.stringify(accObj));

    };
    /*******Account level object creation ends here********/
    window.LTVObj = {};
    function calculateLTV(){
        LTVObj.case1 = (prsntOutstdng.val().trim()/valOfSecurity.val().trim()).toFixed(2);
        LTVObj.case2 = ((sanctndAmt.val().trim()+unsrvcdInt.val().trim())/valOfSecurity.val().trim()).toFixed(2);
        LTVObj.case3 = ((prsntOutstdng.val().trim()+estIntMoratorium.val().trim())/valOfSecurity.val().trim()).toFixed(2);
        LTVObj.case4 = ((sanctndAmt.val().trim()+estIntMoratorium.val().trim())/valOfSecurity.val().trim()).toFixed(2);
        LTVObj.case5 = ((sanctndAmt.val().trim()+estIntMoratorium.val().trim()+unsrvcdInt.val().trim())/valOfSecurity.val().trim()).toFixed(2);
        console.log("LTV Object : "+ JSON.stringify(LTVObj));
    }


    window.stressObj = {};
    var resolutionFramework = [];
    var stressType = "";
    /****************Calculations Starts Here*************** */
    $('#btnCalculate').click(function(){
        createAccObject(); //To Create Account level object
        calculateLTV(); //To Calculate LTV for all scenario
        stressObj = {};
        resolutionFramework = [];
        stressType = "";
        if( $accType.val() === "frr"){
            var stressPercentage = calculateStress($('#latestInc-1').val().trim(), $('#feb20Inc-1').val().trim());
            var caseType = "";
            var LTV = [];
            if(stressPercentage <= 25){
                caseType = "Case-4";
                resolutionFramework = ["NA"];
                stressType = "Minimum Stress";
            }else if(stressPercentage > 25 && stressPercentage <= 40){
                caseType = "Case-5";
                resolutionFramework = ["R1","R2"];
                LTV[0] = LTVObj.case1;
                stressType = "Mild Stress";
            }else if(stressPercentage > 40 && stressPercentage < 100){
                caseType = "Case-6";
                resolutionFramework = ["R1","R2","M1","M2","M1R1","M1R2","M2R1","M2R2"];
                LTV[0] = LTVObj.case1;
                LTV[1] = LTVObj.case3;
                stressType = "Severe Stress";
            }else if(stressPercentage == 100){
                caseType = "Case-11";
                resolutionFramework = ["M2","M2R1","M2R2"];
                LTV[0] = LTVObj.case3;
                stressType = "Severe Stress";
            }else{
                caseType = "NoCase";
                resolutionFramework = ["NA"];
            }
            console.log(LTV);
            stressObj.stressPercentage = stressPercentage;
            stressObj.acctype = "frr";
            stressObj.case = caseType;
            stressObj.stressType = stressType;
            stressObj.LTV = LTV;
            stressObj.resolutionFramework = resolutionFramework; 
            console.log("stressObj : "+ JSON.stringify(stressObj));

            //console.log("JSON Parse : "+JSON.parse(stressObj));
        }else{
            console.log("None");
        }
    });
    
    /****************Calculations Ends Here*************** */
});