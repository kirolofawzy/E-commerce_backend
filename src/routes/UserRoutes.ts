import express from "express"
import { register , Login } from "../services/UserServices"
const router = express.Router()

router.post('/register',async(req , res) =>{
    const {firstName , lastName ,email,password} = req.body
    const result = await register({firstName , lastName , email,password})
    res.status(result.statuscode).send(result.data)
})

router.post('/login',async (req,res) =>{
    const {email , password}= req.body
    const {data , statuscode} = await Login({email , password})
    res.status(statuscode).send(data)
})
export default router