
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import { Base64 } from 'meteor/ostrio:base64';

import swal from 'sweetalert';
var admin_detailed;

 Template.change_forget_password.onDestroyed(function(){
  admin_detailed.stop();
 });

 Template.change_forget_password.onRendered(function(){

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

	$('#update_password').click(function (event) {
		event.preventDefault();
		var new_password = $("#new_password").val();
		var retype_password = $("#retype_password").val();

		if(new_password =='' || new_password == null){
			 $("#new_password").addClass('empty_field').focus();
		}else{
			$("#new_password").removeClass('empty_field').blur();
		}

		if(retype_password == "" || retype_password == null){
			$("#retype_password").addClass('empty_field').focus();
		}else{
			$("#retype_password").removeClass('empty_field').blur();
		}

		if(new_password != retype_password){
		    swal('new password and retyped password didnt matched !');
			$("#retype_password").addClass('empty_field').blur();
			return false;
		}
			
		var url = window.location.href;
        var new_url = url.split("/");
        url = new_url[new_url.length-1];
        var user_id = Base64.decode(url); 
        
					$('#loader_gif').removeClass('div_hide_class');
				    $('#save_text').addClass('div_hide_class');

		        Meteor.call('Update_forget_password',new_password,user_id,function(error,result){
				        $('#loader_gif').addClass('div_hide_class');
    					$('#save_text').removeClass('div_hide_class');

		        if(error){
		          alert("Some error occured");
		        }else{
					alert(result.msg);
					console.log(result);

					Router.go('/');
				}
		    });

		$("#email").val();

	});

}