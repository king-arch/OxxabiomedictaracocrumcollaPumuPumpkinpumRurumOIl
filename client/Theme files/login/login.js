

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';

import swal from 'sweetalert';

var admin_detailed;

 Template.login.onDestroyed(function(){
  admin_detailed.stop();

 });

 Template.login.onRendered(function(){

 	$('#loading_div').removeClass('loader_visiblity_block');
    admin_detailed = Meteor.subscribe('admin_details');

click_events();

   setTimeout(function(){
   		click_events();
	 	$('#loading_div').addClass('loader_visiblity_block');
	},2000);

});

 function click_events(){

	$('#send_to_cookies').click(function (e) {
		Router.go('/cookies_display');
	});

	$('#send_to_user_aggrement').click(function (e) {
		Router.go('/user_agreement_display');
	});

	$('#send_to_privacy').click(function (e) {
		Router.go('/user_policy_display');
	});

	$('#send_to_forget_password').click(function (e) {
		Router.go('/forget_password');
	});

	$('#Check_auth_for_login').click(function (e) {
		var email = $('#email').val();
		var password = $('#password').val();

      		if(email == '' || email == undefined ){
				$('#email').addClass('empty_field').focus();
				return false;
			  }
			  else
			  {
				$('#email').removeClass('empty_field').blur();
			  }

      		if(password == '' || password == undefined ){
				$('#password').addClass('empty_field').focus();
				return false;
			  }
			  else
			  {
				$('#password').removeClass('empty_field').blur();
			  }

    $('#loader_gif').removeClass('div_hide_class');
    $('#save_text').addClass('div_hide_class');

	Meteor.call('Check_login_auth',email,password,function(error,result){
		      
		      $('#loader_gif').addClass('div_hide_class');
              $('#save_text').removeClass('div_hide_class');

		if(error){
			// swal('some Error occured');
					    swal({
						  // title: "Good job!",
						  text: 'Some error occured!',
						  // icon: "success",
						  button: "ok",
						  icon: "warning",
						  dangerMode: true,
						});

		}else{
			if(result){

				if(result.status == 0){
				// swal(result.msg);

				    swal({
						  // title: "Good job!",
						  text: result.msg,
						  // icon: "success",
						  button: "ok",
						  icon: "warning",
						  dangerMode: true,
						});

			    }

			    if(result.login_type == 'admin'){

				Session.setPersistent("active_user",result.active_user);
				Session.setPersistent("active_user_type",result.login_type);
					Router.go('/create_report');
			    }
			    else if(result.login_type == 'patient'){
			    Session.setPersistent("active_user",result.active_user);
			    Session.setPersistent("active_user_type",result.login_type);
					Router.go('/report_listing_patient');
			    }
			    else if(result.login_type == 'doctor'){

			    Session.setPersistent("active_user",result.active_user);
			    Session.setPersistent("active_user_type",result.login_type);
					Router.go('/create_report_doctor');
			}
		}
	}
});

	});

}