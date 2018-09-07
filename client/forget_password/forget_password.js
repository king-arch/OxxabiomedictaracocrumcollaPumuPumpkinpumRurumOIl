
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
// import { Base64 } from 'meteor/ostrio:base64';
import { Session } from 'meteor/session';

import swal from 'sweetalert';
// import { admin_details } from './../import/collections/insert.js';
var admin_detailed;

 Template.forget_password.onDestroyed(function(){
  // alert('cool');
  admin_detailed.stop();
 });

 Template.forget_password.onRendered(function(){

 	$('#loading_div').removeClass('loader_visiblity_block');
    admin_detailed = Meteor.subscribe('admin_details');

click_events();

   setTimeout(function(){
   		click_events();
	 	$('#loading_div').addClass('loader_visiblity_block');
	},2000);
});

 function click_events(){
	$('#go_back').click(function (e) {
		Router.go('/');
	});

	$('#send_mail').click(function (event) {
		event.preventDefault();
		var email_addr=$("#email").val();
		if(email_addr==''){
			 $("#email_addr").addClass('empty_field');
		}else{

		$("#email_addr").removeClass('empty_field');
		// alert(email_addr);

					$('#loader_gif').removeClass('div_hide_class');
				    $('#save_text').addClass('div_hide_class');

		        Meteor.call('send_forget_password_email',email_addr,function(error,result){


				        $('#loader_gif').addClass('div_hide_class');
    					$('#save_text').removeClass('div_hide_class');

		        if(error){
		          alert("Some error occured");
		        }else{
					alert(result.msg);
					console.log(result);
					// alert("We have sent a password reset email to your registered email address.");
				}
		    });

		$("#email").val("");
	}

	});

}