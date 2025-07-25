import UserModel from "../moduls/UserModel";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
interface RegisterParams {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export const register = async ({ firstName, lastName, email, password }: RegisterParams) => {
    const findUser = await UserModel.findOne({ email })
    if (findUser) {
        console.log("kirolos fawzy kamel")
        return { data: "this account already exist", statuscode: 400 }

    }
    const hashedPassword = await bcrypt.hash(password , 10)
    const newUser = new UserModel({ email,password: hashedPassword , firstName, lastName })
    await newUser.save()

    return { data: generateJWT({firstName , lastName ,email}), statuscode: 200 }
    // return { data: generateJWT(findUser), statuscode: 200 }

}

interface LoginParams {
    email: string,
    password: string
}

export const Login = async ({ email, password }: LoginParams) => {
    const findUser = await UserModel.findOne({ email })
    if (!findUser) {
        return { data: "invalid email or password", statuscode: 400 }
    }

    const passwordMatch = await bcrypt.compare(password , findUser.password)
    if (passwordMatch) {
        return {data :generateJWT({firstName : findUser.firstName , lastName: findUser.lastName ,email}) , statuscode:200}
        // return {data : generateJWT(findUser) , statuscode:200}
    }
        return { data: "invalid email or password", statuscode: 400 }
}

const generateJWT = (data:any)=>{
    return jwt.sign(data , '123' )
}