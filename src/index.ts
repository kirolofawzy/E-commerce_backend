import express from "express"
import mongoose from "mongoose"
import router from "./routes/UserRoutes"
// import { server } from "typescript"


const app = express()

const port = 5000

//midelware
app.use(express.json())

//database connection
mongoose
    .connect("mongodb://localhost:27017/ecomerce")
    .then(() => { console.log("connected successfully") })
    .catch((err)=> {console.log("failed to connect! ",err)})

app.use('/user',router)
app.listen( port, ()=>{console.log("server is running at http://localhost:"+port)})