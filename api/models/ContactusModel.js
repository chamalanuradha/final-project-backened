var mongoose = require("mongoose");
require("dotenv").config();
const UserRole = require("../enums/UserRole");

var schema = mongoose.Schema;

var ContactusModelSchema = new schema({
    
contact_name:{
    type:String,
    required:[true,'Name field is required!'],
    
},
contact_email:{
    type:String,
    required:[true,'email field is required'],
    unique:true

},
subject:{
    type:String,
    required:[true,'subject field is required!'],
    
},
suggesion:{
    type:String,
    required:[true,'suggesion  field is required']
},
message:{
    type:String,
    required:false
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




const Contactus =mongoose.model('Contactus',ContactusModelSchema);
module.exports = {Contactus}