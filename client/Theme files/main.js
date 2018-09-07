
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Base64 } from 'meteor/ostrio:base64';
import { Session } from 'meteor/session';

import swal from 'sweetalert';
import { doctor_details } from './../../import/collections/insert.js';


var doctor_detailed;
var doctor_detailed_with_limit;
var doctor_detail_with_limit_and_search;
 Template.tables.onDestroyed(function(){
  // doctor_detailed.stop();
  doctor_detailed_with_limit.stop();
  doctor_detail_with_limit_and_search.stop();
 });


 Template.tables.onRendered(function(){
      $.getScript("https://cdnjs.cloudflare.com/ajax/libs/datatables/1.10.19/js/jquery.dataTables.min.js",function(){
    });  

      $('#loading_div').removeClass('loader_visiblity_block');


    setTimeout(function(){
        click_events();

        $('#loading_div').addClass('loader_visiblity_block');
var if_search_exists = Session.get("search_keyword");

if(if_search_exists == null || if_search_exists == '' || if_search_exists == undefined){

                Meteor.call('show_pagination_count_onrender',function(error,result){
                      if(error){
                        console.log("Some error occured.");
                      }else{
                        Session.set("total_pagination_count",result);
                      }
                }); 

}

    },3000);

});


 Template.tables.helpers({

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
 	
 	show_doctors_list(){
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

      console.log('Hero is '+pagination);      

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
    console.log('Hero is back: ');
    console.log('check_query: '+check_query+' & skip: '+skip);

    doctor_detail_with_limit_and_search = Meteor.subscribe('doctor_detail_with_limit_and_search',skip,check_query);
    var result = doctor_details.find({'doctor_name': query},{sort: {doctor_name: 1}}).fetch();

    }else{
    console.log('step two');                                               
    doctor_detailed_with_limit = Meteor.subscribe('doctor_detail_with_limit',skip);
    var result = doctor_details.find({},{sort: {doctor_name: 1}}).fetch();
    }
 		console.log(result);
 		return result;
 	},
  
    check_doctor_status(doctor_status){
        if(doctor_status == 'Activate' ){
            return true;
        }
        else{     
            return false;
        }
    }
 });


function click_events(){

        $("#capture_pagination_event").on("click", ".cliked_on_pagination", function(event){
            var n2 = this.id;
            Session.set('pagination',n2);
        });

        $("#capture_search_event").on("keyup", "#search", function(event){
          Session.set("pagination",0);
          var search = $('#search').val();


                Session.set("search_keyword",search);

                Meteor.call('show_paginaion_count',search,function(error,result){
                      if(error){
                        console.log("Some error occured.");
                      }else{
                        Session.set("total_pagination_count",result);
                      }  
                }); 
        });

        $("#show_doctor").on("click", ".activate_status_doctor", function(event){
        
        console.log('here: ');
        event.preventDefault();
        swal("here");

        var doctor_id = this.id;
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
                    Meteor.call('change_doctor_details_status',doctor_id,status,function(error,result){
                      if(error){
                        console.log("Some error occured.");
                      }else{
                        swal("Doctor detail's successfully activated!");     
                        window.location.reload();
                      }
                }); 

              // swal("Gotcha!", "Pikachu was caught!", "success");
              break;
          }
        });

    });

$("#show_doctor").on("click", ".deactivate_status_doctor", function(event){
        // $(".deactivate_status_doctor").click(function(event){
          console.log('here: ');
        event.preventDefault();
       swal("here");
        var doctor_id = this.id;
        var status = 'Deactivate';
        console.log('status');
        console.log(status);
        // return false;


         swal("Sure you want to deactivate this detail ?", {
          buttons: {
            cancel: "Cancel",
            catch: {
              text: "Sure",
              value: "catch",
            },
            // defeat: true,
          },
        })
        .then((value) => {
          switch (value) {
         
            case "defeat":
              swal("Pikachu fainted! You gained 500 XP!");
              break;
         
            case "catch":

        Meteor.call('change_doctor_details_status',doctor_id,status,function(error,result){
              if(error){
                console.log("Some error occured.");
              }else{
                swal("Doctor detail's successfully De-activated!");     
                window.location.reload();
              }
        }); 
              break;
         
            default:
              swal("Got away safely!");
          }
        });

    });


	$("#add_doctor").click(function(event){
        
        $('#loader_gif').removeClass('div_hide_class');
        $('#save_text').addClass('div_hide_class');

        event.preventDefault();
	      Router.go('/add_doctor');

    });


$("#show_doctor").on("click", ".edit_doctor", function(event){
        console.log('here: ');
        event.preventDefault();
        var doctor_id = this.id;

         doctor_id= Base64.encode(doctor_id); 
         var url = '/edit_doctor/'+doctor_id; 
         // swal(url);
        Router.go(url);
    });

}