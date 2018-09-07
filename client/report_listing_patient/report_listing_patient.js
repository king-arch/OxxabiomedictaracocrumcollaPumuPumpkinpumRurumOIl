
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Base64 } from 'meteor/ostrio:base64';
import { Session } from 'meteor/session';

import swal from 'sweetalert';
import { patient_details } from './../../import/collections/insert.js';
import { report } from './../../import/collections/insert.js';
import { doctor_details } from './../../import/collections/insert.js';
import { modality } from './../../import/collections/insert.js';
 
var patient_detailed;
var patient_detailed_with_limit;
var patient_detail_with_limit_and_search;

 Template.tables.onDestroyed(function(){

  patient_detailed_with_limit.stop();
  patient_detail_with_limit_and_search.stop();

 });


 Template.show_report_listing_patient.onRendered(function(){
      $.getScript("https://cdnjs.cloudflare.com/ajax/libs/datatables/1.10.19/js/jquery.dataTables.min.js",function(){
    });  

      $('#loading_div').removeClass('loader_visiblity_block');


    setTimeout(function(){
        click_events();

        $('#loading_div').addClass('loader_visiblity_block');
var if_search_exists = Session.get("search_keyword");
if(if_search_exists == null || if_search_exists == '' || if_search_exists == undefined){
                Meteor.call('show_pagination_count_for_reports',function(error,result){
                      if(error){
                        console.log("Some error occured.");
                      }else{
                        Session.set("total_pagination_count",result);
                      }
                }); 
}
    },3000);
});

 Template.show_report_listing_patient.helpers({

  show_pagination_count(){
    var count = Session.get("total_pagination_count");
    console.log('count: '+count);

    var new_count = count/10;
    console.log('new_count: '+new_count);

    if(new_count > 1){
      var c1 = new_count%10;
      if(c1 == 0){
      var array_list = new_count;
      }else{
      var array_list = new_count+1;
      }
        console.log('c1: '+c1);
    }
    else{
      var array_list =  0;
    }
    console.log('array_list: '+array_list);

    var return_array = new Array();
    if(array_list != 0){

        for(var i = 1; i < array_list; i++){
          return_array.push({'index': i});
        }

    }

    console.log('return_array: '+array_list);
    return return_array;
  },
  
  Show_report_listing(){
    var pagination = Session.get("pagination");
    console.log('pagination limit is '+pagination);

    if(pagination == 1){
        pagination = 0;
       }else{
    if(pagination == undefined || pagination == null){
      pagination = 0;
    }
    else if(pagination == 0){
    }
    else{
      pagination = pagination - 1;
    }
    }
    
    var skip = 10*pagination;
    console.log('limit is '+skip);

    var check_query = Session.get("search_keyword");  
    console.log('check_query: '+check_query);

    if(check_query != '' && check_query != null && check_query != undefined){
      var query = new RegExp(check_query,'i');
      console.log('step one');

var pagination = Session.get("pagination");

      // console.log('Hero is '+pagination);      

    if(pagination == 1){
        pagination = 0;
       }else{
    if(pagination == undefined || pagination == null){
      pagination = 0;
    }
    else if(pagination == 0){
    }
    else{

      pagination = pagination - 1;
    }
    }

     var skip = 10*pagination;
     // console.log('Hero is back: ');
     // console.log('check_query: '+check_query+' & skip: '+skip);

      var modality_filter = Session.get('modality_filter');
          if(modality_filter != '' || modality_filter != null ){
            // swal('case 1');

           var patient_list = new Array();
           var doctor_list = new Array();
           var id_list = new Array();
           var new_list = new Array();

           var new_patient2;
           var new_doctor2;

             Meteor.subscribe('patient_details_alldata');
             var new_patient = patient_details.find({ patient_name: query } ).fetch();

             for(var i=0; i < new_patient.length; i++){
                id_list.push(new_patient[i].patient_id);
              }

             // Meteor.subscribe('doctor_details_alldata');
             // var new_doctor = doctor_details.find({ doctor_name: query }).fetch();

             //  for(var i=0; i < new_doctor.length; i++){
             //    id_list.push(new_doctor[i].doctor_id);
             //  }

              console.log('id list: ');
              console.log(id_list);
               Meteor.subscribe('get_report_listing');

        var active_user = Session.get("active_user");
               var result = report.find({
                                      selected_patient: 
                                                          {$in:
                                                             
                                                                id_list
                                                               
                                                            }
                                        }).fetch();

           // console.log('new_patient');
           // console.log(new_patient);
           // console.log('new_doctor');
           // console.log(new_doctor);


           // console.log('new_list');
           // console.log(new_list);

           // console.log('result: ');
           // console.log(result);

          }else{

           var patient_list = new Array();
           var doctor_list = new Array();
           var id_list = new Array();
           var new_list = new Array();

           var new_patient2;
           var new_doctor2;

           
               Meteor.subscribe('get_report_listing');

        var active_user = Session.get("active_user");
               var result = report.find({
                                      selected_patient: 
                                                          {$in:
                                                             
                                                                id_list
                                                               
                                                            }
                                        }).fetch();

                // get_report_listing = Meteor.subscribe('get_report_listing');
                // var result = report.find({},{skip: skip,limit: 10} ).fetch();
              }

    }else{
          console.log('step two');  
            var modality_filter = Session.get('modality_filter');
          if(modality_filter){

       swal('case 3');
       swal(modality_filter);

        var active_user = Session.get("active_user");

            get_report_listing = Meteor.subscribe('get_report_listing');
           var result = report.find({selected_patient: active_user, selected_modality: modality_filter } ).fetch();

          }else{
 swal('case 4');
                      var active_user = Session.get("active_user");
              get_report_listing = Meteor.subscribe('get_report_listing');
              var result = report.find({selected_patient: active_user}).fetch();
              console.log('case 4');
              console.log(result);
            }
    }
      // console.log('report listing: ');
      // console.log(result);
    return result;
  },
  
    show_doctor_name(){

      var selected_doctor = this.selected_doctor; 
      get_report_listing = Meteor.subscribe('doctor_detail_with_id',selected_doctor); 
      var result = doctor_details.find({doctor_id: selected_doctor}).fetch(); 
  
      // console.log('Doctors detail: ');  
      // console.log(result);  
  
      if(result[0]){  
      return result[0].doctor_name + ' ('+ result[0].Speciality +') ';  
      }   
  
    },   


    show_patient_name(){  
  
      var selected_patient = this.selected_patient; 
      get_report_listing = Meteor.subscribe('patient_detail_with_id',selected_patient); 
      var result = patient_details.find({patient_id: selected_patient}).fetch(); 
  
      // console.log('patient detail: ');  
      // console.log(result);  
  
      if(result[0]){  
      return result[0].patient_name;  
      }   
  
    },   
    
    patientName(){  
      var studies = this.studies;  
      // console.log('studies: ');
      // console.log(studies);

      if(studies){
      var patientName = studies[0].patientName;
      // console.log('patientName: ');

      // console.log(patientName);
      return patientName;
      }
    },
  
    series(){
      var studies = this.studies;
      // console.log('studies: ');
      // console.log(studies);

      if(studies){
      var ParentSeries = studies[0].seriesList[0].instances[0].ParentSeries;
      // var ParentStudy = studies[0].seriesList[2].instances[4].ParentSeries;
      // console.log('ParentSeries: ');

      // console.log(ParentSeries);
      return ParentSeries;
      }
    },
  
    study(){
      var studies = this.studies;
      // console.log('studies: ');
      // console.log(studies);

      if(studies){
      var ParentStudy = studies[0].seriesList[0].ParentStudy;
      // console.log('ParentStudy: ');

      // console.log(ParentStudy);
      return ParentStudy;
      }
    },

  
    report_generation_date(){
      return moment(this.createdAt).format('MMM DD, YYYY');
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
        $("#capture_pagination_event").on("click", ".cliked_on_pagination", function(event){
            var n2 = this.id;
            Session.set('pagination',n2);
        });

        $("#filter_with_modality").change(function(event){
            swal('here we are');
            var filter_with_modality = $('#filter_with_modality').val();
            swal(filter_with_modality);
            Session.set('modality_filter',filter_with_modality);
        });

        $("#capture_search_event").on("keyup", "#search", function(event){
          Session.set("pagination",0);
          var search = $('#search').val();
                Session.set("search_keyword",search);

                Meteor.call('show_pagination_count_for_reports',search,function(error,result){
                      if(error){
                        console.log("Some error occured.");
                      }else{
                        Session.set("total_pagination_count",result);
                      }  
                });        
        });

        $("#show_patient").on("click", ".activate_status_patient", function(event){
        // $(".activate_status_patient").click(function(event){
        event.preventDefault();
       // swal("here");
        var patient_id = this.id;
        var status = 'Activate';
        // console.log('status');
        // console.log(status);
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
                    Meteor.call('change_patient_details_status',patient_id,status,function(error,result){
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

        $("#show_patient").on("click", ".deactivate_status_patient", function(event){
        event.preventDefault();
        var patient_id = this.id;
        var status = 'Deactivate';
        // console.log('status');
        // console.log(status);

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
        Meteor.call('change_patient_details_status',patient_id,status,function(error,result){
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


$("#add_patient_div").on("click", "#add_patient", function(event){
        $('#loader_gif').removeClass('div_hide_class');
        $('#save_text').addClass('div_hide_class');

        event.preventDefault();
	      Router.go('/add_patient');

    });

     $("#show_patient").on("click", ".edit_patient", function(event){
        event.preventDefault();
        var patient_id = this.id;                           
         patient_id= Base64.encode(patient_id); 
         var url = '/edit_patient/'+patient_id; 
        Router.go(url);
    });
}