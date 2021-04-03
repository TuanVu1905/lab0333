import { Address } from 'expo-location'

//khởi tạo modol cho từng model

// category model

export interface Category {
    id: string,
    title: string,
    icon : string
}

//food model
export interface FoodModel{
    _id: string,
    name: string,
    description: string,
    category: string,
    price: number,
    readyTime:number,
    images:[string],
    unit: number // state xét giá trị nút Add , unit = 0 thì ADD, unit = 1 thì + , unit = -1 thì -
}

//restaurent model
export interface Restaurent {
    _id: string,
    name: string,
    foodType:string,
    address: string,
    phone: string,
    images:string,
    foods:[FoodModel]
}




// 
export interface FoodAvailability {
    categories:[Category],
    restaurants:[Restaurent],
    foods:[FoodModel]
}


// User model
export interface UserModel {
    email: string,
    token: string,
    vertified : boolean,
    name: string, 
    photoUrl : string
}

// trạng thái người dùng
export interface UserState {
    user: UserModel ,
    location: Address,
    error : string | undefined,
    Cart: [FoodModel],
    cart: FoodModel[],
    userGG: any
}


// trạng thái mua sắm
export interface ShoppingState{
   availability: FoodAvailability,
   availableFoods : [FoodModel]
   
}