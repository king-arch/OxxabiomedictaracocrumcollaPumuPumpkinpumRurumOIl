
Router.route('/', {
// layoutTemplate: 'left_panel',
path: '/',
onBeforeAction: function() {
this.render("login");
}
});
Router.route('/create_a_record', {
layoutTemplate: 'left_panel',
path: '/create_a_record',
onBeforeAction: function() {
this.render("create_a_record");
}
});

Router.route('/change_password', {
layoutTemplate: 'left_panel',
path: '/change_password',
onBeforeAction: function() {
this.render("change_password");
}
});

Router.route('/report_listing_patient', {
layoutTemplate: 'left_panel',
path: '/report_listing_patient',
onBeforeAction: function() {
this.render("report_listing_patient");
}
});

Router.route('/forget_password', {
onBeforeAction: function() {
this.render("forget_password");
}
});


Router.route('/add_doctor', {
layoutTemplate: 'left_panel',
path: '/add_Doctor',
onBeforeAction: function() {
this.render("add_doctor");
}
});

Router.route('/add_patient', {
layoutTemplate: 'left_panel',
path: '/add_patient',
onBeforeAction: function() {
this.render("add_patient");
}
});

Router.route('/dashboard_admin', {
layoutTemplate: 'left_panel',
path: '/dashboard_admin',
onBeforeAction: function() {
this.render("dashboard");
}
});

Router.route('/dashboard_patient', {
layoutTemplate: 'left_panel',
path: '/dashboard_patient',
onBeforeAction: function() {
this.render("dashboard_patient");
}
});

Router.route('/dashboard_doctor', {
layoutTemplate: 'left_panel',
path: '/dashboard_doctor',
onBeforeAction: function() {
this.render("patient_listing");
}
});

Router.route('/patient_listing', {
layoutTemplate: 'left_panel',
path: '/patient_listing',
onBeforeAction: function() {
this.render("patient_listing");
}
});

Router.route('/settings', {
layoutTemplate: 'left_panel',
path: '/settings',
onBeforeAction: function() {
this.render("settings");
}
});


Router.route('/create_report_doctor', {
layoutTemplate: 'left_panel',
path: '/create_report_doctor',
onBeforeAction: function() {
this.render("create_report_doctor");
}
});

Router.route('/report_listing_doctor', {
layoutTemplate: 'left_panel',
path: '/report_listing_doctor',
onBeforeAction: function() {
this.render("report_listing_doctor");
}
});

Router.route('/create_report', {
layoutTemplate: 'left_panel',
path: '/create_report',
onBeforeAction: function() {
this.render("create_report");
}
});

Router.route('/report_listing', {
layoutTemplate: 'left_panel',
path: '/report_listing',
onBeforeAction: function() {
this.render("report_listing");
}
});


Router.route('/user_policy_display', {
onBeforeAction: function() {
this.render("user_policy_display");
}
});


Router.route('/cookies_display', {
onBeforeAction: function() {
this.render("cookies_display");
}
});

Router.route('/user_agreement_display', {
onBeforeAction: function() {
this.render("user_agreement_display");
}
});


Router.route('/modality_list', {
layoutTemplate: 'left_panel',
path: '/modality_list',
onBeforeAction: function() {
this.render("modality_list");
}
});

Router.route('/edit_profile_admin', {
layoutTemplate: 'left_panel',
path: '/edit_profile_admin',
onBeforeAction: function() {
this.render("edit_profile_admin");
}
});

Router.route('/cookies_edit', {
layoutTemplate: 'left_panel',
path: '/cookies_edit',
onBeforeAction: function() {
this.render("cookies_edit");
}
});

Router.route('/user_policy_edit', {
layoutTemplate: 'left_panel',
path: '/user_policy_edit',
onBeforeAction: function() {
this.render("user_policy_edit");
}
});

Router.route('/user_agreement_edit', {
layoutTemplate: 'left_panel',
path: '/user_agreement_edit',
onBeforeAction: function() {
this.render("user_agreement_edit");
}
});

Router.route('/edit_doctor/:id', {
layoutTemplate: 'left_panel',
onBeforeAction: function() {
this.render('edit_doctor');
}
});

Router.route('/edit_profile_doctor/:id', {
layoutTemplate: 'left_panel',
onBeforeAction: function() {
this.render('edit_profile_doctor_form');
}
});

Router.route('/edit_profile_patient/:id', {
layoutTemplate: 'left_panel',
onBeforeAction: function() {
this.render('edit_profile_patient');
}
});

Router.route('/change_forgot_password/:doctor_id', {
onBeforeAction: function() {
this.render('change_forget_password');
}
});

Router.route('/edit_patient/:id',{
layoutTemplate: 'left_panel',
onBeforeAction: function() {
this.render('edit_patient');
}
});
