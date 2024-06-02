var mongoose = require("mongoose");
require("dotenv").config();
const UserRole = require("../enums/UserRole");

var schema = mongoose.Schema;

var EventModelSchema = new schema({
    
event_name:{
    type:String,
    required:[true,'Event Name field is required!'],
    
},
email:{
    type:String,
    required:[true,'email field is required'],
    unique:true

},
event_location:{
    type:String,
    required:[true,'location field is required!'],
    
},
starting_date:{
    type:Date,
    required:[true,'starting date field is required']
},
starting_time:{
    type:String,
    required:false
},

ending_date:{
    type:Date,
    required:[true,'ending date field is required']
},
ending_time:{
    type:String,
    required:false
},
event_category:{
    type:String,
    required:[true,'Description field is required']

},
description:{
    type:String,
    required:[true,'Description field is required']

},
addphoto:{
    
    type:[String],
    required:false,
},

role:{
    type:String,
    enum:UserRole,
    default:UserRole.CAMPER
},


create_date:{
    type:Date,
    default:Date.now
}

});




const Event =mongoose.model('Event',EventModelSchema);
module.exports = {Event}