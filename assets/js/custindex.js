$(document).ready(function () {

    /******Variable Initialisation starts here******/
   
    window.salStressPercentageConsolidated = 0;
    window.othStressPercentageConsolidated = 0;

    var loanOptions = {
        "Select":"",
        "Home Loan": "HL",
        "Top-up Loan": "TL",
        "Auto Loan": "AL",
        "Education Loan with Security": "ELWS",
        "Education Loan without Security": "ELWoS",
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
  
    var $accType = $("#accType");
    var $accSchm = $("#accScheme");
    var $noOfApplicant = $("#noOfApplicant");
    /******Variable Initialisation ends here******/

    /******Default function Initialisation starts here******/
    $('[data-toggle="tooltip"]').tooltip(); //Initializing  tooltip
    $('#rowSal').hide();
    $('#rowGMBR').hide();
    $('#rowRent').hide();
    $('#rowResult').hide();

   // $('#staticBackdrop').modal();
    /******Default function Initialisation ends here******/

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
            
            $('#rowSal').show();
            $('#rowGMBR').show();
            $('#rowRent').hide();   
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
            
            $('#rowSal').hide();
            $('#rowGMBR').hide();
            $('#rowRent').show();   
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

            $('#rowSal').show();
            $('#rowGMBR').show();
            $('#rowRent').hide();            
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
                  </div><div class="col-sm-4"><label for="netProfitYr-'+i+'">Net Profit Year</label><select id="netProfitYr-'+i+
                  '" class="form-control" '+isFRR+'><option selected value="" disabled>Select</option><option value="yr1920">2019-2020</option>\
                  <option value="yr1819">2018-2019</option></select></div>\
                  <div class="col-sm-4"><label for="1920Profit-'+i+'">100% Net Profit <span id="year"></span></label>\
                    <input type="tel" class="form-control" id="1920Profit-'+i+'" placeholder="Enter Value" '+isFRR+'>\
                  </div></div><br/>\
                  <div class="row"><div class="col-sm-8"><label for="borrowerName-'+ i + '">Customer Name</label><input type="text" class="form-control" id="borrowerName-'+ i + 
                  '" placeholder="Enter Name"></div><div class="col-sm-4"style="text-align:center;"><label>Percentage Reduction in Salary</label><br/>\
                    <h3 class="badge badge-danger" style="font-size: x-large;" id="borrowerImpact-'+ i + 
                '"></h3></div></div></div>';
            $('#applicants').append(borrowerElem);
            $('#lblfoir-'+i).tooltip();
            //$('#lbl1819Profit-'+i).tooltip();
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
        
        $("[id^='netProfitYr']" ).change(function () {
            var selectedYr = $('option:selected', this).val();
            if(selectedYr === 'yr1920')
                $('#year').text('of 2019-2020');
            else
                $('#year').text('of 2018-2019');
            console.log($('option:selected', this).val());
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
                $('#netProfitYr-'+elemIndex).val("").attr('disabled', true);
            }else  if(selectedBorrowerType === "oth"){
                $('#lblIncomeLatest-'+elemIndex).text("Latest GMBR");
                $('#lblIncomeFeb20-'+elemIndex).text("Previous GMBR");
                $('#1920Profit-'+elemIndex).val("").removeAttr('disabled')
                $('#netProfitYr-'+elemIndex).val("").removeAttr('disabled')
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

    
    function calculateConsolidatedIncome(accType){
        var consolidatedCaseType = "";
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


    //function 
    /****************Calculations Starts Here*************** */
    $('#btnCalculate').click(function(){
        var accountType = $accType.val(); 
        stressObj = {}; //resetting global variable
        resolutionFramework = []; //resetting global variable
        stressType = ""; //resetting global variable
        LTV = [];
        createAccObject(); //To Create Account level object
        calculateLTV(); //To Calculate LTV for all scenario

        maxOfSchmSnctdLTV = parseFloat(Math.max(sanctLTV.val().trim(), schmLTV.val().trim())).toFixed(2);
       // maxOfBlncTenureRetirementAge = parseInt(Math.max(blncLoanTenure.val().trim(), blncPeriodRetirement.val().trim()), 10);
            
        if(accountType  === "frr"){
            var stressPercentageFRR = calculateStress($('#latestInc-1').val().trim(), $('#feb20Inc-1').val().trim()) || 0;
            //var caseType = "";
            console.log("maxOfSchmSnctdLTV : "+maxOfSchmSnctdLTV);
           // console.log("maxOfBlncTenureRetirementAge : "+maxOfBlncTenureRetirementAge);
            if(stressPercentageFRR <= 25 || stressPercentageFRR === 0){
                stressObj.case = "case-4";
                stressObj.resolutionFramework = ["NA"];
                stressObj.stressType = "Minimum Stress";
            }else if(stressPercentageFRR > 25 && stressPercentageFRR <= 40){
                stressObj.case = "case-5";
                stressObj.resolutionFramework = ["R1","R2"];
                if(LTVObj.case1 <= maxOfSchmSnctdLTV)
                    LTV[0] = LTVObj.case1;
                // else
                //     LTV[0] = 0;
                stressObj.stressType = "Mild Stress";
            }else if(stressPercentageFRR > 40 && stressPercentageFRR < 100){
                stressObj.case = "case-6";
                stressObj.resolutionFramework = ["R1","R2","M1","M2","M1R1","M1R2","M2R1","M2R2"];
                if(LTVObj.case1 <= maxOfSchmSnctdLTV)
                    LTV[0] = LTVObj.case1;
                // else
                //     LTV[0] = 0;
                if(LTVObj.case3 <= maxOfSchmSnctdLTV)
                    LTV[1] = LTVObj.case3;
                // else
                //     LTV[1] = 0;                
                stressObj.stressType = "Severe Stress";
            }else if(stressPercentageFRR == 100){
                stressObj.case = "case-11";
                stressObj.resolutionFramework = ["M2","M2R1","M2R2"];
                if(LTVObj.case3 <= maxOfSchmSnctdLTV)
                    LTV[1] = LTVObj.case3;
                // else
                    //     LTV[1] = 0;           
                stressType = "Severe Stress";
            }else{
                stressObj.case = "nocase";
                stressObj.stressType.resolutionFramework = ["NA"];
            }
            console.log(LTV);
            stressObj.stressPercentage = stressPercentageFRR;
            stressObj.acctype = "frr";            
            stressObj.LTV = LTV;
           // stressObj.case = caseType;
           // stressObj.stressType = stressType;
           // stressObj.resolutionFramework = resolutionFramework; 
            console.log("stressObj : "+ JSON.stringify(stressObj));

            //console.log("JSON Parse : "+JSON.parse(stressObj));
        }else if(accountType  === "loan"){
            calculateConsolidatedIncome("loan");
           
        }else if(accountType  === "od"){
            calculateConsolidatedIncome("od");
        }else{
            
            console.log("Account Type None");
        }
    });
    
    /****************Calculations Ends Here*************** */
});