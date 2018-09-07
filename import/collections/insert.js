
import { Mongo } from 'meteor/mongo';
 
export const doctor_details = new Mongo.Collection('doctor_details');                                              
export const patient_details = new Mongo.Collection('patient_details');                                              
export const admin_details = new Mongo.Collection('admin_details');       

export const Privacy = new Mongo.Collection('privacy');                                         
export const report = new Mongo.Collection('report');                                         
export const studies = new Mongo.Collection('studies');                                          
export const modality = new Mongo.Collection('modality');                                          
                                        
                                 

