
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
			 $("#email").addClass('empty_field').focus();
			 return false;
		}else{
			$("#email").removeClass('empty_field').blur();

				var email_validation = ValidateEmail(email);

				if(email_validation == false){
					$('#email').addClass('empty_field').focus();
					return false;
				}
				else{
					$('#email').removeClass('empty_field').blur();
				}
			  }	

		$("#email_addr").removeClass('empty_field');
		// alert(email_addr);

					$('#loader_gif').removeClass('div_hide_class');
				    $('#save_text').addClass('div_hide_class');

		        Meteor.call('send_forget_password_email',email_addr,function(error,result){


				        $('#loader_gif').addClass('div_hide_class');
    					$('#save_text').removeClass('div_hide_class');

		        if(error){
		          // swal("Some error occured");
		              swal({
						  // title: "Good job!",
						  text: 'Some error occured!',
						  // icon: "success",
						  button: "ok",
						  icon: "warning",
						  dangerMode: true,
						});
		        }else{

					    swal({
						  // title: "Good job!",
						  text: result.msg,
						  icon: "warning",
						  button: "ok",
						  // icon: "success",
						  dangerMode: true,
						});


					console.log(result);
					// alert("We have sent a password reset email to your registered email address.");
				}
		    });

		$("#email").val("");
	});

}



function ValidateEmail(mail) 
{

	var email = $('#email').val();

 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
  {
    return (true)
  }

    // swal("You have entered an invalid email address!");
    swal({
				  // title: "Good job!",
				  text: 'You have entered an invalid email address!',
				  // icon: "success",
				  button: "ok",
				  icon: "warning",
				  dangerMode: true,
				});

    return (false)
}