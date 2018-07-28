import { Template } from 'meteor/templating';

Template.login.events({
	"click #login_btn":function(events){
		events.preventDefault();
		alert("login_btn")
	}
})
