
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Base64 } from 'meteor/ostrio:base64';
import { Session } from 'meteor/session';

import swal from 'sweetalert';

var get_cookies;


 Template.cookies_edit.onDestroyed(function(){
  // get_cookies.stop();
 });

 Template.cookies_edit.onRendered(function() {

      event_capture();

      var edit_type = "cookies"; 
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
        // return false;

        get_cookies = Meteor.subscribe('get_cookies');        
        Meteor.call('update_cookies',edit_privacy,function(error,result){
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