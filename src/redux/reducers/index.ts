import { combineReducers } from 'redux'
import { UserReducer } from './userReducer'
import { ShoppingReducer } from './shoppingReducer'


const rootReducer = combineReducers({
    userReducer : UserReducer,
    shoppingReducer : ShoppingReducer
})

export type ApplicationState = ReturnType<typeof rootReducer>

export {rootReducer}