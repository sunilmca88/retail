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
        

	

        $('#applicants').empty();
        alert($('option:selected', this).text());
        for(var i =1; i<=$('option:selected', this).text(); i++ ){
            
            var myvar = `<div class="jumbotron">
            <div >
              <h5 class="alert alert-dark text-center" role="alert">Applicant #`+i+` Details</h5>
            </div>
            <div class="row">
              <div class="col-sm-3">
                <label for="borrowerType`+i+`">Borrower Type</label>
                <select id="borrowerType`+i+`" class="form-control">
                  <option selected>Select</option>
                  <option >Salaried</option>
                  <option >Other Individual</option>
                </select>
              </div>
              <div class="col-sm-3">
                <label for="latestSal`+i+`">Latest Salary/GMBR/Rent</label>
                <input type="email" class="form-control" id="latestSal`+i+`"  placeholder="Enter Value">
              </div>
              <div class="col-sm-3">
                <label for="feb20Salary`+i+`">Salary/Rent in Feb 2020</label>
                <input type="email" class="form-control" id="feb20Salary`+i+`" placeholder="Enter Value">
              </div>
              <div class="col-sm-3">
                <label for="totalDeduction`+i+`">Total Deduction</label>
                <input type="email" class="form-control" id="totalDeduction`+i+`" placeholder="Enter Value">
              </div>          
            </div>
            <br/>
            <div class="row">
              <div class="col-sm-6">
                <label for="borrowerName`+i+`">Customer Name</label>
                <input type="email" class="form-control" id="borrowerName`+i+`" placeholder="Enter Name">
              </div>
              <div class="col-sm-3">
                <label for="unservicedInt`+i+`">Unserviced Interest</label>
                <input type="email" class="form-control" id="unservicedInt`+i+`" placeholder="Enter Value">
              </div>
              
              <div class="col-sm-3"style="text-align:center;">
                <label>Percentage reduction in salary</label><br/>
                <h3 class="badge badge-danger" style="font-size: x-large;" id="borrowerImpact`+i+`">25%</h3>
              </div>
            </div>
        </div>`;
            $('#applicants').append(myvar);
        }

        // var $div = $('div[id^="applicant"]:last');
        // console.log($div);

        // // Read the Number from that DIV's ID (i.e: 3 from "klon3")
        // // And increment that number by `+i+`
        // var num = parseInt( $div.prop("id").match(/\d+/g), `+i+`0 ) +`+i+`;

        // // Clone it and assign the new ID (i.e: from num 4 to ID "klon4")
        // var $klon = $div.clone().prop('id', 'applicant'+num );
        // console.log($klon);
        // // Finally insert $klon wherever you want
        // $div.after( $klon );
    });


});