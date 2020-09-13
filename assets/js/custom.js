$(document).ready(function(){

    var loanOptions = {"Home Loan": "HL",
                    "Top-up Loan": "TL",
                    "Auto Loan": "AL",
                    "Education Loan": "EL",
                    "Mortgage Loan": "ML",
                    "Personal Loan": "PL",
                    "Loan against LIP": "LL",
                    "Gold Loan": "GL"
                    };
    var odOptions = {"Home Loan OD": "HLOD",
                    "Mortgage Loan OD": "MLOD",
                    "Personal Loan OD": "PLOD"
                    };

    $("#accType").change(function() {
        var selectedAccType = $('option:selected', this).val();
        var $el = $("#accScheme");
        $el.empty();
        if("loan" === selectedAccType){
            $.each(loanOptions, function(key,value) {
                $el.append($("<option></option>")
                .attr("value", value).text(key));
            });
            $el.removeAttr("disabled");
        }else if("frr" === selectedAccType){
            $el.append($("<option></option>")
                .attr("value", "frr").text("FRR")
            );
            $el.attr('disabled', true);
        }else if("od" === selectedAccType){
            $.each(odOptions, function(key,value) {
                $el.append($("<option></option>")
                .attr("value", value).text(key));
            });
            $el.removeAttr("disabled");
        }else{
            $el.attr('disabled', true);
        }
        
    });


    $("#accType").change(function() {
        
    });


});