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


    $("#noOfApplicant").change(function() {
        
       

        var $div = $('div[id^="applicant1"]:last');
        console.log($div);

        // Read the Number from that DIV's ID (i.e: 3 from "klon3")
        // And increment that number by 1
        var num = parseInt( $div.prop("id").match(/\d+/g), 10 ) +1;

        // Clone it and assign the new ID (i.e: from num 4 to ID "klon4")
        var $klon = $div.clone().prop('id', 'applicant'+num );
        console.log($klon);
        // Finally insert $klon wherever you want
        $div.after( $klon );
    });


});