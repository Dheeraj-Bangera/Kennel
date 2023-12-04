const express = require("express");
const cors = require("cors")
// const router = require("./routes/loginSignup")
const dbConnect = require("./database/dbConnect")
const cookieParser = require("cookie-parser")
require("dotenv").config()
const app = express()

const bodyParser = require("body-parser")

app.use(cookieParser())
app.use(bodyParser.json()) 

app.listen(process.env.PORT ||5000,()=>{

 console.log(`server running at ${process.env.PORT ?process.env.PORT :5000}`)
}) 
dbConnect();
//app.use("/v1",router) 