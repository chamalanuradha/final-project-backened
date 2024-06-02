const express =require("express");
var app = express();
const cors = require('cors');
require("dotenv").config();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");




mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);
app.use(cookieParser());
app.use(cors({credentials:true}));
app.use(express.json({limit:'50mb'}))



var port = process.env.PORT || 6000;



var v1 = require('./api/routes');


app.use('/api/v1', v1.router);


app.use(function(req,res){
    res.status(404).send({url:req.originalUrl+" not found"});
});

mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
   
})
    .then(()=>{
        app.listen(port, () => {
            console.log(`API server is started on: ${port}`);
        });
    })
    .catch(error=>{
        console.error(error.message);
    })
