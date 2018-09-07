

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Base64 } from 'meteor/ostrio:base64';
import { Session } from 'meteor/session';

import swal from 'sweetalert';
import { patient_details } from './../../import/collections/insert.js';
import { modality } from './../../import/collections/insert.js';
 

// var modality;

 Template.show_modality_list.onDestroyed(function(){
  // modality.stop();

 });


 Template.show_modality_list.onRendered(function(){
      $.getScript("https://cdnjs.cloudflare.com/ajax/libs/datatables/1.10.19/js/jquery.dataTables.min.js",function(){
    });  

      $('#loading_div').removeClass('loader_visiblity_block');


    setTimeout(function(){
        click_events();

        $('#loading_div').addClass('loader_visiblity_block');
    },3000);

});

 Template.show_modality_list.helpers({  

    show_modality_list(){

    Meteor.subscribe('modality_type');    
    var result = modality.find({},{sort: {modality_name: 1} }).fetch();
    console.log(result);
    return result;

    },
    check_modality_status(modality_status){
        if(modality_status == 'Activate' ){   
            return true;
        }
        else{     
            return false;
        }
    },

 });


function click_events(){

        $("#show_modality").on("click", ".activate_status_modality", function(event){
        // $(".activate_status_patient").click(function(event){

        event.preventDefault();
       // swal("here");
        var modality_id = this.id;
        var status = 'Activate';
        console.log('status');
        console.log(status);
         swal("Sure you want to Activate this detail ?", {
          buttons: {
            cancel: "Cancel",
            catch: {
              text: "Sure",
              value: "catch",
            },
          },
        })
        .then((value) => {
          switch (value) {
         
            case "defeat":
              swal("Pikachu fainted! You gained 500 XP!");
              break;
         
            case "catch":
                    Meteor.call('change_modality_details_status',modality_id,status,function(error,result){
                      if(error){
                        console.log("Some error occured.");
                      }else{
                        swal("Patient detail's successfully activated!");     
                        window.location.reload();
                      }
                }); 
              break;
          }
        });

    });

        $("#show_modality").on("click", ".deactivate_status_modality", function(event){
        event.preventDefault();
        var modality_id = this.id;
        var status = 'Deactivate';
        console.log('status');
        console.log(status);

         swal("Sure you want to deactivate this detail ?", {
          buttons: {
            cancel: "Cancel",
            catch: {
              text: "Sure",
              value: "catch",
            },
          },
        })
        .then((value) => {
          switch (value) {
         
            case "defeat":
              swal("Pikachu fainted! You gained 500 XP!");
              break;
         
            case "catch":
        Meteor.call('change_modality_details_status',modality_id,status,function(error,result){
              if(error){
                console.log("Some error occured.");
              }else{
                swal("Patient detail's successfully De-activated!");     
                window.location.reload();
              }
        }); 
              break;
          }
        });

    });


$("#add_modality_div").on("click", "#add_modality", function(event){
      var modality_name = $('#modality_name').val();

        if(modality_name == '' || modality_name == undefined ){
        $('#modality_name').addClass('empty_field').focus();
          return false;
        }
        else
        {
        $('#modality_name').removeClass('empty_field').blur();
        }

            Meteor.call('add_new_modality',modality_name,function(error,result){
              if(error){
                console.log("Some error occured.");
              }else{
                swal("Patient detail's successfully De-activated!");     
                window.location.reload();
              }
        }); 
    });
}