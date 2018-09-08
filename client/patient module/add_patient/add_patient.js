
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Base64 } from 'meteor/ostrio:base64';
import { Session } from 'meteor/session';

import swal from 'sweetalert';

 Template.add_patient_form.onRendered(function(){
 	$('#loading_div').removeClass('loader_visiblity_block');
 	click_events();

$.getScript('https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyAGXF3qowdglMakLrlj2wCmgdI_OtsUWaI', function(){
    $.getScript('https://cdnjs.cloudflare.com/ajax/libs/geocomplete/1.7.0/jquery.geocomplete.min.js', function(){
      $("#location").geocomplete();
   });
   });

$.getScript('https://cdnjs.cloudflare.com/ajax/libs/sweetalert/2.1.0/sweetalert.min.js', function(){
});

setTimeout(function(){
    $("#location").geocomplete()
	 	$('#loading_div').addClass('loader_visiblity_block');
},3000);

});

 Template.add_patient_form.helpers({
    show_dates(){
      var array = new Array;
      for(var i=1;i<32;i++){
        array.push({'index': i});
      }
      console.log('here we are: ');
      console.log(array);
      return array;
    },

 });



function click_events(){

	$('#phone').keyup(function (e) {
		var phone = $('#phone').val();
		alert(phone.length);
		if(phone.length < 4){
			$('#Phone').addClass('empty_field').focus();

			    swal("Phone number should be at least 4 digits long!");
				return false;
		}
	});

	$('#first_name').keydown(function (e) {
          if (e.shiftKey || e.ctrlKey || e.altKey) {
              e.preventDefault();
          } else {
              var key = e.keyCode;
              if (!((key == 8) || (key == 32) || (key == 46) || (key >= 35 && key <= 40) || (key >= 65 && key <= 90))) {
                  e.preventDefault();
              }
          }
      });

	$('#last_name').keydown(function (e) {
          if (e.shiftKey || e.ctrlKey || e.altKey) {
              e.preventDefault();
          } else {
              var key = e.keyCode;
              if (!((key == 8) || (key == 32) || (key == 46) || (key >= 35 && key <= 40) || (key >= 65 && key <= 90))) {
                  e.preventDefault();
              }
          }
      });

		$("#go_back_doctor_listing").click(function(event){
        event.preventDefault();
        	window.history.go(-1);
    });	


 	$("#clear_form_data").click(function(event){
        event.preventDefault();
     // alert('here');
       $('#first_name').val('');
       $('#last_name').val('');
       $('#email').val('');

       $('#Phone').val('');
       $('#registration_date').val('');
       $('#dob').val('');

       $('#location').val('');
       	 	
    });


	$("#submit_doctor_form").click(function(event){
        event.preventDefault();
        // swal("here");

        var first_name = $('#first_name').val().trim();
        var last_name = $('#last_name').val().trim();
        var email = $('#email').val().trim();

        var Phone = $('#Phone').val().trim();

        var registration_joining_date = $('#registration_joining_date').val().trim();
        var registration_joining_month = $('#registration_joining_month').val().trim();
        var registration_joining_year = $('#registration_joining_year').val().trim();

        var dob_joining_date = $('#dob_joining_date').val().trim();
        var dob_joining_month = $('#dob_joining_month').val().trim();
        var dob_joining_year = $('#dob_joining_year').val().trim();
        var location = $('#location').val().trim();

        if(first_name == '' || first_name == undefined ){
				$('#first_name').addClass('empty_field').focus();
				  return false;
			  }
			  else
			  {
				$('#first_name').removeClass('empty_field').blur();
			  }

        	  if(last_name == '' || last_name == undefined ){
				$('#last_name').addClass('empty_field').focus();
				return false;
			  }
			  else
			  {
				$('#last_name').removeClass('empty_field').blur();
			  }

        	  if(email == '' || email == undefined ){
				$('#email').addClass('empty_field').focus();
				return false;
			  }
			  else
			  {
				$('#email').removeClass('empty_field').blur();
				var email_validation = ValidateEmail(email);

				if(email_validation == false){
					$('#email').addClass('empty_field').focus();
					return false;
				}
				else{
					$('#email').removeClass('empty_field').blur();
				}

			  }	

      if(Phone == '' || Phone == undefined ){
				$('#Phone').addClass('empty_field').focus();
				return false;
			  }
			  else
			  {
				$('#Phone').removeClass('empty_field').blur();
			  }

       if(registration_joining_date == '' || registration_joining_date == undefined ){
        $('#registration_joining_date').addClass('empty_field').focus();
        return false;
        }
        else
        {
        $('#registration_joining_date').removeClass('empty_field').blur();
        }


       if(registration_joining_month == '' || registration_joining_month == undefined ){
        $('#registration_joining_month').addClass('empty_field').focus();
        return false;
        }
        else
        {
        $('#registration_joining_month').removeClass('empty_field').blur();
        }


       if(registration_joining_year == '' || registration_joining_year == undefined ){
        $('#registration_joining_year').addClass('empty_field').focus();
        return false;
        }
        else
        {
        $('#registration_joining_year').removeClass('empty_field').blur();
        }

       if(dob_joining_date == '' || dob_joining_date == undefined ){
        $('#dob_joining_date').addClass('empty_field').focus();
        return false;
        }
        else
        {
        $('#dob_joining_date').removeClass('empty_field').blur();
        }


       if(dob_joining_month == '' || dob_joining_month == undefined ){
        $('#dob_joining_month').addClass('empty_field').focus();
        return false;
        }
        else
        {
        $('#dob_joining_month').removeClass('empty_field').blur();
        }


       if(dob_joining_year == '' || dob_joining_year == undefined ){
        $('#dob_joining_year').addClass('empty_field').focus();
        return false;
        }
        else
        {
        $('#dob_joining_year').removeClass('empty_field').blur();
        }

        if(location == '' || location == undefined ){
				$('#location').addClass('empty_field').focus();
				return false;
			  }
			  else
			  {
				$('#location').removeClass('empty_field').blur();
			  }


        // first_name = first_name.trim();
        // last_name = last_name.trim();
        // email = email.trim();

        // Phone = Phone.trim();

        // registration_joining_date = registration_joining_date.trim();
        // registration_joining_month = registration_joining_month.trim();
        // registration_joining_year = registration_joining_year.trim();

        // dob_joining_date = dob_joining_date.trim();
        // dob_joining_month = dob_joining_month.trim();
        // dob_joining_year = dob_joining_year.trim();
        // location = location.trim();

        

        var userId = Session.get("userId");
        var mydate = new Date();
        var str = moment(mydate).format('YYYY');
 
        if(registration_joining_year > str){


                swal({
              // title: "Good job!",
              text: 'Year value cannot be greater then the current year',
              // icon: "success",
              button: "ok",
              icon: "warning",
              dangerMode: true,
            });

          $('#registration_joining_year').addClass('emptyfield').focus();
          return false;
        }

        var date = registration_joining_date;
        var month = registration_joining_month;
        var year = registration_joining_year;

        registration_date = month+' '+date +', '+year;

        if(dob_joining_year > str){
          alert(' Last used year value cannot be greater then the current year');
          $('#dob_joining_year').addClass('emptyfield').focus();
          return false;
        }

        var date = dob_joining_date;
        var month = dob_joining_month;
        var year = dob_joining_year;

        dob = month+' '+date +', '+year;


	    $('#loader_gif').removeClass('div_hide_class');
        $('#save_text').addClass('div_hide_class');

		var patient_id = 'patient_id_'+Math.floor((Math.random() * 2465789) + 1);
		var first_name = first_name.substring(0,1).toLocaleUpperCase() + first_name.substring(1);
		var last_name = last_name.substring(0,1).toLocaleUpperCase() + last_name.substring(1);

		var patient_name = first_name +' '+last_name;

        // swal('patient_name: '+patient_name+
        // 	+' & patient_id: '+patient_id+
        // 	' & email: '+email+
        // 	' & Phone: '+Phone+' & registration_date: '+registration_date
        // 	+' & location: '+location);

        Meteor.call('Insert_patient_details',patient_id,patient_name,email,Phone,registration_date,dob,location,function(error,result){
              $('#loader_gif').addClass('div_hide_class');
              $('#save_text').removeClass('div_hide_class');

              if(error){
                console.log("Some error occured.");
              }else{

console.log('result');
console.log(result.msg);
                if(result.msg == 'email already exist'){
                  $('#email').addClass('empty_field').focus();
                  
                  // swal('This email is already in use! Please use another one.');   

                  swal({
              // title: "Good job!",
              text: 'This email is already in use! Please use another one.',
              // icon: "success",
              button: "ok",
              icon: "warning",
              dangerMode: true,
            });
                  
                  return false;


                }
                else if(result.msg == 'Phone number already exist'){
                  $('#Phone').addClass('empty_field').focus();
                  
                  // swal('This Phone is already in use! Please use another one.');   

                  swal({
              // title: "Good job!",
              text: 'This Phone is already in use! Please use another one.',
              // icon: "success",
              button: "ok",
              icon: "warning",
              dangerMode: true,
            });

                 
                }
                else if(result){
              	// swal("Patient details added successfully! ");

                swal({
              // title: "Good job!",
              text: 'Patient details added successfully! ',
              icon: "success",
              button: "ok",
              // icon: "warning",
              dangerMode: true,
            });

              	window.history.go(-1);
                }

                return false;
               	
                
              }
        });		

    });


function ValidateEmail(mail) 
{

	var email = $('#email').val();

 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
  {
    return (true)
  }

    // swal("Please enter a valid email ID");
            swal({
              // title: "Good job!",
              text: 'Please enter a valid email ID',
              // icon: "success",
              button: "ok",
              icon: "warning",
              dangerMode: true,
            });

    return (false)
}

}

