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
    var $gmbrType = $('#gmbrType');
    /******Variable Initialisation ends here******/

    /******Default function Initialisation starts here******/
    $('[data-toggle="tooltip"]').tooltip(); //Initializing  tooltip
    $('#rowSal').hide();
    $('#rowGMBR').hide();
    $('#rowRent').hide();
    $('#rowResult').hide();

   // $('#staticBackdrop').modal();
    /******Default function Initialisation ends here******/

    $borrowerType.change(function(){
        var selectedBorrowerType = $('option:selected', this).val();
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
        }
    });

    $gmbrType.change(function(){
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
            alert("Wrong data");
            return 0;
        }
       

    };

    
  
    /****************Calculations Ends Here*************** */
});