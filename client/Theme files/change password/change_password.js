
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
// import { Base64 } from 'meteor/ostrio:base64';
import { Session } from 'meteor/session';

import swal from 'sweetalert';
import { admin_details } from './../../../import/collections/insert.js';

var admin_detailed;

 Template.change_password.onDestroyed(function(){
  // alert('cool');
  admin_detailed.stop();
 });

 Template.change_password.onRendered(function(){

 	$('#loading_div').removeClass('loader_visiblity_block');
    admin_detailed = Meteor.subscribe('admin_details');

click_events();

   setTimeout(function(){
   		click_events();
	 	$('#loading_div').addClass('loader_visiblity_block');
	},2000);

});

 function click_events(){

	$("#go_back").click(function(event){
        event.preventDefault();
        window.history.go(-1);
    });


	$('#clear_form').click(function (e) {
		$('#old_password').val("");
		$('#new_password').val("");
		$('#retype_password').val("");

		$('#old_password').removeClass('empty_field').blur();
		$('#new_password').removeClass('empty_field').blur();
		$('#retype_password').removeClass('empty_field').blur();
	});

	$('#change_password_value').click(function (e) {
		// swal('here: ');

		var old_password = $('#old_password').val();
		var new_password = $('#new_password').val();
		var retype_password = $('#retype_password').val();

      		if(old_password == '' || old_password == undefined ){
				$('#old_password').addClass('empty_field').focus();
				return false;
			  }
			  else
			  {
				$('#old_password').removeClass('empty_field').blur();
			  }

      		if(new_password == '' || new_password == undefined ){
				$('#new_password').addClass('empty_field').focus();
				return false;
			  }
			  else
			  {
				$('#new_password').removeClass('empty_field').blur();
			  }

      		if(retype_password == '' || retype_password == undefined ){
				$('#retype_password').addClass('empty_field').focus();
				return false;
			  }
			  else
			  {
				$('#retype_password').removeClass('empty_field').blur();
			  }

			  if(new_password.length < 5){
			  	swal('Too short new password!');

				$('#new_password').addClass('empty_field').focus();
				return false;
			  }


			  if(new_password != retype_password){
			  	swal('New password & Re-typed password does not match!');
			  	$('#retype_password').addClass('empty_field').focus();
			  	return false;
			  }

    var logged_in_user = Session.get("active_user");
    var logged_in_user_type = Session.get("active_user_type");

	Meteor.call('change_admin_password',old_password,new_password,logged_in_user,logged_in_user_type,function(error,result,logged_in_user){
		if(error){
			swal('some Error occured');
		}else{
			swal(result.msg);
			if(result.action_status == 1){
				Session.setPersistent("active_user",result.active_user);
			    }
		$('#old_password').val("");
		$('#new_password').val("");
		$('#retype_password').val("");

		$('#old_password').removeClass('empty_field').blur();
		$('#new_password').removeClass('empty_field').blur();
		$('#retype_password').removeClass('empty_field').blur();
			}
});

	});

}