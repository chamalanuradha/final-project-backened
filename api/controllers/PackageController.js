const {Package}= require("../models/PackageModel.js")

//CREATE

exports.registerPackage =  (req,res) => {
    const packagecreate = new Package(req.body)

    packagecreate.save((err,doc) =>{
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
exports.PackageUpdated = async (req,res) => {

    try {
        const updatedpackage = await Package.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true});
        return res.status(200).json(updatedpackage);
    } catch (error) {
        res.status(500).json(error);
    }
}

//DELETE

exports.PackageDeleted = async (req,res) => {

    try {
        await Package.findByIdAndDelete(req.params.id)
        return res.status(200).json("Camspsite Deleted")
    } catch (error) {
        res.status(500).json(error)
    }
}

//GET
exports.PackageID = async (req,res) => {


  try {
      const package = await Package.findById(req.params.id)
      return res.status(200).json(package)
  } catch (error) {
      res.status(500).json(error)
  }
}

//GET ALL

exports.Packages = async (req,res) => {


    try {
        const packages = await Package.find()
        return res.status(200).json(packages)
    } catch (error) {
        res.status(500).json(error)
    }
}
