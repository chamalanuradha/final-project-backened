var mongoose = require("mongoose");
var bcrypt = require('bcrypt');
require("dotenv").config();
const jwt = require('jsonwebtoken');
const UserRole = require("../enums/UserRole");

const SALT = 10;


var schema = mongoose.Schema;

var UserSchema = new schema({
name:{
    type:String,
    required:[true,'First Name field is required!'],
    maxlength:100
},

username:{
    type:String,
    required:[true,'First Name field is required!'],
    maxlength:100,
    unique:true
},

email:{
    type:String,
    required:[true,'Email field is required!'],
    unique:true
},

password:{
    type:String,
    minlength:5,
    required:[true,'Password field is required!'],
    
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

//saving user data

UserSchema.pre('save',function(next){
    var user = this;
    if(user.isModified('password')){
        //checking if password field is available and modified
        bcrypt.genSalt(SALT,function(err,salt){
            if(err) return next(err)

            bcrypt.hash(user.password,salt,function(err,hash){
                if (err) return next(err)
                user.password = hash;
                next();
            });
        });
    }else{
        next();
    }
});

UserSchema.statics.login = async function(email,password){
    const user = await this.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect email');
  }

//For comparing the users entered password with database during login
UserSchema.methods.comparePassword = function (candidatePassword,callBack){
    bcrypt.compare(candidatePassword,this.password,function(err,isMatch){
        if(err) return callBack(err);
        callBack(null,isMatch);
    }); 

    };


//For generating token when loggedin
UserSchema.methods.generateToken = function(callBack){
    var user =this;
    var token = jwt.sign(user._id.toHexString(),process.env.SECRETE);
    
    callBack(null,token);
};

//validating token for auth routes middleware
UserSchema.statics.findByToken = function(token,callBack){
    jwt.verify(token, process.env.SECRETE,function(err,decode){
        //this decode must give user_id if token is valid .ie decode = user_id
        User.findById(decode,function(err,user){
            if(err){
                
                return res.status(404).json({
                    sucess:false,
                    message:"Invalid User ID!",
                    data:err
                  
                });
            }

            callBack(null,user);
        });
    });
};

const User =mongoose.model('User',UserSchema);
module.exports = {User}
