
import { Meteor } from 'meteor/meteor';
import { doctor_details } from './../import/collections/insert.js';
import { patient_details } from './../import/collections/insert.js';
import { admin_details } from './../import/collections/insert.js';

import { Email } from 'meteor/email';
import { Base64 } from 'meteor/ostrio:base64';
import { Privacy } from './../import/collections/insert.js';
import { report } from './../import/collections/insert.js';
import { studies } from './../import/collections/insert.js';

import { modality } from './../import/collections/insert.js';
import { request } from "meteor/froatsnook:request";

Meteor.startup(() => {
});

Meteor.publish('admin_details', function() {
    return admin_details.find();

});
Meteor.publish('doctor_details', function() {
    return doctor_details.find();
});


  Meteor.publish('doctor_detail_with_limit_and_search', function(skip,query) {
      console.log('skip: '+skip + ' & '+'query: '+query);
      var new_query = new RegExp(query,'i');
      return doctor_details.find({doctor_name: new_query},{skip: skip,limit: 10});
  });

  Meteor.publish('doctor_detail_with_limit', function(skip) {
      console.log('skip: '+skip);
      return doctor_details.find({},{skip: skip,limit: 10});
  });

  Meteor.publish('doctor_detail_with_id', function(selected_doctor) {
      console.log('selected_doctor: '+selected_doctor);  
      return doctor_details.find({doctor_id: selected_doctor});  
  });

  Meteor.publish('patient_detail_with_id', function(selected_patient) {
      console.log('selected_patient: '+selected_patient);  
      return patient_details.find({patient_id: selected_patient});  
  });

  Meteor.publish('patient_detail_with_limit_and_search', function(skip,query) {
      console.log('skip: '+skip + ' & '+'query: '+query);
      var new_query = new RegExp(query,'i');
      return patient_details.find({patient_name: new_query},{skip: skip,limit: 10});
  });

  Meteor.publish('patient_detail_with_limit', function(skip) {
    console.log('skip: '+skip);
    return patient_details.find({},{skip: skip,limit: 10});
  });

  Meteor.publish('get_user_info_admin', function(active_user) {
    console.log('active_user: '+active_user);
    return admin_details.find({});
  });

  Meteor.publish('get_user_info_doctor', function(active_user) {
    console.log('active_user: '+active_user);
    return doctor_details.find({doctor_id: active_user});
  });

  Meteor.publish('get_user_info_patient', function(active_user) {
    console.log('active_user: '+active_user);
    return patient_details.find({patient_id: active_user});
  });

  Meteor.publish('patient_details', function() {
      return patient_details.find({});
  });

  Meteor.publish('doctor_details_alldata', function() {
      return doctor_details.find({});
  });

  Meteor.publish('patient_details_alldata', function() {
      return patient_details.find({});
  });

  Meteor.publish('modality_details_alldata', function() {
      return modality.find({});
  });

  Meteor.publish('get_cookies', function() {
      return privacy.find({});
  });

  Meteor.publish('get_report_listing', function() {
      return report.find({});
  });

  Meteor.publish('modality_type', function() {
      return modality.find({});
  });


 smtp = {
    username: 'biomedicsteam@gmail.com',
    password: 'Biomedic@123',
    server: 'smtp.gmail.com',
    port: 587
  }
  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;

Meteor.methods({

    "Insert_doctor_details": function(doctor_id,doctor_name,email,Speciality,Phone,hospital_name,Joining_date,location) {
    var check_if_already_exist = doctor_details.find({$or: [{ email: email },{Phone: Phone}] }).fetch();
    
    if(check_if_already_exist[0]){
      if(check_if_already_exist[0].email == email){
        var result = {
                "msg": "email already exist"
                   };
                   console.log('result.msg');
                   console.log(result.msg);
        return result;
      }
      else if(check_if_already_exist[0].Phone == Phone){
        var result = {"msg": "Phone number already exist"};
        console.log('result.msg');
          console.log(result.msg);
        return result;
      }
    }

    var password = Math.floor((Math.random() * 2465789) + 1)+"";

    var result = doctor_details.insert({

          doctor_id: doctor_id,
          password: password,
          doctor_name: doctor_name,
          email: email,
          Speciality: Speciality,

          Phone: Phone,
          hospital_name: hospital_name, 
          Joining_date: Joining_date,
          location: location,
          doctor_status: 'Activate',

          createdAt: Date.now()

         });


    send_email_doctor(doctor_id,doctor_name,email,password);
    return result;

    },

    "Check_login_auth": function(email,password) {
      console.log(email+' & '+password);

    var result = admin_details.find({admin_email: email,admin_password: password}).fetch();
      console.log(result);

      console.log('case 1');
    if(result[0]){
      console.log('case 1.1');
      var message = {"msg": 'Welcome back',"status": "1","login_type": "admin","active_user": result[0].admin_id};
      console.log(message);
      return message;
    }
    else{
      console.log('case 2');
      var result2 = doctor_details.find({email: email,password: password}).fetch();
      console.log(result2);

      if(result2[0]){
        console.log('case 2.2');
        var message = {"msg": 'Welcome back',"status": "1","login_type": "doctor","active_user": result2[0].doctor_id};
        console.log(message);
        return message;
      }
      else{
        console.log('case 3');
          var result3 = patient_details.find({email: email,password: password}).fetch();
          console.log(result3);

          if(result3[0]){
            console.log('case 3.3');
            var message = {"msg": 'Welcome back',"status": "1","login_type": "patient","active_user": result3[0].patient_id};
            console.log(message);
            return message;
          }else{
            console.log('case 4');
                    var message = {"msg": 'Wrong email or password',"status": "0"};
                    console.log(message);
                    return message;
               }
      }
    }
  },


    "Insert_patient_details": function(patient_id,patient_name,email,Phone,registration_date,dob,location) {
  	var check_if_already_exist = patient_details.find({$or: [{ email: email },{Phone: Phone}] }).fetch();
  	
  	if(check_if_already_exist[0]){
  		if(check_if_already_exist[0].email == email){
  			var result = {
  							"msg": "email already exist"
  			           };
  			           console.log('result.msg');
  			           console.log(result.msg);
  			return result;
  		}
  		else if(check_if_already_exist[0].Phone == Phone){
  			var result = {"msg": "Phone number already exist"};
  			console.log('result.msg');
  		    console.log(result.msg);
  			return result;
  		}
  	}
    var password = Math.floor((Math.random() * 2465789) + 1)+"";

        var result = patient_details.insert({

            patient_id: patient_id,
            patient_name: patient_name,
            email: email,
            password: password,

            Phone: Phone,
            registration_date: registration_date,
            dob: dob,
            location: location,
            patient_status: 'Activate',

            createdAt: Date.now()
         });



    send_email_patient(patient_name,email,password);
    return result;


    return result;
    },

    "fetch_doctor_details": function(doctor_id) {
        var result = doctor_details.find({"doctor_id": doctor_id}).fetch();

    return result;
    },


    "fetch_admin_details": function(admin_id) {
        var result = admin_details.find({"admin_id": admin_id}).fetch();

    return result;
    },

    "show_paginaion_count": function(search) {
      var query = new RegExp(search,'i');
        var result = doctor_details.find({"doctor_name": query}).fetch();

    if(result.length == 0){
      result = 0;
    }
    return result.length;
    },

    "show_paginaion_count_patient": function(search) {
      var query = new RegExp(search,'i');
        var result = patient_details.find({"patient_name": query}).fetch();

    if(result.length == 0){
      result = 0;
    }
    return result.length;
    },

    "show_pagination_count_onrender": function() {
      // console.log('here i am');
        var result = doctor_details.find({}).fetch();
        console.log(result.length);
    if(result.length == 0){
      result = 0;
    }
    return result.length;
    },

    "show_pagination_count_onrender_for_patient": function() {
      var result = patient_details.find({}).fetch();
      console.log(result.length);
    if(result.length == 0){
      result = 0;
    }
    return result.length;
    },

    "show_pagination_count_for_reports": function() {
      var result = report.find({}).fetch();
      console.log(result.length);
    if(result.length == 0){
      result = 0;
    }
    return result.length;
    },

    "fetch_patient_details": function(patient_id) {
        
        var result = patient_details.find({"patient_id": patient_id}).fetch();

    return result;
    },

    "check_if_email_exist": function(email) {
        var result = doctor_details.find({"email": email}).fetch();
    return result;
    },

    "check_if_phone_exist": function(Phone) {
        var result = doctor_details.find({"Phone": Phone}).fetch();
        return result;
    },

    "edit_doctor_details": function(doctor_id,doctor_name,email,Speciality,Phone,hospital_name,Joining_date,location) {

    var newUser = doctor_details.find({"doctor_id":doctor_id}).fetch();

    var check_if_already_exist = doctor_details.find({doctor_id: {$ne: doctor_id},$or: [{ email: email },{Phone: Phone}] }).fetch();
    
    if(check_if_already_exist[0]){
      if(check_if_already_exist[0].email == email){
        var result = {
                "msg": "email already exist"
                   };
                   console.log('result.msg');
                   console.log(result.msg);
        return result;
      }
      else if(check_if_already_exist[0].Phone == Phone){
        var result = {"msg": "Phone number already exist"};
        console.log('result.msg');
          console.log(result.msg);
        return result;
      }
    }

    if(newUser[0]){
    var result =  doctor_details.update({
       _id: newUser[0]._id,
      }, {
        $set: {
              doctor_name: doctor_name,
              email: email,
              Speciality: Speciality,

              Phone: Phone,
              hospital_name: hospital_name, 
              Joining_date: Joining_date,
              location: location,
        }
      });
    return result;
    }

    },

    "edit_patient_details": function(patient_id,patient_name,email,Phone,dob,registration_date,location) {
console.log('patient_id: '+patient_id);
    var newUser = patient_details.find({"patient_id":patient_id}).fetch();
    var check_if_already_exist = patient_details.find({patient_id: {$ne: patient_id},$or: [{ email: email },{Phone: Phone}] }).fetch();

    if(check_if_already_exist[0]){
      // if(email_already_stored != check_if_already_exist[0].email){

          if(check_if_already_exist[0].email == email){
            var result = {
                    "msg": "email already exist"
                       };
                       console.log('result.msg');
                       console.log(result.msg);
            return result;
          }

          else if(check_if_already_exist[0].Phone == Phone){
            var result = {"msg": "Phone number already exist"};
            console.log('result.msg');
              console.log(result.msg);
            return result;
          }

      // }

    }
console.log('hand');
    if(newUser[0]){
      console.log('there');
    var result =  patient_details.update({
        _id: newUser[0]._id,
      }, {
        $set: {

            patient_name: patient_name,
            email: email,
            Phone: Phone,

            dob: dob,
            registration_date: registration_date,
            location: location,

        }

      });   
    return result;
    }

    },

    "edit_admin_details": function(email,admin_id,admin_name) {
console.log('email: '+email);
  	// var newUser = admin_details.find({admin_email: email}).fetch();
  	// if(newUser[0]){

   //        if(newUser[0].admin_email == email){
   //          var result = {
   //                  "msg": "email already exist"
   //                     };
   //                     console.log('result.msg');
   //                     console.log(result.msg);
   //          return result;
   //        }
   //    }

          var result2 =  admin_details.update({
              admin_id: admin_id,
            }, {
              $set: {
                  admin_email: email,
                  admin_name: admin_name,
              }
            });   
          var result = {
                    "msg": "successfully Saved."
                       };
                       console.log('result.msg');
                       console.log(result.msg);
            return result;
    },

    "change_doctor_details_status": function(doctor_id,status) {
    // console.log(doctor_id);
    var newUser = doctor_details.find({"doctor_id":doctor_id}).fetch();
    if(newUser[0]){

      // console.log(newUser[0]);
    var result =  doctor_details.update({
        _id: newUser[0]._id,
      }, {
        $set: {
              doctor_status: status,
              updatedAt:  Date.now,
        }

      });
    return result;
    }

    },


    "doctors_count": function() {
        var result = doctor_details.find({}).count();
        return result;
    },

    "change_admin_password": function(old_password,new_password,logged_in_user,logged_in_user_type) {
    if(logged_in_user_type == 'admin'){
    var newUser = admin_details.find({admin_password: old_password}).fetch();
    
     console.log(newUser);
    if(newUser[0]){
    var result =  admin_details.update({
        _id: newUser[0]._id,
      }, {
        $set: {

              admin_password: new_password,
              updatedAt:  Date.now,
        }
      });
     var message = {"msg": "Password successfully changed.","action_status": 1,"active_user": newUser[0].admin_id,
                    "active_user_type": "admin"};
    console.log(message);
    return message;
    }else{
      var message = {"msg": "Wrong Old password!","action_status": 0};
      console.log(message);
       return message;
    }
  }
  else if(logged_in_user_type == 'doctor'){

          var newUser2 = doctor_details.find({"doctor_id":logged_in_user,password: old_password}).fetch();
    
     console.log(newUser2);
    if(newUser2[0]){
    var result =  doctor_details.update({
        _id: newUser2[0]._id,
      }, {
        $set: {

              password: new_password,
              updatedAt:  Date.now,
        }
      });
     var message = {"msg": "Password successfully changed.","action_status": 1,"active_user": newUser2[0].doctor_id};
    console.log(message);
    return message;
    }else{
      var message = {"msg": "Wrong Old password!","action_status": 0};
      console.log(message);
       return message;
    }

  }
  else if(logged_in_user_type == 'patient'){

          var newUser2 = patient_details.find({"patient_id":logged_in_user,password: old_password}).fetch();
    
     console.log(newUser2);
    if(newUser2[0]){
    var result =  patient_details.update({
        _id: newUser2[0]._id,
      }, {
        $set: {

              password: new_password,
              updatedAt:  Date.now,
        }
      });
     var message = {"msg": "Password successfully changed.","action_status": 1,"active_user": newUser2[0].patient_id};
    console.log(message);
    return message;
    }else{
      var message = {"msg": "Wrong Old password!","action_status": 0};
      console.log(message);
       return message;
   
  }
}
    },

    "change_patient_details_status": function(patient_id,status) {
    console.log(patient_id+' & '+status);
    var newUser = patient_details.find({"patient_id":patient_id}).fetch();
    if(newUser[0]){

      console.log(newUser[0]);
    var result =  patient_details.update({
        _id: newUser[0]._id,
      }, {
        $set: {
              patient_status: status,
              updatedAt:  Date.now,
        }

      });
    return result;
    }

    },

    "change_modality_details_status": function(modality_id,status) {
    console.log(modality_id+' & '+status);
    var newUser = modality.find({"modality_id": modality_id}).fetch();
    console.log(newUser);

    if(newUser[0]){

      console.log(newUser[0]);
    var result =  modality.update({
        _id: newUser[0]._id,
      }, {
        $set: {
              modality_status: status,
              updatedAt:  Date.now,
        }

      });
    return result;
    }
    },

    "send_forget_password_email": function(patient_id) {
      return send_forget_password_mail(patient_id);
    },

    "add_new_modality": function(modality_name) {

           var modality_id = 'modality_id_'+Math.floor((Math.random() * 2465789) + 1);

             var result = modality.insert({  

                     modality_name: modality_name,           
                     modality_id: modality_id,

                     modality_status: 'Activate',
                     created_at: Date.now(),
                   });
                     return  result;
    },

    "Update_forget_password": function(new_password,user_id){

     var result4 = admin_details.find({admin_id: user_id}).fetch();
     if(result4[0]){
      console.log(result4[0]);
    var result =  admin_details.update({
        _id: result4[0]._id,
      }, {
        $set: {
              admin_password: new_password,
              updatedAt:  Date.now,
        }

      });
          var message = {"msg": "password successfully updated."};
          console.log(message);
          return message;

     }else{
        var result2 = patient_details.find({"patient_id":user_id}).fetch();
        if(result2[0]){
    var result =  patient_details.update({
        _id: result2[0]._id,
      }, {
        $set: {
              password: new_password,
              updatedAt:  Date.now,
        }
      });
          var message = {"msg": "password successfully updated."};
          console.log(message);
          return message;
       }else{
    var result3 = doctor_details.find({"doctor_id":user_id}).fetch();
        if(result3[0]){
    var result =  doctor_details.update({
        _id: result3[0]._id,
      }, {
        $set: {
              password: new_password,
              updatedAt:  Date.now,
        }
      });
          var message = {"msg": "password successfully updated."};
          console.log(message);
          return message;
       }else{
          var message = {"msg": "this eamil doesnt exist in our system.Please re-check"};
          console.log(message);
          return message;
       }
       }
     }
    },



  //********************Start edit privacy, cookies & user agreement***********************************

  update_privacy:function(edit_privacy){

        var checkifPrivacyExist = Privacy.find({ edit_type: "privacy" }).fetch();
        console.log(checkifPrivacyExist);
    if(checkifPrivacyExist[0]){
      console.log("here 1");
    var result =  Privacy.update({
        _id: checkifPrivacyExist[0]._id,
      }, {
         $set: 
          {
        privacy_content: edit_privacy,
          updated_at: Date.now(),
      }
      });
    return result;
    }
    else{    
      console.log("here 2");
       var result = Privacy.insert({  
                   edit_type: "privacy",           
                     privacy_content: edit_privacy,
                     created_at: Date.now(),
          });
        return result;
    }
  },  
 

  update_cookies:function(edit_privacy){

    var checkifPrivacyExist = Privacy.find({ edit_type: "cookies" }).fetch();
    if(checkifPrivacyExist[0]){
    var result =  Privacy.update({
        _id: checkifPrivacyExist[0]._id,
      }, {
          $set: 
          {

        privacy_content: edit_privacy,
          updated_at: Date.now(),
       }

      });
    return result;
    }
    else{    
       var result = Privacy.insert({  
                   edit_type: "cookies",           
                     privacy_content: edit_privacy,
                     created_at: Date.now(),
          });
        return result;
    }
  },  


  update_useragreement:function(edit_privacy){

        var checkifPrivacyExist = Privacy.find({ edit_type: "useragreement" }).fetch();
    if(checkifPrivacyExist[0]){
    var result =  Privacy.update({
        _id: checkifPrivacyExist[0]._id,
      }, {
          $set: 
          {
        privacy_content: edit_privacy,
          updated_at: Date.now(),
      }
      });
    return result;
    }
    else{    
       var result = Privacy.insert({  
                   edit_type: "useragreement",           
                     privacy_content: edit_privacy,
                     created_at: Date.now(),
          });
        return result;
    }
  },  


  fetch_privacy_content:function(edit_type){
    var result = Privacy.find({ edit_type: edit_type }).fetch();
        return result;
  },  

  //********************End edit privacy, cookies & user agreement***********************************//

  //********************Start Create report section***********************************//

  save_report:function(selected_doctor,selected_modality,selected_patient,report_submited_by,studies_trasaction_id){

    var result = report.insert({
          selected_doctor: selected_doctor,
          selected_modality: selected_modality,
          selected_patient: selected_patient,

          report_submited_by: report_submited_by,
          studies_trasaction_id: studies_trasaction_id,
          report_status: 'Activate',
          createdAt: Date.now()

         });
        return result;
  },  

  async save_dicom_detail_in_desired_format(response){

     // var dicom_information = await send_dicom_file(url,path,'ankle.dcm');
     var dicom_information = JSON.parse(response);
     console.log('dicom_information: ');
     console.log(dicom_information.ID);

     var instance_path = 'http://pacs.space:8042/instances/'+ dicom_information.ID;
     var instance_data = await get_instance_details(instance_path, dicom_information.ID);

     // console.log('instance_data ');
     // console.log(instance_data);

     var series_url =  'http://pacs.space:8042/series/' + instance_data.ParentSeries;
     var series_data = await get_series_details(series_url,instance_data);

     // console.log('series_data ');
     // console.log(series_data);

      var studies_url =  'http://pacs.space:8042/studies/' + series_data.ParentStudy; 
     var studies_details = await get_studies_details(studies_url,series_data);

     // console.log('studies_details ');
     // console.log(studies_details);

     var array = new Array();
     array.push(studies_details);

     var transaction_id = 'series_id_'+Math.floor((Math.random() * 2465789) + 1);
     var result = studies.insert({
                    "transactionId": transaction_id,
                    "studies" : array,
                    "created_at": Date.now(),
                });
        return transaction_id;
  },  

  //********************End Create report section***********************************//

});

function get_instance_details(instance_path, file_url){
 return new Promise((resolve, reject) => {
  var options = { method: 'GET',
      url: instance_path,
      headers: 
       { 'postman-token': 'd99f8800-8315-0cee-d9d4-f3e565e6815f',
         'cache-control': 'no-cache' } };

    request(options, function (error, response, body) {
      if (error) reject(error);
      var data =  JSON.parse(body);
      var instance_data  = {
            "sopInstanceUid" : data.MainDicomTags.SOPInstanceUID,
            "rows":1,
            "InstanceNumber" : data.MainDicomTags.InstanceNumber,
            "NumberOfFrames" : data.MainDicomTags.NumberOfFrames,
            "url" : "http://localhost:8042/instances/"+file_url + "/preview",
            "ParentSeries": data.ParentSeries
      }
          
       resolve(instance_data)
});

  });
}

function get_series_details(series_url,instance_data){
 return new Promise((resolve, reject) => {
  var options = { method: 'GET',
            url: series_url,
            headers: 
             { 'postman-token': '3b89e792-9184-a5a1-1119-d7c9e1bdb8d8',
               'cache-control': 'no-cache' } };

          request(options, function (error, response, body) {
            if (error) reject(error);

            var data =  JSON.parse(body);


            var instance_data_array = new Array();
            instance_data_array.push(instance_data);
            var series_details  = {
                    "seriesInstanceUid"  : data.MainDicomTags.SeriesInstanceUID,
                    "Manufacturer"  : data.MainDicomTags.Manufacturer,
                     "instances" : instance_data_array,
                     "ParentStudy": data.ParentStudy
            }

            resolve(series_details);
  });
});
}

function get_studies_details(studies_url,series_data){
 return new Promise((resolve, reject) => {
  
           var options = { method: 'GET',
                url: studies_url,
                headers: 
                 { 'postman-token': 'deaac314-9297-702f-be37-29dd6fee5abc',
                   'cache-control': 'no-cache' } };

              request(options, function (error, response, body) {
                if (error) reject(error);
                
                var data =  JSON.parse(body);

                var json  = new Array();
                json.push(series_data);
                var data = {
                  "studyInstanceUid" : data.MainDicomTags.StudyInstanceUID,
                  "patientName" : data.PatientMainDicomTags.PatientName, 
                  "patientName" : data.PatientMainDicomTags.PatientName, 
                  "seriesList": json,
                }
                resolve(data);
                 
              });

            
  });
} 



function send_email_doctor(doctor_id,doctor_name,email,password){
            var name = doctor_name;
            var password = password;
            var email = email;
            var div_style= "width:600px;height:auto;margin:auto;font-family:sans-serif;font-weight:normal;font-size:12px; border:10px solid red";
            var div_style2= "width:600px;height:auto;float:left;background-color:#efefef;border:10px solid red !important";
            var div_style3= "background-color:#fff;border-spacing:0px;width:100%";
            var div_style4= "width:100%;height:50px;float:left;background-color:#fff";
            var div_style5= "background-color:#fff;width:100%";
            var div_style6= "background-color:#fff;width:100%";
            var div_style7= "width:150px;height:auto;float:left;vertical-align: middle;";
            var div_style8= "height: 50px";
            var div_style9= "height: 50px";
            var div_style10= "float: right; margin-right: 15px; color: #666";
            var div_style11= "width:96%;height:auto;float:left;padding:10px";
            var div_style12= "width:100%; border:0";
            var div_style13= "color:#414850;line-height:30px";
            var div_style14= "color:#414850;line-height:30px";
            var div_style15= "width:100%;float:left;background-color:#fff;;margin-top:6px";
            var image_url="https://www.brandcrowd.com/gallery/brands/pictures/picture13752018187407.png";
            var style="width:150px; height:150px";
            var spacing="2";
            var email = email;
            var htmlCode="<html><head><title>Email</title></head><body><div style="+div_style+"><div style="+div_style2 +"><table style="+div_style3+"><tbody><tr><td><div style="+div_style4+"><table style="+div_style6+"><tbody><tr><td><div style="+div_style7+"><a> <img src="+image_url+" style="+style+"/></a></div></td><td><p style="+div_style10+"><p></td>"+
            "</tr></tbody></table></div><div style="+div_style11+"><table style ="+div_style12 +" cellspacing="+spacing+" cellpadding="+spacing+"><tbody><tr><td "+
            "colspan="+spacing+">&nbsp;</td></tr><tr><td colspan="+spacing+">&nbsp;</td></tr><tr><td colspan="+spacing+" style="+div_style14+">Hi "+name +",</td></tr><tr><td colspan="+spacing+">Down below are the credentail of your Biomedic account."+
            "!</td></tr><tr><td colspan="+div_style11
            +"><br/><p>Email: "+email+" </p></br><p>Password : "+password+"</td></tr><tr><td colspan="+spacing+">&nbsp;</td></tr><tr><td colspan="+spacing
            +">P.S. This email was intended to reach "+ name +", if you are not "+name +",please ignore this email; we will never again send you an email.</td></tr><tr><td colspan="+spacing
            +">&nbsp;</td></tr><tr><td colspan="+spacing+">Regards</td></tr><tr><td colspan="+spacing
            +">The Biomedic Team</td></tr><tr><td colspan="+spacing+">&nbsp;</td></tr><tr><td colspan="+spacing+">&nbsp;</td></tr></tbody></table></div><div style="+div_style15+"><table style="+div_style6+"><tbody><tr><td><center><small style="+div_style6+">This email was intended for "+name+".<br/>Copyright Biomedic, 2018.</small></center></td></tr></tbody></table></div></td></tr></tbody></table></div></div></body></html>";

             var email = {
                        to: email,
                        from: 'biomedicsteam@gmail.com',
                        subject: "Biomedic | welcome to Biomedic",
                        html: htmlCode,
                    };

                    Email.send(email);

}

function send_email_patient(patient_name,email,password){
            var name = patient_name;
            var password = password;
            var email = email;
            var div_style= "width:600px;height:auto;margin:auto;font-family:sans-serif;font-weight:normal;font-size:12px; border:10px solid red";
            var div_style2= "width:600px;height:auto;float:left;background-color:#efefef;border:10px solid red !important";
            var div_style3= "background-color:#fff;border-spacing:0px;width:100%";
            var div_style4= "width:100%;height:50px;float:left;background-color:#fff";
            var div_style5= "background-color:#fff;width:100%";
            var div_style6= "background-color:#fff;width:100%";
            var div_style7= "width:150px;height:auto;float:left;vertical-align: middle;";
            var div_style8= "height: 50px";
            var div_style9= "height: 50px";
            var div_style10= "float: right; margin-right: 15px; color: #666";
            var div_style11= "width:96%;height:auto;float:left;padding:10px";
            var div_style12= "width:100%; border:0";
            var div_style13= "color:#414850;line-height:30px";
            var div_style14= "color:#414850;line-height:30px";
            var div_style15= "width:100%;float:left;background-color:#fff;;margin-top:6px";
            var image_url="https://www.brandcrowd.com/gallery/brands/pictures/picture13752018187407.png";
            var style="width:150px; height:150px";
            var spacing="2";
            var email = email;
            var htmlCode="<html><head><title>Email</title></head><body><div style="+div_style+"><div style="+div_style2 +"><table style="+div_style3+"><tbody><tr><td><div style="+div_style4+"><table style="+div_style6+"><tbody><tr><td><div style="+div_style7+"><a> <img src="+image_url+" style="+style+"/></a></div></td><td><p style="+div_style10+"><p></td>"+
            "</tr></tbody></table></div><div style="+div_style11+"><table style ="+div_style12 +" cellspacing="+spacing+" cellpadding="+spacing+"><tbody><tr><td "+
            "colspan="+spacing+">&nbsp;</td></tr><tr><td colspan="+spacing+">&nbsp;</td></tr><tr><td colspan="+spacing+" style="+div_style14+">Hi "+name +",</td></tr><tr><td colspan="+spacing+">Down below are the credentail of your Biomedic account."+
            "!</td></tr><tr><td colspan="+div_style11
            +"><br/><p>Email: "+email+" </p></br><p>Password : "+password+"</td></tr><tr><td colspan="+spacing+">&nbsp;</td></tr><tr><td colspan="+spacing
            +">P.S. This email was intended to reach "+ name +", if you are not "+name +",please ignore this email; we will never again send you an email.</td></tr><tr><td colspan="+spacing
            +">&nbsp;</td></tr><tr><td colspan="+spacing+">Regards</td></tr><tr><td colspan="+spacing
            +">The Biomedic Team</td></tr><tr><td colspan="+spacing+">&nbsp;</td></tr><tr><td colspan="+spacing+">&nbsp;</td></tr></tbody></table></div><div style="+div_style15+"><table style="+div_style6+"><tbody><tr><td><center><small style="+div_style6+">This email was intended for "+name+".<br/>Copyright Biomedic, 2018.</small></center></td></tr></tbody></table></div></td></tr></tbody></table></div></div></body></html>";

             var email = {
                        to: email,
                        from: 'biomedicsteam@gmail.com',
                        subject: "Biomedic | welcome to Biomedic",
                        html: htmlCode,
                    };

                    Email.send(email);

}


function send_email_patient(patient_name,email,password){
            var name = patient_name;
            var password = password;
            var email = email;
            var div_style= "width:600px;height:auto;margin:auto;font-family:sans-serif;font-weight:normal;font-size:12px; border:10px solid red";
            var div_style2= "width:600px;height:auto;float:left;background-color:#efefef;border:10px solid red !important";
            var div_style3= "background-color:#fff;border-spacing:0px;width:100%";
            var div_style4= "width:100%;height:50px;float:left;background-color:#fff";
            var div_style5= "background-color:#fff;width:100%";
            var div_style6= "background-color:#fff;width:100%";
            var div_style7= "width:150px;height:auto;float:left;vertical-align: middle;";
            var div_style8= "height: 50px";
            var div_style9= "height: 50px";
            var div_style10= "float: right; margin-right: 15px; color: #666";
            var div_style11= "width:96%;height:auto;float:left;padding:10px";
            var div_style12= "width:100%; border:0";
            var div_style13= "color:#414850;line-height:30px";
            var div_style14= "color:#414850;line-height:30px";
            var div_style15= "width:100%;float:left;background-color:#fff;;margin-top:6px";
            var image_url="https://www.brandcrowd.com/gallery/brands/pictures/picture13752018187407.png";
            var style="width:150px; height:150px";
            var spacing="2";
            var email = email;
            var htmlCode="<html><head><title>Email</title></head><body><div style="+div_style+"><div style="+div_style2 +"><table style="+div_style3+"><tbody><tr><td><div style="+div_style4+"><table style="+div_style6+"><tbody><tr><td><div style="+div_style7+"><a> <img src="+image_url+" style="+style+"/></a></div></td><td><p style="+div_style10+"><p></td>"+
            "</tr></tbody></table></div><div style="+div_style11+"><table style ="+div_style12 +" cellspacing="+spacing+" cellpadding="+spacing+"><tbody><tr><td "+
            "colspan="+spacing+">&nbsp;</td></tr><tr><td colspan="+spacing+">&nbsp;</td></tr><tr><td colspan="+spacing+" style="+div_style14+">Hi "+name +",</td></tr><tr><td colspan="+spacing+">Down below are the credentail of your Biomedic account."+
            "!</td></tr><tr><td colspan="+div_style11
            +"><br/><p>Email: "+email+" </p></br><p>Password : "+password+"</td></tr><tr><td colspan="+spacing+">&nbsp;</td></tr><tr><td colspan="+spacing
            +">P.S. This email was intended to reach "+ name +", if you are not "+name +",please ignore this email; we will never again send you an email.</td></tr><tr><td colspan="+spacing
            +">&nbsp;</td></tr><tr><td colspan="+spacing+">Regards</td></tr><tr><td colspan="+spacing
            +">The Biomedic Team</td></tr><tr><td colspan="+spacing+">&nbsp;</td></tr><tr><td colspan="+spacing+">&nbsp;</td></tr></tbody></table></div><div style="+div_style15+"><table style="+div_style6+"><tbody><tr><td><center><small style="+div_style6+">This email was intended for "+name+".<br/>Copyright Biomedic, 2018.</small></center></td></tr></tbody></table></div></td></tr></tbody></table></div></div></body></html>";
             var email = {
                        to: email,
                        from: 'biomedicsteam@gmail.com',
                        subject: "Biomedic | welcome to Biomedic",
                        html: htmlCode,
                    };
                    Email.send(email);
}

function send_forget_password_mail(email){
     console.log('email: ');
     console.log(email);
     var result4 = admin_details.find({admin_email: email}).fetch();
     console.log('result4: ');
     console.log(result4);
     console.log(1);
     if(result4[0]){
      console.log(1.1);
        check_email = result4[0].admin_email;
        check_name = 'admin';
        check_userID = result4[0].admin_id;
     }else{

    var result2 = patient_details.find({"email":email}).fetch();
    console.log(2);
        if(result2[0]){
          console.log(2.2);
          check_email = result2[0].email;
          check_name = result2[0].patient_name;
          check_userID = result2[0].patient_id;
       }else{
    var result3 = doctor_details.find({"email":email}).fetch();
    console.log(3);
        if(result3[0]){
          console.log(3.3);
          check_email = result3[0].email;
          check_name = result3[0].doctor_name;
          check_userID = result3[0].doctor_id;
       }else{
          var message = {"msg": "this eamil doesnt exist in our system.Please re-check"};
          console.log(message);
          return message;
       }
       }
     }
          var userEmail = check_email;
          var check_userID = Base64.encode(check_userID);
          var name = check_name;
          console.log('solanki');
          console.log(userEmail+' & '+name);

var div_style= "width:600px;height:auto;margin:auto;font-family:sans-serif;font-weight:normal;font-size:12px; border:10px solid red";
var div_style2= "width:600px;height:auto;float:left;background-color:#efefef;border:10px solid red !important";
var div_style3= "background-color:#fff;border-spacing:0px;width:100%";
var div_style4= "width:100%;height:50px;float:left;background-color:#fff";
var div_style5= "background-color:#fff;width:100%";
var div_style6= "background-color:#fff;width:100%";
var div_style7= "width:150px;height:auto;float:left;vertical-align: middle;";
var div_style8= "height: 50px";
var div_style9= "height: 50px";
var div_style10= "float: right; margin-right: 15px; color: #666";
var div_style11= "width:96%;height:auto;float:left;padding:10px";
var div_style12= "width:100%; border:0";
var div_style13= "color:#414850;line-height:30px";
var div_style14= "color:#414850;line-height:30px";
var div_style15= "width:100%;float:left;background-color:#fff;;margin-top:6px";
var image_url="https://www.brandcrowd.com/gallery/brands/pictures/picture13752018187407.png";
var style="width:150px; height:150px";
var spacing="2";
var email = "biomedicsteam@gmail.com";
var htmlCode="<html><head><title>Email</title></head><body><div style="+div_style+"><div style="+div_style2 +"><table style="+div_style3+"><tbody><tr><td><div style="+div_style4+"><table style="+div_style6+"><tbody><tr><td><div style="+div_style7+"><a> <img src="+image_url+" style="+style+"/></a></div></td><td><p style="+div_style10+"><p></td>"+
"</tr></tbody></table></div><div style="+div_style11+"><table style ="+div_style12 +" cellspacing="+spacing+" cellpadding="+spacing+"><tbody><tr><td "+
"colspan="+spacing+">&nbsp;</td></tr><tr><td colspan="+spacing+">&nbsp;</td></tr><tr><td colspan="+spacing+" style="+div_style14+">Hi "+name +",</td></tr><tr><td colspan="+spacing+">Your request for Password reset has been processed successfully."+
"</td></tr><tr><td colspan="+div_style11
+"><br/><p>Please click on the link below to reset your password</p>"+
"<a href=http://13.126.214.31/change_forgot_password/"+check_userID +" </a>Reset Password link</td></tr><tr><td colspan="+spacing+">&nbsp;</td></tr><tr><td colspan="+spacing
+">P.S. If you did not sign up for biomedic, just ignore this email; we will never again send you an email.</td></tr><tr><td colspan="+spacing
+">&nbsp;</td></tr><tr><td colspan="+spacing+">Regards</td></tr><tr><td colspan="+spacing
+">The biomedic Team</td></tr><tr><td colspan="+spacing+">&nbsp;</td></tr><tr><td colspan="+spacing+">&nbsp;</td></tr></tbody></table></div><div style="+div_style15+"><table style="+div_style6+"><tbody><tr><td><center><small style="+div_style6+">This email was intended for "+name+".<br/>Copyright biomedic, 2018.</small></center></td></tr></tbody></table></div></td></tr></tbody></table></div></div></body></html>";

          var email = {
                to: userEmail,
                from: 'biomedicsteam@gmail.com',
                subject: "biomedic | Forgot Password",
                html: htmlCode,
            };
            
            Email.send(email);

          var message = {"msg": "We have sent a password reset email to your registered email address."};
          console.log(message);
          return message;

}
