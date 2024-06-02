module.exports = function(app){
    const ContactController = require("../controllers/ContactusController.js");
    
       
        app.post("/contact",ContactController.registerContact);
        app.put("/contact/:id",ContactController.Updatecontact);
        app.delete("/contact/:id",ContactController.Deletecontact);
        app.get("/contact/:id",ContactController.contactID);
        app.get("/contacts",ContactController.contacts);
        
    
    }