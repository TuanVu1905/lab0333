import { UserAction } from '../actions/userActions'
import { UserModel, UserState, FoodModel } from '../models'
import { Address } from 'expo-location'
import { deepCloneArray } from '../../utils'

const initialState: UserState = {
    user: {} as UserModel,
    location: {} as Address,
    error: undefined,
    Cart: {} as [FoodModel],
    cart: [],
    userGG: {},
}

const UserReducer = (state: UserState = initialState, action: UserAction) => {
    switch (action.type) {
        case "ON_UPDATE_LOCATION":
            return {
                ...state,
                location: action.payload
            }
        // case 'ON_UPDATE_CART' :

        //     if(!Array.isArray(state.Cart))
        //     return {
        //         ...state,
        //         Cart: [action.payload]
        //     }

        //     const isExistingFood = state.Cart.filter(item => item._id === action.payload._id)

        //     if(isExistingFood.length > 0) {

        //         let updateCart = state.Cart.map(food => {
        //             if(food._id === action.payload._id){
        //                 food.unit === action.payload.unit
        //             }
        //             return food
        //         })
        //         console.log('Cart updateeeee',updateCart)
        //         return {
        //             ...state,
        //             Cart: [...updateCart, ]
        //         }

        //     }else {
        //         return {
        //             ...state,
        //             Cart: [...state.Cart,action.payload]
        //         }
        //     }

        case 'ADD_PRODUCT':
            const product = action.payload;  // product được chọn

            let cloneCart: any = deepCloneArray(state.cart);

            // Check product co ton tai khong

            const existedFood = cloneCart.find((c: any) => c._id === product._id);

            if (!existedFood) {
                cloneCart = [...cloneCart, product];
            }

            // console.log('after updating card ... ', cloneCart)

            return {
                ...state,
                cart: cloneCart
            }


             case 'REMOVE_PRODUCT':
            const productRemove = action.payload;

            let FakeCart: FoodModel [] = deepCloneArray(state.cart);
            // Check product co ton tai khong
            const checkExistedFood : FoodModel | any = FakeCart.find((c: any) => c._id === productRemove._id);
            
            if (checkExistedFood) {
                if(checkExistedFood.unit === 0) {
                    FakeCart = FakeCart.filter(x => x._id !== productRemove._id)
                }
            }

            return {
                ...state,
                cart: FakeCart
            }

            case 'ON_USER_LOGIN_GG':
               
            return {
                ...state,
                 userGG : action.payload
            }

        default: return state
    }

}
export { UserReducer }