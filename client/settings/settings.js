
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Base64 } from 'meteor/ostrio:base64';
import { Session } from 'meteor/session';

import swal from 'sweetalert';
 Template.settings_list.onRendered(function(){
 	
 	$('#loading_div').removeClass('loader_visiblity_block');
 	click_events();

  $.getScript("https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.3.0/css/datepicker.css",function(){
  });

$.getScript('https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyAGXF3qowdglMakLrlj2wCmgdI_OtsUWaI', function(){
    $.getScript('https://cdnjs.cloudflare.com/ajax/libs/geocomplete/1.7.0/jquery.geocomplete.min.js', function(){
      $("#location").geocomplete()
   });
   });

$.getScript('https://cdnjs.cloudflare.com/ajax/libs/sweetalert/2.1.0/sweetalert.min.js', function(){
});

setTimeout(function(){
	 	$('#loading_div').addClass('loader_visiblity_block');
},3000);

});

 Template.settings_list.helpers({
    show_dates(){
      var array = new Array;
      for(var i=0;i<30;i++){
        array.push({'index': i});
      }
      console.log('here we are: ');
      console.log(array);
      return array;
    },

        display_if_admin(){
        var active_user_type = Session.get("active_user_type");
        if(active_user_type == 'admin'){
            return true;
        }
        else{
            return false;
        }
    },

    

 });

function click_events(){

  $('#change_privacy').click(function (e) {
      Router.go('/user_policy_edit');
  });

  $('#change_cookies').click(function (e) {
      Router.go('/cookies_edit');
  });
  
  $('#change_useragreement').click(function (e) {
      Router.go('/user_agreement_edit');
  });
  
  $('#modality_list').click(function (e) {
      Router.go('/modality_list');
  });

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

    $("#change_password").click(function(event){
      console.log('here');
      Router.go('/change_password');
    });

		$("#go_back_doctor_listing").click(function(event){
        event.preventDefault();
        	window.history.go(-1);
    });	

 	$("#clear_form_data").click(function(event){
       event.preventDefault();

       $('#first_name').val('');
       $('#last_name').val('');
       $('#email').val('');
       $('#Speciality').val('');

       $('#Phone').val('');
       $('#hospital_name').val('');
       $('#Joining_date').val();
       $('#Joining_month').val();
       $('#Joining_year').val();

       $('#location').val('');
    });

	$("#submit_doctor_form").click(function(event){
        event.preventDefault();
        var first_name = $('#first_name').val();
        var last_name =  $('#last_name').val();
        var email = $('#email').val();
        var Speciality = $('#Speciality').val();

        var Phone = $('#Phone').val();
        var hospital_name = $('#hospital_name').val();

        var Joining_date = $('#Joining_date').val();
        var Joining_month = $('#Joining_month').val();
        var Joining_year = $('#Joining_year').val();

        var location = $('#location').val();

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

        if(Speciality == '' || Speciality == undefined ){
				$('#Speciality').addClass('empty_field').focus();
				return false;
			  }
			  else
			  {
				$('#Speciality').removeClass('empty_field').blur();
				
			  }

        if(Phone == '' || Phone == undefined ){
				$('#Phone').addClass('empty_field').focus();
				return false;
			  }
			  else
			  {
				$('#Phone').removeClass('empty_field').blur();
			  }

        if(hospital_name == '' || hospital_name == undefined ){
				$('#hospital_name').addClass('empty_field').focus();
				return false;
			  }
			  else
			  {
				$('#hospital_name').removeClass('empty_field').blur();
			  }

       if(Joining_date == '' || Joining_date == undefined ){
        $('#Joining_date').addClass('empty_field').focus();
        return false;
        }
        else
        {
        $('#Joining_date').removeClass('empty_field').blur();
        }

       if(Joining_month == '' || Joining_month == undefined ){
        $('#Joining_month').addClass('empty_field').focus();
        return false;
        }
        else
        {
        $('#Joining_month').removeClass('empty_field').blur();
        }

			 if(Joining_year == '' || Joining_year == undefined ){
				$('#Joining_year').addClass('empty_field').focus();
				return false;
			  }
			  else
			  {
				$('#Joining_year').removeClass('empty_field').blur();
			  }


        var userId = Session.get("userId");

        var mydate=new Date();
        var str=moment(mydate).format('YYYY');
        // alert(str);
        if(Joining_year > str){
          alert(' Last used year value cannot be greater then the current year');
          $('#Joining_year').addClass('emptyfield').focus();
          return false;
        }

        var date = Joining_date;
        var month = Joining_month;
        var year = Joining_year;

        Joining_date = month+' '+date +', '+year;

        if(location == '' || location == undefined ){
				$('#location').addClass('empty_field').focus();
				return false;
			  }
			  else
			  {
				$('#location').removeClass('empty_field').blur();
			  }

	    $('#loader_gif').removeClass('div_hide_class');
        $('#save_text').addClass('div_hide_class');

        var first_name = first_name.trim();
        var last_name = last_name.trim();
        var email = email.trim();
        var Speciality = Speciality.trim();

        var Phone = Phone.trim();
        var hospital_name = hospital_name.trim();

        var Joining_date = Joining_date.trim();
        var Joining_month = Joining_month.trim();
        var Joining_year = Joining_year.trim();

        var location = location.trim();

		var doctor_id = 'doctor_id_'+Math.floor((Math.random() * 2465789) + 1);
		var first_name = first_name.substring(0,1).toLocaleUpperCase() + first_name.substring(1);
		var last_name = last_name.substring(0,1).toLocaleUpperCase() + last_name.substring(1);

		var doctor_name = first_name +' '+last_name;

        Meteor.call('Insert_doctor_details',doctor_id,doctor_name,email,Speciality,Phone,hospital_name,Joining_date,location,function(error,result){
              $('#loader_gif').addClass('div_hide_class');
              $('#save_text').removeClass('div_hide_class');

              if(error){
                console.log("Some error occured.");
              }else{

console.log('result');
console.log(result.msg);

                if(result.msg == 'email already exist'){
                  $('#email').addClass('empty_field').focus();
                  
                  swal('This email is already in use! Please use another one.');   
                  return false;


                }
                else if(result.msg == 'Phone number already exist'){
                  $('#Phone').addClass('empty_field').focus();
                  
                  swal('This Phone is already in use! Please use another one.');   
                 
                }
                else if(result){
              	swal("Doctor details added successfully! ");
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

    swal("You have entered an invalid email address!");
    return (false)
}

}

