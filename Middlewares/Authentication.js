const jwt = require('jsonwebtoken');

//Middleware for Authentication
const Authentication = async(req, res, next)=>{
    const userToken = req.headers.token.split(" ")[1];
    if(!userToken){
        return res.send("Login First");
    }
    else{

        await jwt.verify(userToken, 'shhhhh', (err, decoded)=>{
            if(err){
                return res.send("You are not authorized");
            }
            else{
                req.body.userId = decoded.userId;
                next();
            }
        })
    }
}
module.exports = Authentication;