const {Campsite} = require('../models/CampsiteModel.js')



//UPDATE
exports.updateCampsite = async (req,res,next)=>{

    try {
        const updatedCampsite = await Campsite.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
        return res.status(200).json(updatedCampsite)
    } catch (err) {
        next(err)
    }
}

//DELETE
exports.deleteCampsite = async (req,res,next)=>{

    try {
        await Campsite.findByIdAndDelete(req.params.id)
        return res.status(200).json("Camspsite Deleted")
    } catch (err) {
        next(err)
    }
}

exports.getCampsite = async (req,res) => {


  try {
      const campsite = await Campsite.findById(req.params.id)
      return res.status(200).json(campsite)
  } catch (error) {
      res.status(500).json(error)
  }
}


//GET ALL by 

exports.getCampsites = async (req,res,next)=>{

    try {
        const campsites = await Campsite.find(req.query).limit(4)
        return res.status(200).json(campsites)
    } catch (err) {
        next(err)
    }
}


//GET ALL CAMPSITES

exports.getallcampsites = async (req,res) => {


    try {
        const campsites1 = await Campsite.find()
        return res.status(200).json(campsites1)
    } catch (error) {
        res.status(500).json(error)
    }
}

