import mongoose ,{Schema, ObjectId , Document} from "mongoose";
import { IProduct } from "./ProductModel";

const CartStatusEnum = ["active" , "completed"]

export interface ICartItem extends Document{
    product : IProduct,
    unitPrice : number,
    quantity : number
}
export interface ICart extends Document{
    userId : ObjectId | string,
    items : ICartItem,
    totalAmount : number,
    status : "active" | "completed"
}

const CartItemSchema = new Schema<ICartItem>({
    product : {type : Schema.Types.ObjectId , ref:"Product" , required:true},
    quantity : {type : Number , required : true , default: 1},
    unitPrice : {type : Number , required : true}
})

const CartSchema = new Schema<ICart>({
    //this may be give error because the name of collection data base (user) but the model name in the UserModel.ts is (User) u/U upercase
    userId : {type : Schema.Types.ObjectId , ref:"User"},
    items : [CartItemSchema],
    totalAmount : {type : Number , required : true},
    status : {type : String , enum : CartStatusEnum , default : "active" }
})
export const CartModel = mongoose.model<ICart>("Cart",CartSchema)