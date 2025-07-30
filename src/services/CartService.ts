import { CartModel } from "../moduls/CartModel"

interface CreateCartForUser{
    userId: string
}

const createCartForUser = async ({userId}:CreateCartForUser)=>{
    const cart = await CartModel.create({userId ,totalAmount : 0})
    await cart.save()
    return cart
}

interface GetActiveCarteForUser{
    userId : string
}
export const gitActiveCarteForUser = async ({userId}:GetActiveCarteForUser)=>{
    let cart = await CartModel.findOne({userId , status:"active"})

    if(!cart){
        cart = await createCartForUser({userId})
    }
    return cart
}