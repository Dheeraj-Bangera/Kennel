const express = require("express");
const cors = require("cors")
const userRouter = require("./routes/userRoutes")
const postRouter = require("./routes/postRoutes")
const dbConnect = require("./config/dbConnect")
const cookieParser = require("cookie-parser")
const fileupload= require("express-fileupload")
const cloudinaryConnect = require("./config/cloudinary")
require("dotenv").config()
const cors = require("cors")
const app = express()
app.use(cors({
    origin: 'http://localhost:3000/',
    credentials: true,
  }));
const bodyParser = require("body-parser")

app.use(cookieParser())
app.use(bodyParser.json()) 
app.use(fileupload({  useTempFiles : true, tempFileDir : '/tmp/'}))

app.listen(process.env.PORT ||5000,()=>{

 console.log(`server running at ${process.env.PORT ?process.env.PORT :5000}`)
}) 
dbConnect();
cloudinaryConnect();
app.use("/user",userRouter) 
app.use("/posts",postRouter) 



