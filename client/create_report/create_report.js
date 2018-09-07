
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Base64 } from 'meteor/ostrio:base64';
import { Session } from 'meteor/session';

import { request } from "meteor/froatsnook:request";

import swal from 'sweetalert';
import { doctor_details } from './../../import/collections/insert.js';
import { patient_details } from './../../import/collections/insert.js';
import { modality } from './../../import/collections/insert.js';

var doctor_details_alldata;
var patient_details_alldata;

 Template.add_report_form.onRendered(function(){
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

 Template.add_report_form.helpers({

    show_dates(){
      var array = new Array;
      for(var i=0;i<30;i++){
        array.push({'index': i});
      }
      console.log('here we are: ');
      console.log(array);
      return array;
    },

      doctors_listing(){
      // show collections.
      doctor_details_alldata = Meteor.subscribe('doctor_details_alldata');
      var listing = doctor_details.find({},{sort: {doctor_name: 1} }).fetch();

            console.log('listing: ');
      console.log(listing);

      if(listing[0]){
      var array = new Array;


      for(var i=0; i<listing.length; i++){
        array.push({'index': i,'doctors_id': listing[i].doctor_id,'doctor_name': listing[i].doctor_name,'Speciality': listing[i].Speciality});
      }
      console.log('here we are: ');
      console.log(array);

      return array;
      }

      },

      patient_listing(){
      patient_details_alldata = Meteor.subscribe('patient_details_alldata');
      var listing = patient_details.find({},{sort: {patient_name: 1} }).fetch();

      console.log('listing: ');
      console.log(listing);

      if(listing[0]){
      var array = new Array;
      for(var i=0; i<listing.length; i++){
        array.push({'index': i,'patient_id': listing[i].patient_id,'patient_name': listing[i].patient_name});
      }
      console.log('here we are: ');
      console.log(array);

      return array;
      }

      },

      modality_listing(){
      patient_details_alldata = Meteor.subscribe('modality_details_alldata');
      var listing = modality.find({modality_status: 'Activate'},{sort: {modality_name: 1} }).fetch();

      console.log('listing: ');
      console.log(listing);

      if(listing[0]){
      var array = new Array;
      for(var i=0; i<listing.length; i++){
        array.push({'index': i,'modality_id': listing[i].modality_id,'modality_name': listing[i].modality_name});
      }
      console.log('here we are: ');
      console.log(array);

      return array;
      }

      },

 });

function click_events(){

    $('#submit_report_form').click(function (event) {

    var selected_doctor = $('#selected_doctor').val();
    var selected_patient = $('#selected_patient').val();
    var selected_modality = $('#selected_modality').val();
    var selected_image = $('#selected_image').val();

        if(selected_doctor == '' || selected_doctor == undefined ){
        $('#selected_doctor').addClass('empty_field').focus();
          return false;
        }
        else
        {
        $('#selected_doctor').removeClass('empty_field').blur();
        }

        if(selected_patient == '' || selected_patient == undefined ){
        $('#selected_patient').addClass('empty_field').focus();
          return false;
        }
        else
        {
        $('#selected_patient').removeClass('empty_field').blur();
        }

        if(selected_modality == '' || selected_modality == undefined ){
        $('#selected_modality').addClass('empty_field').focus();
          return false;
        }
        else
        {
        $('#selected_modality').removeClass('empty_field').blur();
        }

        if(selected_image == '' || selected_image == undefined ){
        $('#selected_image').addClass('empty_field').focus();
          return false;
        }
        else
        {
        $('#selected_image').removeClass('empty_field').blur();
        }

        // swal(' selected_doctor: ' + selected_doctor+' selected_modality: ' + selected_modality+
        //       ' selected_patient: ' + selected_patient+' selected_image: ' + selected_image);
        // return false;

        var report_submited_by = Session.get("active_user");
        var studies_trasaction_id =Session.get('studies_trasaction_id');
        Meteor.call('save_report',selected_doctor,selected_modality,selected_patient,report_submited_by,studies_trasaction_id,function(error,result){
                    if(error){
                        console.log("Some error occured.");
                      }else{
                        swal('Report successfully added');
                        Router.go('/report_listing');
                      }  
             }); 

             alert('check 4');
                 $("#go_back_doctor_listing").click(function(event){
                      event.preventDefault();
                        window.history.go(-1);
                  }); 
             return false;                    

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


  $("#selected_image").change(function(event){
      upload_image(event);

  });

}




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


function fileValidation(){
    var fileInput = document.getElementById('file');
    var filePath = fileInput.value;
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    if(!allowedExtensions.exec(filePath)){
        alert('Please upload file having extensions .jpeg/.jpg/.png/.gif only.');
        fileInput.value = '';
        return false;
    }else{
        //Image preview
        if (fileInput.files && fileInput.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('imagePreview').innerHTML = '<img src="'+e.target.result+'"/>';
            };
            reader.readAsDataURL(fileInput.files[0]);
        }
    }
}

function upload_image(e,template){

 if (e.currentTarget.files && e.currentTarget.files[0]) {
      var file = e.currentTarget.files[0];
         if (file) {

          console.log(file);
          var form = new FormData();
          form.append("data-binary",file);

          var settings = {
           "async": true,
           "crossDomain": true,
           "url": "http://pacs.space/instances",
           "method": "POST",
           "processData": false,
           "contentType": false,
           "mimeType": "multipart/form-data",
           "data": form
          }

          $.ajax(settings).done(function (response) {
            // swal('Succesfully: ');
           Meteor.call('save_dicom_detail_in_desired_format',response,function(error,result){
           if(error){
                        console.log("Some error occured.");
                      }else{
                        swal('successfully stored ');
                        Session.set('studies_trasaction_id',result);
                      }  
             }); 

          });

    }
  }

}
