
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Base64 } from 'meteor/ostrio:base64';
import { Session } from 'meteor/session';

import swal from 'sweetalert';
import { patient_details } from './../../import/collections/insert.js';

 Template.edit_profile_admin_form.onRendered(function(){
  $('#loading_div').removeClass('loader_visiblity_block');
  click_events();

    $.getScript('https://cdnjs.cloudflare.com/ajax/libs/sweetalert/2.1.0/sweetalert.min.js', function(){
    
    });

    $.getScript('https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyAGXF3qowdglMakLrlj2wCmgdI_OtsUWaI', function(){
        $.getScript('https://cdnjs.cloudflare.com/ajax/libs/geocomplete/1.7.0/jquery.geocomplete.min.js', function(){
          // alert('email_already_stored');
          $("#location").geocomplete();
        });
     });

    setTimeout(function(){
 // $("#location").geocomplete();
      // $("#location").geocomplete({ details: "form" });
          $('#loading_div').addClass('loader_visiblity_block');
  },3000);


        var admin_id = Session.get("active_user");

        Meteor.call('fetch_admin_details',admin_id,function(error,result){
              if(error){
                console.log("Some error occured.");
              }else{
                console.log('result: ');
                console.log(result);
                console.log("admin details added successfully!");     
                
                var admin_name = result[0].admin_name;
                var admin_email = result[0].admin_email;
                $('#admin_name').val(admin_name);
                $('#email').val(admin_email);
              }
            });

});

 Template.edit_profile_admin_form.helpers({
    show_dates(){
      var array = new Array;
      for(var i=0;i<30;i++){
        array.push({'index': i});
      }
      console.log('here we are: ');
      console.log(array);
      return array;
    },


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

  $("#go_back_patient_listing").click(function(event){
        event.preventDefault();
        // swal('here');

        window.history.go(-1);
    });

  $("#edit_patient_details").click(function(event){
        event.preventDefault();

        var email = $('#email').val();
        var admin_name = $('#admin_name').val();
        email.trim();
        admin_name.trim();


      if(email == '' || email == undefined ){
        $('#email').addClass('empty_field').focus();
        return false;
        }
        else
        {
        $('#email').removeClass('empty_field').blur();
        }

      if(admin_name == '' || admin_name == undefined ){
        $('#admin_name').addClass('empty_field').focus();
        return false;
        }
        else
        {
        $('#admin_name').removeClass('empty_field').blur();
        }

      $('#loader_gif').removeClass('div_hide_class');
        $('#save_text').addClass('div_hide_class');

        var admin_id = Session.get("active_user");
    
        Meteor.call('edit_admin_details',email,admin_id,admin_name,function(error,result){
              $('#loader_gif').addClass('div_hide_class');
              $('#save_text').removeClass('div_hide_class');

              if(error){
                      console.log("Some error occured.");
              }else{

                // if(result.msg == 'email already exist'){
                //   $('#email').addClass('empty_field').focus();
                  
                //   swal('This email is already in use! Please use another one.');   
                //   return false;


                // }
                // else if(result.msg == 'Phone number already exist'){
                //   $('#Phone').addClass('empty_field').focus();
                  
                //   swal('This Phone is already in use! Please use another one.');   
                 
                // }
                if(result){
                swal("admin email changed successfully!");     
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