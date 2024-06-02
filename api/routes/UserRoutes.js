const { verifyToken } = require("../utills/verifyToken");

module.exports = function(app){
const CamperController = require("../controllers/UserController");

    app.get("/checkauthentication",verifyToken,(_req,res)=>{
        res.send("Hello user,you are loggedin ")
    });

    app.put("/user/:id",CamperController.UpdateUser);
    app.delete("/user/:id",CamperController.DeleteUser);
    app.get("/user/:id",CamperController.UserID);
    app.get("/users",CamperController.Users);
    

}