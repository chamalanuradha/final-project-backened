const {Event}= require("../models/EventModel")

//CREATE

exports.registerEvent =  (req,res) => {
    const eventcreate = new Event(req.body)


    eventcreate.save((err,doc) =>{
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
exports.EventUpdated = async (req,res) => {

    try {
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true});
        return res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(500).json(error);
    }
}

//DELETE

exports.EventDeleted = async (req,res) => {

    try {
        await Event.findByIdAndDelete(req.params.id)
        return res.status(200).json("Camspsite Deleted")
    } catch (error) {
        res.status(500).json(error)
    }
}

//GET
exports.EventID = async (req,res) => {


  try {
      const event = await Event.findById(req.params.id)
      return res.status(200).json(event)
  } catch (error) {
      res.status(500).json(error)
  }
}

//GET ALL

exports.Events = async (req,res) => {


    try {
        const events = await Event.find()
        return res.status(200).json(events)
    } catch (error) {
        res.status(500).json(error)
    }
}

//get all countby category

exports.countByCategory = async (req,res,next) => {
    const category = req.query.category.split(",");

    try {
        const listevent = await Promise.all(
            category.map((event_category) =>{
                return Event.countDocuments({event_category:event_category});
            })
        );
        res.status(200).json(listevent)
    } catch (err) {
        next(err);
    }
}



//get events by category
//beach
          
exports.beachCategory = async (req,res) => {


    try {
        const eventbeach = await Event.find({event_category:"Beach"})
        return res.status(200).json(eventbeach)
    } catch (error) {
        res.status(500).json(error)
    }
} 

//adventure
exports.adventureCategory = async (req,res) => {


    try {
        const eventadventure = await Event.find({event_category:"Adventure"})
        return res.status(200).json(eventadventure)
    } catch (error) {
        res.status(500).json(error)
    }
} 

//jungle
exports.jungleCategory = async (req,res) => {


    try {
        const eventjungle = await Event.find({event_category:"Jungle"})
        return res.status(200).json(eventjungle)
    } catch (error) {
        res.status(500).json(error)
    }
} 

//luxury
exports.luxuryCategory = async (req,res) => {


    try {
        const eventluxury = await Event.find({event_category:"Luxury"})
        return res.status(200).json(eventluxury)
    } catch (error) {
        res.status(500).json(error)
    }
} 

//river
exports.riverCategory = async (req,res) => {


    try {
        const eventriver= await Event.find({event_category:"River"})
        return res.status(200).json(eventriver)
    } catch (error) {
        res.status(500).json(error)
    }
} 

//birdwatching
exports.birdwatchingCategory = async (req,res) => {


    try {
        const eventbirdwatching = await Event.find({event_category:"Birdwatching"})
        return res.status(200).json(eventbirdwatching)
    } catch (error) {
        res.status(500).json(error)
    }
} 

     
 