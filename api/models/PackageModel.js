var mongoose = require("mongoose");
require("dotenv").config();
const UserRole = require("../enums/UserRole");

var schema = mongoose.Schema;

var PackageModelSchema = new schema({

    campsiteid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CAMPSITE',
        required: [true, 'Campsiteidfield is required!'],
        unique:true
      },
    
onlycampsite:{
    type:String,
    required:false,
    
},
tent:{
    type:String,
    required:false,
    

},
gril:{
    type:String,
    required:false
    
},
light:{
    type:String,
    required:false
},
price:{
    type:String,
    required:false
},



role:{
    type:String,
    enum:UserRole,
    default:UserRole.CAMPSITE
   
},


create_date:{
    type:Date,
    default:Date.now
}

});




const Package =mongoose.model('Package',PackageModelSchema);
module.exports = {Package}