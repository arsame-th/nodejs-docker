const express = require("express")
const mongoose = require("mongoose");
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require("./config/config");
const app = express();
const postRourter = require("./routes/postRoutes")
const userRourter = require("./routes/userRoutes")
const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`

const connectWithRetry = () => {
   mongoose.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>console.log("succesfully connected to database"))
    .catch((e)=>{
        console.log(e)
        setTimeout(connectWithRetry, 5000)
    })  
}
connectWithRetry()

app.use(express.json());

 //localhost:3000/api/v1/post/
app.get("/", (req,res) => {
    res.send("<h2>Hi There ??</h2>")
})

app.use("/api/v1/posts"  , postRourter)
app.use("/api/v1/users"  , userRourter)

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log("listening on port " + port))