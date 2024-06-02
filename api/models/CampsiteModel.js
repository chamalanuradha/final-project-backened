var mongoose = require("mongoose");
var bcrypt = require('bcrypt');
require("dotenv").config();
const jwt = require('jsonwebtoken');
const UserRole = require("../enums/UserRole");

const SALT = 10;

const Schema = mongoose.Schema;

const CampsiteSchema = new Schema({
      campsite_name:{
        type: String,
        required: true
      },
      location_address:{
        type: String,
        required: true
      },
      nearest_city:{
        type: String,
        required: true
      },
      business_registration_number:{
        type: String,
        required: true,
        unique: true
      },
      description:{
        type: String,
        required: true
      },
      phone_number:{
        type: String,
        required: true
      },
      password:{
        type: String,
        required: true
      },
      photos_of_location:{
        type: [String],
        required: false
      },
      photos_of_legal_docs:{
        type: [String],
        required: false
      },
      featured:{
        type: Boolean,
        default: false
      },

      role:{
        type:String,
        enum:UserRole,
        default:UserRole.CAMPSITE
    },


    });


//saving campsite data

    CampsiteSchema.pre('save',function(next){
      var campsite = this;
      if(campsite.isModified('password')){
          //checking if password field is available and modified
          bcrypt.genSalt(SALT,function(err,salt){
              if(err) return next(err)
  
              bcrypt.hash(campsite.password,salt,function(err,hash){
                  if (err) return next(err)
                  campsite.password = hash;
                  next();
              });
          });
      }else{
          next();
      }
  });



  CampsiteSchema.statics.login = async function(business_registration_number,password){
    const campsite = await this.findOne({ business_registration_number });
    if (campsite) {
      const auth = await bcrypt.compare(password, campsite.password);
      if (auth) {
        return campsite;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect business registration number');
  }



//For generating token when loggedin
CampsiteSchema.methods.generateToken = function(callBack){
  var campsite = this;
  var token = jwt.sign(campsite._id.toHexString(),process.env.SECRETE,);
  
  callBack(null,token);
};



//validating token for auth routes middleware
CampsiteSchema.statics.findByToken = function(token,callBack){
  jwt.verify(token, process.env.SECRETE,function(err,decode){
      //this decode must give user_id if token is valid .ie decode = user_id
      Campsite.findById(decode,function(err,campsite){
          if(err){
              
              return res.status(404).json({
                  sucess:false,
                  message:"Invalid Campsite ID!",
                  data:err
                
              });
          }

          callBack(null,campsite);
      });
  });
};


    
    const Campsite =mongoose.model('Campsite',CampsiteSchema);
    module.exports = {Campsite}