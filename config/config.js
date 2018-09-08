


this.setTitle = function(title) {
  var base;
  base = 'Bio Meds';
  window.scrollTo(0,0);
  if (title) {
    return document.title = title + ' | ' + base;
  } else {
    return base;
  }
};


Router.route('/', {
// layoutTemplate: 'left_panel',
path: '/',
onBeforeAction: function() {
this.render("login");
},

onAfterAction: function() {
      return setTitle('Sign in');
    }
});


Router.route('/create_a_record', {
layoutTemplate: 'left_panel',
path: '/create_a_record',
onBeforeAction: function() {
this.render("create_a_record");
},
onAfterAction: function() {
      return setTitle('View Profile');
    }
});


Router.route('/change_password', {
layoutTemplate: 'left_panel',
path: '/change_password',
onBeforeAction: function() {
this.render("change_password");
},

onAfterAction: function() {
      return setTitle('Reset Password');
    }
});

Router.route('/report_listing_patient', {
layoutTemplate: 'left_panel',
path: '/report_listing_patient',
onBeforeAction: function() {
this.render("report_listing_patient");
},

onAfterAction: function() {
      return setTitle('Forgot Password');
    }
});

Router.route('/forget_password', {
onBeforeAction: function() {
this.render("forget_password");
},

onAfterAction: function() {
      return setTitle('Forgot Password');
    }
});


Router.route('/add_doctor', {
layoutTemplate: 'left_panel',
path: '/add_Doctor',
onBeforeAction: function() {
this.render("add_doctor");
},

onAfterAction: function() {
      return setTitle('Add Doctor');
    }
});

Router.route('/add_patient', {
layoutTemplate: 'left_panel',
path: '/add_patient',
onBeforeAction: function() {
this.render("add_patient");
},

onAfterAction: function() {
      return setTitle(' Add Patient ');
    }
});

Router.route('/dashboard_admin', {
layoutTemplate: 'left_panel',
path: '/dashboard_admin',
onBeforeAction: function() {
this.render("dashboard");
},

onAfterAction: function() {
      return setTitle('Doctor');
    }
});

Router.route('/dashboard_patient', {
layoutTemplate: 'left_panel',
path: '/dashboard_patient',
onBeforeAction: function() {
this.render("dashboard_patient");
},
onAfterAction: function() {
      return setTitle('Patient');
    }
});

Router.route('/dashboard_doctor', {
layoutTemplate: 'left_panel',
path: '/dashboard_doctor',
onBeforeAction: function() {
this.render("patient_listing");
},

onAfterAction: function() {
      return setTitle('Forgot Password');
    }
});

Router.route('/patient_listing', {
layoutTemplate: 'left_panel',
path: '/patient_listing',
onBeforeAction: function() {
this.render("patient_listing");
},

onAfterAction: function() {
      return setTitle('Patient');
    }
});

Router.route('/settings', {
layoutTemplate: 'left_panel',
path: '/settings',
onBeforeAction: function() {
this.render("settings");
},

onAfterAction: function() {
      return setTitle('Settings');
    }
});


Router.route('/create_report_doctor', {
layoutTemplate: 'left_panel',
path: '/create_report_doctor',
onBeforeAction: function() {
this.render("create_report_doctor");
},

onAfterAction: function() {
      return setTitle('Forgot Password');
    }
});

Router.route('/report_listing_doctor', {
layoutTemplate: 'left_panel',
path: '/report_listing_doctor',
onBeforeAction: function() {
this.render("report_listing_doctor");
},

onAfterAction: function() {
      return setTitle('Forgot Password');
    }
});

Router.route('/create_report', {
layoutTemplate: 'left_panel',
path: '/create_report',
onBeforeAction: function() {
this.render("create_report");
},

onAfterAction: function() {
      return setTitle(' Upload Image ');
    }
});

Router.route('/report_listing', {
layoutTemplate: 'left_panel',
path: '/report_listing',
onBeforeAction: function() {
this.render("report_listing");
},

onAfterAction: function() {
      return setTitle('View Report');
    }
});


Router.route('/user_policy_display', {
onBeforeAction: function() {
this.render("user_policy_display");
},

onAfterAction: function() {
      return setTitle('Change Password');
    }
});


Router.route('/cookies_display', {
onBeforeAction: function() {
this.render("cookies_display");
},

onAfterAction: function() {
      return setTitle('Forgot Password');
    }
});

Router.route('/user_agreement_display', {
onBeforeAction: function() {
this.render("user_agreement_display");
},

onAfterAction: function() {
      return setTitle('Forgot Password');
    }
});


Router.route('/modality_list', {
layoutTemplate: 'left_panel',
path: '/modality_list',
onBeforeAction: function() {
this.render("modality_list");
},

onAfterAction: function() {
      return setTitle('Forgot Password');
    }
});

Router.route('/edit_profile_admin', {
layoutTemplate: 'left_panel',
path: '/edit_profile_admin',
onBeforeAction: function() {
this.render("edit_profile_admin");
},

onAfterAction: function() {
      return setTitle('Forgot Password');
    }
});

Router.route('/cookies_edit', {
layoutTemplate: 'left_panel',
path: '/cookies_edit',
onBeforeAction: function() {
this.render("cookies_edit");
},

onAfterAction: function() {
      return setTitle('Forgot Password');
    }
});

Router.route('/user_policy_edit', {
layoutTemplate: 'left_panel',
path: '/user_policy_edit',
onBeforeAction: function() {
this.render("user_policy_edit");
},

onAfterAction: function() {
      return setTitle('Forgot Password');
    }
});

Router.route('/user_agreement_edit', {
layoutTemplate: 'left_panel',
path: '/user_agreement_edit',
onBeforeAction: function() {
this.render("user_agreement_edit");
},

onAfterAction: function() {
      return setTitle('Forgot Password');
    }
});

Router.route('/edit_doctor/:id', {
layoutTemplate: 'left_panel',
onBeforeAction: function() {
this.render('edit_doctor');
},

onAfterAction: function() {
      return setTitle('Forgot Password');
    }
});

Router.route('/edit_profile_doctor/:id', {
layoutTemplate: 'left_panel',
onBeforeAction: function() {
this.render('edit_profile_doctor_form');
},

onAfterAction: function() {
      return setTitle('Forgot Password');
    }
});

Router.route('/edit_profile_patient/:id', {
layoutTemplate: 'left_panel',
onBeforeAction: function() {
this.render('edit_profile_patient');
},

onAfterAction: function() {
      return setTitle('Forgot Password');
    }
});

Router.route('/change_forgot_password/:doctor_id', {
onBeforeAction: function() {
this.render('change_forget_password');
},

onAfterAction: function() {
      return setTitle('Reset Password');
    }
});

Router.route('/edit_patient/:id',{
layoutTemplate: 'left_panel',
onBeforeAction: function() {
  this.render('edit_patient');
},

onAfterAction: function() {
      return setTitle('Edit Patient');
    }
});
