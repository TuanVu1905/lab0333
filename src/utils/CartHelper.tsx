import { FoodModel } from "../redux";

const checkExistence  = ( item : FoodModel, Cart : [FoodModel]) => {   // kieerm tra ton tai item hay chua
    if(Array.isArray(Cart)) {
        let currentItem = Cart.filter((cartItem) => cartItem._id === item._id)
        if(currentItem.length > 0) {
            return currentItem[0]
        }
    }
    return item
}

export {checkExistence}