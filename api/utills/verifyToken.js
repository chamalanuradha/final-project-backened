const jwt = require('jsonwebtoken');
const createError = require( "../utills/error.js");



exports.verifyToken = async(req, _res, next)=> {
    const token = await req.header("Authorization");
    if (!token) {
        return  _res.status(400).json({
            sucess: false,
              message: "you are not authenticated"})}

    jwt.verify(token,process.env.SECRETE, async (err, user) => {
        if (err)
            return next(createError(403, "Token is not valid!"));
        req.user = user;
        next();
    });
}

exports.verifyToken2 = async(req, _res, next)=> {
    const token = await req.header("Authorization");
    if (!token) {
        return  _res.status(400).json({
            sucess: false,
              message: "you are not authenticated"})}

    jwt.verify(token,process.env.SECRETE, async (err, campsite) => {
        if (err)
            return next(createError(403, "Token is not valid!"));
        req.campsite = campsite;
        next();
    });
}
