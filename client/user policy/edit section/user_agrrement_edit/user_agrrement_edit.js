
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Base64 } from 'meteor/ostrio:base64';
import { Session } from 'meteor/session';

import swal from 'sweetalert';


 Template.user_agreement_edit.helpers({
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


var get_cookies;

 Template.user_agreement_edit.onDestroyed(function(){
  // get_cookies.stop();
 });

 Template.user_agreement_edit.onRendered(function() {

      event_capture();

      var edit_type = "useragreement"; 
       Meteor.call("fetch_privacy_content",edit_type,function(error,result){
       if(error){
           alert("Error Occured while fetching data");
       }else{
              if(result == ""){
                   return false;
               }else{
                console.log("user_agreement_content");
                console.log(result[0].privacy_content);
                $('#edit_privacy').trumbowyg('html', result[0].privacy_content);
               }
        }
    });
});


function event_capture(){

  $('#cancelBack').click(function (e) {
     Router.go('/settings');     
  });

  $('#save_edit_privacy').click(function (e) {
        // alert('here');
        var edit_privacy = $("#edit_privacy").val();
        edit_privacy.trim();

        // alert(edit_privacy);

        get_cookies = Meteor.subscribe('get_cookies');        
        Meteor.call('update_useragreement',edit_privacy,function(error,result){
          if(error){
            console.log('error');
          }
          else{
            console.log('Sucess');
            Router.go('/settings');
          }
        });
  });
}