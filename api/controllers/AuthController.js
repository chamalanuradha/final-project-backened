const {User} = require("../models/UserModel");
const { Campsite } = require("../models/CampsiteModel")
const jwt = require('jsonwebtoken');

//User Registration
exports.registerUser = async(req,res) => {
        try {
            const user = await User.create(req.body)
            const token = jwt.sign({user},process.env.SECRETE,{expiresIn:'1h'})
            res.status(200).json({
                success:true,
                meassage:"succcessfully registerd!",
                data:{
                    "token":token
                }
            })

        } catch (error) {
            res.status(400).json({error:error.message})
        }


} 

//User login

exports.loginUser = async(req,res) => {

    try {
        const {email,password} = req.body
        const user = await User.login(email,password)
        const token = jwt.sign({user},process.env.SECRETE,{expiresIn:'1h'})
        res.status(200).json({
            success:true,
            meassage:"succcessfully Logged in!",
            data:{
                "token":token
            }
        })
    } catch (error) {
        res.status(400).json({error:error.message})
    }


} 



//Campsite Registration
exports.registerCampsite = async (req,res) => {


    try {
        let user = await Campsite.create(req.body)
        
      
        user.photos_of_location = null
        user.photos_of_legal_docs = null

        const token = jwt.sign({user},process.env.SECRETE,{expiresIn:'1h'})
        res.status(200).json({
            success:true,
            meassage:"succcessfully registerd!",
            data:{
                "token":token
            }
        })
    } catch (error) {
        res.status(400).json({error:error.message})
    }


} 

//Campsite login

exports.loginCampsite = async(req,res) => {

    try {
        const {business_registration_number,password} = req.body
        const user = await Campsite.login(business_registration_number,password)

   
        user.photos_of_location = null
        user.photos_of_legal_docs = null
    
        const token = jwt.sign({user},process.env.SECRETE,{expiresIn:'1h'})
        res.status(200).json({
            success:true,
            meassage:"succcessfully Logged in!",
            data:{
                "token":token
            }
        })
    } catch (error) {
        res.status(400).json({error:error.message})
    }

} 

