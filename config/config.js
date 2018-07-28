

Router.route('/', {
  layoutTemplate: 'left_panel',
  path: '/',
   onBeforeAction: function() {
		this.render("dashboard");
    }
  });



Router.route('/create_a_record', {
  layoutTemplate: 'left_panel',
  path: '/create_a_record',
   onBeforeAction: function() {
		this.render("create_a_record");
    }
  });


Router.route('/login', {
  path: '/login',
   onBeforeAction: function() {
		this.render("login");
    }
  });

