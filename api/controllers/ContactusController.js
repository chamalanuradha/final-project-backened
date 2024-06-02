const { Contactus } = require("../models/ContactusModel");

exports.registerContact =  (req,res) => {
    const contactcreate = new Contactus(req.body)



    contactcreate.save((err,doc) =>{
        if(err){
            return res.status(422).json({
                sucess:false,
                message:"Registration faild,check the validation errors",
                data:err
            
            });
        }else{
            return res.status(200).json({
            success:true,
            message:"Successfully Registered"
            
            });
            
        }
    });
}

//UPDATE
exports.Updatecontact = async (req,res) => {

    try {
        const updatedcontact = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true});
        return res.status(200).json(updatedcontact);
    } catch (error) {
        res.status(500).json(error);
    }
}

//DELETE

exports.Deletecontact = async (req,res) => {

    try {
        await Contactus.findByIdAndDelete(req.params.id)
        return res.status(200).json("Contact Deleted")
    } catch (error) {
        res.status(500).json(error)
    }
}

//GET
exports.contactID = async (req,res) => {


  try {
      const contact = await User.findById(req.params.id)
      return res.status(200).json(contact)
  } catch (error) {
      res.status(500).json(error)
  }
}

//GET ALL

exports.contacts = async (req,res) => {


    try {
        const contacts = await Contactus.find()
        return res.status(200).json(contacts)
    } catch (error) {
        res.status(500).json(error)
    }
}
