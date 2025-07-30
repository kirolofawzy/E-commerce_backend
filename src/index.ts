import express from "express"
import mongoose from "mongoose"
import userRouter from "./routes/UserRoutes"
import productRouter from "./routes/ProductRoutes"
import CartRouter from "./routes/CartRoutes"
// import { server } from "typescript"
import {seedInitialProducts} from "./services/ProductServices"


const app = express()

const port = 5000

//midelware
app.use(express.json())

//database connection
mongoose
    .connect("mongodb://localhost:27017/ecomerce")
    .then(() => { console.log("connected successfully") })
    .catch((err)=> {console.log("failed to connect! ",err)})
seedInitialProducts()

app.use('/cart',CartRouter)
app.use('/user',userRouter)
app.use('/product',productRouter)
app.listen( port, ()=>{console.log("server is running at http://localhost:"+port)})