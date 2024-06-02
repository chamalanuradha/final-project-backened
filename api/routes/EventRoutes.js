
module.exports = function(app){
   
 
const EventController = require("../controllers/EventController");


    //create
    app.post("/event",EventController.registerEvent);

    //update
    app.put("/event/:id",EventController.EventUpdated);
    
    //delete
    app.delete("/event/:id",EventController.EventDeleted);
    
    //get event
    app.get("/event/find/:id",EventController.EventID);
    
    //get all events
    app.get("/events",EventController.Events);
    
    // get all events countbycategory
    app.get("/events/countByCategory", EventController.countByCategory);

    //get events by category 

    app.get("/events/eventbybeach",EventController.beachCategory);
    app.get("/events/eventbyadventure",EventController.adventureCategory);
    app.get("/events/eventbyjungle",EventController.jungleCategory);
    app.get("/events/eventbyluxury",EventController.luxuryCategory);
    app.get("/events/eventbyriver",EventController.riverCategory);
    app.get("/events/eventbybirdwatching",EventController.birdwatchingCategory);

    


}