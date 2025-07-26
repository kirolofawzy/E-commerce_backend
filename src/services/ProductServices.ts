import ProductModel from "../moduls/ProductModel";

export const getAllProduct = async () => {
    return await ProductModel.find();
}

export const seedInitialProducts = async () => {
    const products = [
        {
            "title": "Wireless Headphones",
            "image": "https://example.com/images/headphones.jpg",
            "price": 99.99,
            "stock": 25
        }
    ]

    const existingProducts = await ProductModel.find();
    if(existingProducts.length === 0){
        await ProductModel.insertMany(products)
    }



}
