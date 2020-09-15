$(document).ready(function () {

    $('[data-toggle="tooltip"]').tooltip(); //Initializing  tooltip

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
    var $noOfApplicant = $("#noOfApplicant");
    $accType.change(function () {        
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

    
    $noOfApplicant.change(function () {
        $('#applicants').empty(); // reset borrower/coapplicant div
        for (var i = 1; i <= $('option:selected', this).text(); i++) {
            var borrowerElem = '<div class="jumbotron"><div ><h5 class="alert alert-dark text-center" role="alert">Applicant #'+ i + 
            ' Details</h5></div><div class="row"><div class="col-sm-3"><label for="borrowerType-'+ i + '">Borrower Type</label>\
                <select id="borrowerType-'+ i + '" class="form-control" '+isFRR+'><option selected value="" disabled>Select</option><option value="sal">Salaried</option>\
                  <option value="oth">Other Individual</option></select></div><div class="col-sm-3"><label id="lblIncomeLatest-'+i+'" for="latestInc-'+ i + 
                  '">'+incomeSrc[0]+'</label><input type="tel" class="form-control" id="latestInc-'+ i + 
                  '"  placeholder="Enter Value"></div><div class="col-sm-3"><label id="lblIncomeFeb20-'+i+'" for="feb20Inc-'+ i + 
                  '">'+incomeSrc[1]+'</label><input type="tel" class="form-control" id="feb20Inc-'+ i + 
                  '" placeholder="Enter Value"></div><div class="col-sm-3"><label for="totalDeduction-'+ i + 
                  '">Total Deduction(Monthly)</label><input type="tel" class="form-control" id="totalDeduction-'+ i + 
                  '" placeholder="Enter Value" '+isFRR+'></div></div><br/>\
                  <div class="row"><div class="col-sm-4"><label id="lblfoir-'+i+'" for="foir-'+i+
                  '" data-toggle="tooltip" title="FOIR applicable as per present scheme guidelines in consonance with income level">\
                      FOIR <sup><span class="badge badge-warning">i</span></sup></label>\
                    <input type="tel" class="form-control" id="foir-'+i+'" placeholder="Enter Value"'+isFRR+'>\
                  </div><div class="col-sm-4"><label for="1920Profit-'+i+'">100% Net Profit of 2019-20 </label>\
                    <input type="tel" class="form-control" id="1920Profit-'+i+'" placeholder="Enter Value"'+isFRR+'>\
                  </div><div class="col-sm-4"><label id="lbl1819Profit-'+i+'" for="1819Profit-'+i+'" data-toggle="tooltip" title="If net profit of FY 2019-20 not available">\
                      100% Net Profit of FY 2018-19 <sup><span class="badge badge-warning">i</span></sup></label>\
                    <input type="tel" class="form-control" id="1819Profit-'+i+'" placeholder="Enter Value"'+isFRR+'></div></div><br/>\
                  <div class="row"><div class="col-sm-8"><label for="borrowerName-'+ i + '">Customer Name</label><input type="text" class="form-control" id="borrowerName-'+ i + 
                  '" placeholder="Enter Name"></div><div class="col-sm-4"style="text-align:center;"><label>Percentage Reduction in Salary</label><br/>\
                    <h3 class="badge badge-danger" style="font-size: x-large;" id="borrowerImpact-'+ i + 
                '"></h3></div></div></div>';
            $('#applicants').append(borrowerElem);
            $('#lblfoir-'+i).tooltip();
            $('#lbl1819Profit-'+i).tooltip();
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
    function calculateStress(latestInc, feb20Inc){
        console.log(latestInc +"\n"+ feb20Inc);
        console.log(feb20Inc-latestInc);
        console.log(feb20Inc-latestInc > 0);
        if(feb20Inc-latestInc >= 0){
            console.log("Calculated Stress: "+ parseFloat((((feb20Inc-latestInc)/feb20Inc)*100).toFixed(2)));
            return parseFloat((((feb20Inc-latestInc)/feb20Inc)*100).toFixed(2));
        }else{
            alert("Wrong data");
            return 0;
        }
       

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
        accObj.AppNo = $noOfApplicant.val();
        accObj.sanctndAmt = sanctndAmt.val().trim();
        accObj.sanctLTV = sanctLTV.val().trim();
        accObj.schmLTV = schmLTV.val().trim();
        accObj.prsntOutstdng = prsntOutstdng.val().trim();
        accObj.valOfSecurity = valOfSecurity.val().trim();
        accObj.proposedROI = proposedROI.val().trim();
        accObj.unsrvcdInt = unsrvcdInt.val().trim();
        accObj.estIntMoratorium = estIntMoratorium.val().trim();
        accObj.blncLoanTenure = blncLoanTenure.val().trim();
        accObj.blncPeriodRetirement = blncPeriodRetirement.val().trim();
        console.log("Account Level Object : "+ JSON.stringify(accObj));

    };
    /*******Account level object creation ends here********/
    window.LTVObj = {};
    function calculateLTV(){
        LTVObj.case1 = parseFloat((prsntOutstdng.val().trim()/valOfSecurity.val().trim()).toFixed(2));
        LTVObj.case2 = parseFloat(((sanctndAmt.val().trim()+unsrvcdInt.val().trim())/valOfSecurity.val().trim()).toFixed(2));
        LTVObj.case3 = parseFloat(((prsntOutstdng.val().trim()+estIntMoratorium.val().trim())/valOfSecurity.val().trim()).toFixed(2));
        LTVObj.case4 = parseFloat(((sanctndAmt.val().trim()+estIntMoratorium.val().trim())/valOfSecurity.val().trim()).toFixed(2));
        LTVObj.case5 = parseFloat(((sanctndAmt.val().trim()+estIntMoratorium.val().trim()+unsrvcdInt.val().trim())/valOfSecurity.val().trim()).toFixed(2));
        console.log("LTV Object : "+ JSON.stringify(LTVObj));
    }
    // var salariedLatestInc = 0,
    //     salariedFeb20Inc = 0,
    //     otherLatestInc = 0,
    //     otherFeb20Inc = 0;
    window.salStressPercentageConsolidated;
    window.othStressPercentageConsolidated;
    function calculateConsolidatedIncome(){
        salStressPercentageConsolidated = 0;
        othStressPercentageConsolidated = 0;
        var salariedLatestInc = 0,
            salariedFeb20Inc = 0,
            otherLatestInc = 0,
            otherFeb20Inc = 0,
            noOfApplicant = $noOfApplicant.val();

        for(i=1; i<=noOfApplicant; i++){
            if($('#borrowerType-'+i).val() === "sal"){
                console.log("Latest Salary : "+ $('#latestInc-'+i).val().trim());
                salariedLatestInc += parseFloat($('#latestInc-'+i).val().trim());
                console.log("i:------> "+salariedLatestInc);
                salariedFeb20Inc += parseFloat($('#feb20Inc-'+i).val().trim());
                console.log("i:------> "+salariedFeb20Inc);
            }
            if($('#borrowerType-'+i).val() === "oth"){
                otherLatestInc += parseFloat($('#latestInc-'+i).val().trim());
                otherFeb20Inc += parseFloat($('#feb20Inc-'+i).val().trim());
            }
        }
        salStressPercentageConsolidated = calculateStress(salariedLatestInc, salariedFeb20Inc) || 0;
        othStressPercentageConsolidated = calculateStress(otherLatestInc, otherFeb20Inc) || 0;
        console.log("salStressPercentageConsolidated: "+salStressPercentageConsolidated);
        console.log("othStressPercentageConsolidated: "+ othStressPercentageConsolidated);
    }
    window.stressObj = {};
    var resolutionFramework = [];
    var stressType = "";
    /****************Calculations Starts Here*************** */
    $('#btnCalculate').click(function(){
        createAccObject(); //To Create Account level object
        calculateLTV(); //To Calculate LTV for all scenario
        calculateConsolidatedIncome();
        stressObj = {};
        resolutionFramework = [];
        stressType = "";
        if( $accType.val() === "frr"){
            var stressPercentage = calculateStress($('#latestInc-1').val().trim(), $('#feb20Inc-1').val().trim());
            var caseType = "";
            var LTV = [];
            var maxOfSchmSnctdLTV = parseFloat(Math.max(sanctLTV.val().trim(), schmLTV.val().trim())).toFixed(2);
            var maxOfBlncTenureRetirementAge = parseInt(Math.max(blncLoanTenure.val().trim(), blncPeriodRetirement.val().trim()), 10);
            console.log("maxOfSchmSnctdLTV : "+maxOfSchmSnctdLTV);
            console.log("maxOfBlncTenureRetirementAge : "+maxOfBlncTenureRetirementAge);
            if(stressPercentage <= 25){
                caseType = "Case-4";
                resolutionFramework = ["NA"];
                stressType = "Minimum Stress";
            }else if(stressPercentage > 25 && stressPercentage <= 40){
                caseType = "Case-5";
                resolutionFramework = ["R1","R2"];
                if(LTVObj.case1 <= maxOfSchmSnctdLTV)
                    LTV[0] = LTVObj.case1;
                // else
                //     LTV[0] = 0;
                stressType = "Mild Stress";
            }else if(stressPercentage > 40 && stressPercentage < 100){
                caseType = "Case-6";
                resolutionFramework = ["R1","R2","M1","M2","M1R1","M1R2","M2R1","M2R2"];
                if(LTVObj.case1 <= maxOfSchmSnctdLTV)
                    LTV[0] = LTVObj.case1;
                // else
                //     LTV[0] = 0;

                if(LTVObj.case3 <= maxOfSchmSnctdLTV)
                    LTV[1] = LTVObj.case3;
                // else
                //     LTV[1] = 0;
                
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