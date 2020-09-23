$(document).ready(function () {

    /******Variable Initialisation starts here******/
   
    window.salStressPercentageConsolidated = 0;
    window.othStressPercentageConsolidated = 0;

  /*  var loanOptions = {
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
    var $noOfApplicant = $("#noOfApplicant");*/
    var $borrowerType = $('#borrowerType');
    var $gmbrType = $('#gmbrType'), selectedBorrowerType = "";
    /******Variable Initialisation ends here******/

    /******Default function Initialisation starts here******/
    $('[data-toggle="tooltip"]').tooltip(); //Initializing  tooltip
    $('#rowSal').hide();
    $('#rowGMBR').hide();
    $('#rowRent').hide();
    $('#rowResult').hide();
    $('#btnChkElgblty').attr('disabled', true);
   // $('#staticBackdrop').modal();
    /******Default function Initialisation ends here******/

    $borrowerType.change(function(){
        $('#txtCombinedLatestSalary').val("");
        $('#txtCombinedFeb20Salary').val("");
        $('#txtCombinedLatestGMBR').val("");
        $('#txtCombinedFeb20GMBR').val("");
        $('#gmbrType').val("GMBR2019").change();
        $('#txtLatestRent').val("");
        $('#txtFeb20Rent').val("");

        $('#rowResult').hide();
        selectedBorrowerType = $('option:selected', this).val();
        if("sal" === selectedBorrowerType){
            $('#rowSal').show();
            $('#rowGMBR').hide();
            $('#rowRent').hide();   
        }else if("oth" === selectedBorrowerType){
            $('#rowSal').hide();
            $('#rowGMBR').show();
            $('#rowRent').hide();   
        }else if("salAndOth" === selectedBorrowerType){
            $('#rowSal').show();
            $('#rowGMBR').show();
            $('#rowRent').hide();   
        }else if("laFrr" === selectedBorrowerType){
            $('#rowSal').hide();
            $('#rowGMBR').hide();
            $('#rowRent').show();   
        }else{
            $('#errTxt').text("There is some error on page");
            $('#staticBackdrop').modal();
            $('#btnChkElgblty').attr('disabled', true);
        }
        $('#btnChkElgblty').removeAttr('disabled');
    });

    $gmbrType.change(function(){
        $('#rowResult').hide();
        $('#txtCombinedFeb20GMBR').val("");
        var selectedGMBRType = $('option:selected', this).val();
        if("GMBR2019" === selectedGMBRType){
            $('#lblGMBR1920').html("Combined GMBR of all Other Individuals during Same month in 2019 <sup><span class='badge badge-warning'>i</span></sup>");
            
        }else if("GMBR2020" === selectedGMBRType){
            $('#lblGMBR1920').html("Combined GMBR of all Other Individuals during Feb2020 <sup><span class='badge badge-warning'>i</span></sup>");
        }else{
            $('#errTxt').text("There is some error on page");
            $('#staticBackdrop').modal();
        }
    });

   
    function calculateStress(latestInc, feb20Inc){
        console.log(latestInc +"\n"+ feb20Inc);
        console.log(feb20Inc-latestInc);
        console.log(feb20Inc-latestInc > 0);
        if(feb20Inc-latestInc >= 0){
            console.log("Calculated Stress: "+ parseFloat((((feb20Inc-latestInc)/feb20Inc)*100).toFixed(2)));
            return parseFloat((((feb20Inc-latestInc)/feb20Inc)*100).toFixed(2));
        }else{
            $('#errTxt').text("There is some error in entered data. Please recheck.");
            $('#staticBackdrop').modal();
            return 0;
        }
    };

    $('#btnChkElgblty').click(function(){
        $('#rowResult').hide();
        var latestInc = 0, feb20Inc = 0, stressPercentage = 0;
        if("sal" === selectedBorrowerType){
            latestInc = $('#txtCombinedLatestSalary').val().trim();
            feb20Inc = $('#txtCombinedFeb20Salary').val().trim();
            if("" != latestInc && "" != feb20Inc && $.isNumeric(latestInc) && $.isNumeric(feb20Inc)){
                stressPercentage = calculateStress(latestInc, feb20Inc) || 0;
                if(stressPercentage <= 25){
                    $('#result').html("You are <b>not eligible</b> as Stress percentage is <b>" +stressPercentage+"%</b>");
                    $('#rowResult').show();
                }else{
                    $('#result').html("You are <b>eligible</b> as Stress percentage is <b>" +stressPercentage+"%</b>");
                    $('#rowResult').show();
                }                
            }else{
                $('#errTxt').text("All fields are mandatory and only numbers are allowed");
                $('#staticBackdrop').modal();
            }
           
        }else if("oth" === selectedBorrowerType){
            latestInc = $('#txtCombinedLatestGMBR').val().trim();
            feb20Inc = $('#txtCombinedFeb20GMBR').val().trim();
            if("" != latestInc && "" != feb20Inc && $.isNumeric(latestInc) && $.isNumeric(feb20Inc)){
                stressPercentage = calculateStress(latestInc, feb20Inc) || 0;
                if(stressPercentage < 50){
                    $('#result').html("You are <b>not eligible</b> as Stress percentage is <b>" +stressPercentage+"%</b>");
                    $('#rowResult').show();
                }else{
                    $('#result').html("You are <b>eligible</b> as Stress percentage is <b>" +stressPercentage+"%</b>");
                    $('#rowResult').show();
                }
            }else{
                $('#errTxt').text("All fields are mandatory and only numbers are allowed");
                $('#staticBackdrop').modal();
            }
        }else if("salAndOth" === selectedBorrowerType){
            latestInc = $('#txtCombinedLatestSalary').val().trim();
            feb20Inc = $('#txtCombinedFeb20Salary').val().trim();
            var latestGMBR = $('#txtCombinedLatestGMBR').val().trim();
            var feb20GMBR = $('#txtCombinedFeb20GMBR').val().trim();
            if(
                ("" != latestInc && "" != feb20Inc && $.isNumeric(latestInc) && $.isNumeric(feb20Inc)) &&
                ("" != latestGMBR && "" != feb20GMBR && $.isNumeric(latestGMBR) && $.isNumeric(feb20GMBR))
            ){
                var salStressPercentage = calculateStress(latestInc, feb20Inc) || 0;
                var GMBRStressPercentage = calculateStress(latestGMBR, feb20GMBR) || 0;
                if(salStressPercentage <= 25 && GMBRStressPercentage < 50){
                    $('#result').html("You are <b>not eligible</b> as Stress percentage of Salary Income is  <b>" +salStressPercentage+"%</b>"+
                    "and that of GMBR Income is <b>"+ GMBRStressPercentage +"%</b>");
                    $('#rowResult').show();
                }else{
                    $('#result').html("You are <b>eligible</b> as Stress percentage of Salary Income is  <b>" +salStressPercentage+"%</b>"+
                    "and that of GMBR Income is <b>"+ GMBRStressPercentage +"%</b>");
                    $('#rowResult').show();
                }                
            }else{
                $('#errTxt').text("All fields are mandatory and only numbers are allowed");
                $('#staticBackdrop').modal();
            }
        }else if("laFrr" === selectedBorrowerType){
            latestInc = $('#txtLatestRent').val().trim();
            feb20Inc = $('#txtFeb20Rent').val().trim();
            if("" != latestInc && "" != feb20Inc && $.isNumeric(latestInc) && $.isNumeric(feb20Inc)){
                stressPercentage = calculateStress(latestInc, feb20Inc) || 0;
                if(stressPercentage <= 25){
                    $('#result').html("You are <b>not eligible</b> as Stress percentage is <b>" +stressPercentage+"%</b>");
                    $('#rowResult').show();
                }else{
                    $('#result').html("You are <b>eligible</b> as Stress percentage is <b>" +stressPercentage+"%</b>");
                    $('#rowResult').show();
                }
            }else{
                $('#errTxt').text("All fields are mandatory and only numbers are allowed");
                $('#staticBackdrop').modal();
            }  
        }else{
            $('#errTxt').text("There is some error on page");
            $('#staticBackdrop').modal();
        }

    });

    
  
    /****************Calculations Ends Here*************** */
});