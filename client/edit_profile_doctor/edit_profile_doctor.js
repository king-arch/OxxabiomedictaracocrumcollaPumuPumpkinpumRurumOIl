
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Base64 } from 'meteor/ostrio:base64';
import { Session } from 'meteor/session';

import swal from 'sweetalert';

 Template.edit_profile_doctor_form.helpers({
    show_dates(){
      var array = new Array;
      for(var i=0;i<30;i++){
        array.push({'index': i});
      }
      console.log('here we are: ');
      console.log(array);
      return array;
    },

    check_user_type_admin(){
      var active_user = Session.get("active_user_type");
      if(active_user_type == 'admin'){
        return true;
      }
      else if(active_user_type == 'doctor'){
        return false;
      }
      else if(active_user_type == 'patient'){
          return false;
      } 

    },

    check_user_type_doctor(){
      var active_user = Session.get("active_user_type");
      if(active_user_type == 'admin'){
        return false;
      }
      else if(active_user_type == 'doctor'){
        return true;
      }
      else if(active_user_type == 'patient'){
          return false;
      } 

    },

    check_user_type_patient(){
      var active_user = Session.get("active_user_type");
      if(active_user_type == 'admin'){
        return false;
      }
      else if(active_user_type == 'doctor'){
        return false;
      }
      else if(active_user_type == 'patient'){
          return true;
      } 

    },

 });


 Template.edit_profile_doctor_form.onRendered(function(){
  $('#loading_div').removeClass('loader_visiblity_block');
 	click_events();

$.getScript('https://cdnjs.cloudflare.com/ajax/libs/sweetalert/2.1.0/sweetalert.min.js', function(){
});

 	$.getScript('https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyAGXF3qowdglMakLrlj2wCmgdI_OtsUWaI', function(){
    $.getScript('https://cdnjs.cloudflare.com/ajax/libs/geocomplete/1.7.0/jquery.geocomplete.min.js', function(){
      $("#location").geocomplete()
   });
   });

        var url = window.location.href;

        var new_url = url.split("/");
        url = new_url[new_url.length-1];

      var doctor_id = Base64.decode(url); 
 	    Meteor.call('fetch_doctor_details',doctor_id,function(error,result){
              if(error){
                console.log("Some error occured.");
              }else{
              	console.log('result: ');
              	console.log(result);
               	console.log("Doctor details added successfully!");     
               			var name = result[0].doctor_name;
               				name = name.split(" ");
               	        var first_name = $('#first_name').val(name[0]);
				        var last_name = $('#last_name').val(name[1]);
				        var email = $('#email').val(result[0].email);

				        var Speciality = $('#Speciality').val(result[0].Speciality);

				        var Phone = $('#Phone').val(result[0].Phone);
				        var hospital_name = $('#hospital_name').val(result[0].hospital_name);

                var load_date = result[0].Joining_date;

                load_date = load_date.split(',');
                var day_and_month = load_date[0].trim();
                var year = load_date[1].trim();

                day_and_month = day_and_month.split(' ');
                var day = day_and_month[1].trim();
                var month = day_and_month[0].trim();

                  var Joining_date = $('#Joining_date').val(day);
                  var Joining_month = $('#Joining_month').val(month);
                  var Joining_year = $('#Joining_year').val(year); 

				        var Joining_date = $('#doctor_id_hidden').val(result[0].doctor_id);

				        var location = $('#location').val(result[0].location);

              }
        });	


 	  setTimeout(function(){
          $('#loading_div').addClass('loader_visiblity_block');
  },3000)

});


function click_events(){

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

	$("#edit_doctor_details").click(function(event){
        event.preventDefault();
        var first_name = $('#first_name').val();
        var last_name = $('#last_name').val();
        var email = $('#email').val();
        var Speciality = $('#Speciality').val();

        var Phone = $('#Phone').val();
        var hospital_name = $('#hospital_name').val();

        var Joining_date = $('#Joining_date').val().trim();
        var Joining_month = $('#Joining_month').val().trim();
        var Joining_year = $('#Joining_year').val().trim();

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

	    var doctor_id = $('#doctor_id_hidden').val();
		var first_name = first_name.substring(0,1).toLocaleUpperCase() + first_name.substring(1);
		var last_name = last_name.substring(0,1).toLocaleUpperCase() + last_name.substring(1);

		var doctor_name = first_name +' '+last_name;

        Meteor.call('edit_doctor_details',doctor_id,doctor_name,email,Speciality,Phone,hospital_name,Joining_date,location,function(error,result){
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
                swal("Doctor details edited successfully!");     
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