import express, { Response  , Request} from "express"
import { gitActiveCarteForUser } from "../services/CartService"
import validateJWT from "../middlewares/validateJWT"
interface ExtendRequest extends Request{
    user?:any;
}
const router = express.Router()

router.get("/",validateJWT, async (req : ExtendRequest , res) =>{
    const userId = req.user._id
    //to do : get the userID from JWT , afete validating from middel ware 
    const cart = await gitActiveCarteForUser({userId})
    res.status(200).send(cart)
})

export default router