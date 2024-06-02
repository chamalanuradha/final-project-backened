module.exports = function(app){
   
 
    const PackageController = require("../controllers/PackageController");
    
    
        //create
        app.post("/package",PackageController.registerPackage);
    
        //update
        app.put("/package/:id",PackageController.PackageUpdated);
        
        //delete
        app.delete("/package/:id",PackageController.PackageDeleted);
        
        //get event
        app.get("/package/find/:id",PackageController.PackageID);
        
        //get all events
        app.get("/packages",PackageController.Packages);

}