const User = require("../models/user")
const jwt =  require("jsonwebtoken")
require("dotenv").config
const auth = async(req,res,next)=>{
    try{
        const cookie = req.cookies.token
        if(!cookie){
          res.status(401).json({"auth_message":"unauthorized"})
        }
        else {
            const verify = jwt.verify(cookie,process.env.JWT_SECRET_KEY)
            if(!verify){ 
                return res.json({"auth_message":"unauthorized"}).status(401)
            }
            req.body.userData = verify
            console.log(req.body.userData)
            next()

        }
    }
    catch(err){
        console.log("error",err)
    }
}
module.exports = auth