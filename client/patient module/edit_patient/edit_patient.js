
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Base64 } from 'meteor/ostrio:base64';
import { Session } from 'meteor/session';

import swal from 'sweetalert';
import { datepicker } from './bootstrap-datepicker.js';

import { patient_details } from './../../../import/collections/insert.js';
     

// Meteor.startup(function() {  
//       GoogleMaps.load();
//     });


 Template.edit_patient_form.onRendered(function(){
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

         var url = window.location.href;

        var new_url = url.split("/");
        url = new_url[new_url.length-1];

        var patient_id = Base64.decode(url); 

      Meteor.call('fetch_patient_details',patient_id,function(error,result){
              if(error){
                console.log("Some error occured.");
              }else{
                console.log('result: ');
                console.log(result);
                console.log("Patient details added successfully!");     
                    var name = result[0].patient_name;
                      name = name.split(" ");
                        var first_name = $('#first_name').val(name[0]);
                var last_name = $('#last_name').val(name[1]);
                var email = $('#email').val(result[0].email);
                Session.set("check_if_email_not_checked",result[0].email);

                var Phone = $('#Phone').val(result[0].Phone);


                // var dob = $('#dob').val(result[0].dob);


                var load_date = result[0].dob;

                load_date = load_date.split(',');
                var day_and_month = load_date[0].trim();
                var year = load_date[1].trim();

                day_and_month = day_and_month.split(' ');
                var day = day_and_month[1].trim();
                var month = day_and_month[0].trim();

                  var Joining_date = $('#dob_joining_date').val(day);
                  var Joining_month = $('#dob_joining_month').val(month);
                  var Joining_year = $('#dob_joining_year').val(year); 

                  var load_date = result[0].registration_date;
                  load_date = load_date.split(',');
                  var day_and_month = load_date[0].trim();
                  var year = load_date[1].trim();

                  day_and_month = day_and_month.split(' ');
                  var day = day_and_month[1].trim();
                  var month = day_and_month[0].trim();

                  var Joining_date = $('#registration_joining_date').val(day);
                  var Joining_month = $('#registration_joining_month').val(month);
                  var Joining_year = $('#registration_joining_year').val(year); 

                var Joining_date = $('#patient_id_hidden').val(result[0].patient_id);
                var location = $('#location').val(result[0].location);
                console.log(result[0].location);

              }
        }); 


    setTimeout(function(){
 // $("#location").geocomplete();
      // $("#location").geocomplete({ details: "form" });
          $('#loading_div').addClass('loader_visiblity_block');
  },3000)

});

 Template.edit_patient_form.helpers({
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

        var first_name = $('#first_name').val();
        var last_name = $('#last_name').val();
        var email = $('#email').val();

        var Phone = $('#Phone').val();

        var registration_joining_date = $('#registration_joining_date').val();
        var registration_joining_month = $('#registration_joining_month').val();
        var registration_joining_year = $('#registration_joining_year').val();

        var dob_joining_date = $('#dob_joining_date').val();
        var dob_joining_month = $('#dob_joining_month').val();
        var dob_joining_year = $('#dob_joining_year').val();
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

      $('#loader_gif').removeClass('div_hide_class');
        $('#save_text').addClass('div_hide_class');

        first_name = first_name.trim();
        last_name = last_name.trim();
        email = email.trim();

        Phone = Phone.trim();

        registration_joining_date = registration_joining_date.trim();
        registration_joining_month = registration_joining_month.trim();
        registration_joining_year = registration_joining_year.trim();

        dob_joining_date = dob_joining_date.trim();
        dob_joining_month = dob_joining_month.trim();
        dob_joining_year = dob_joining_year.trim();
        location = location.trim();

        

        var userId = Session.get("userId");
        var mydate = new Date();
        var str = moment(mydate).format('YYYY');
 
        if(registration_joining_year > str){
          alert(' Last used year value cannot be greater then the current year');
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


         var url = window.location.href;

        var new_url = url.split("/");
        url = new_url[new_url.length-1];

        var patient_id = Base64.decode(url); 

    // var patient_id = $('#patient_id_hidden').val();
    var first_name = first_name.substring(0,1).toLocaleUpperCase() + first_name.substring(1);
    var last_name = last_name.substring(0,1).toLocaleUpperCase() + last_name.substring(1);

    var patient_name = first_name +' '+last_name;
    // var email_already_stored = Session.get("check_if_email_not_checked");
    // alert('email_already_stored: '+email_already_stored);
    
        Meteor.call('edit_patient_details',patient_id,patient_name,email,Phone,dob,registration_date,location,function(error,result){
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
                swal("Patient details edited successfully!");     
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