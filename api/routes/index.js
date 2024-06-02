var express = require('express');

var router = express.Router();

router.get('/',function(req,res){
    res.send('welcome to API');
});


require('./AuthRoutes')(router);
require('./EventRoutes')(router);
require('./CampsitesRoutes')(router);
require('./UserRoutes')(router);
require('./ContactusRoutes')(router);
require('./PackageRoutes')(router)




module.exports.router = router;

