const {User} = require("../models/UserModel");

//UPDATE
exports.UpdateUser = async (req,res) => {

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true});
        return res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json(error);
    }
}

//DELETE

exports.DeleteUser = async (req,res) => {

    try {
        await User.findByIdAndDelete(req.params.id)
        return res.status(200).json("Camspsite Deleted")
    } catch (error) {
        res.status(500).json(error)
    }
}

//GET
exports.UserID = async (req,res) => {


  try {
      const user = await User.findById(req.params.id)
      return res.status(200).json(user)
  } catch (error) {
      res.status(500).json(error)
  }
}

//GET ALL

exports.Users = async (req,res) => {


    try {
        const users = await User.find()
        return res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
}
