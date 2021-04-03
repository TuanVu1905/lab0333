import axios from 'axios'
import { Dispatch } from 'react'
import { BASE_URL } from '../../utils'
import { Address } from 'expo-location'
import AsnycStorage from '@react-native-async-storage/async-storage'
import { FoodModel, UserModel } from '../models'



//action trả về vị trí hiện tại người dùng
export interface UpdateLocationAction {
    readonly type: 'ON_UPDATE_LOCATION',
    payload: Address
}

//action trả về lỗi 
export interface UserErrorAction {
    readonly type: 'ON_USER_ERROR',
    payload: any
}

// action update cart
export interface UpdateCartAction {
    readonly type: 'ON_UPDATE_CART',
    payload: FoodModel
}

// action update cart
export interface AddPRoductAction {
    readonly type: 'ADD_PRODUCT',
    payload: FoodModel
}

export interface RemovePRoductAction {
    readonly type: 'REMOVE_PRODUCT',
    payload: FoodModel
}

export interface UserLoginAction {
    readonly type: 'ON_USER_LOGIN'
    payload: UserModel
}


export interface UserLoginActionGooGle {
    readonly type: 'ON_USER_LOGIN_GG'
    payload: UserModel
}

export type UserAction = UpdateLocationAction | UserErrorAction | UpdateCartAction | AddPRoductAction | RemovePRoductAction | UserLoginAction | UserLoginActionGooGle

// user action trigger from component
export const onUpdateLocation = (location: Address) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {

            const locationString = JSON.stringify(location)

            // lưu vị trí vào asnyc storage
            dispatch({
                type: 'ON_UPDATE_LOCATION',
                payload: location
            })

        } catch (error) {
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }
    }
}


export const onUpdateCart = (item: FoodModel) => {
    return async (dispatch: Dispatch<UserAction>) => {
        dispatch({
            type: 'ON_UPDATE_CART',
            payload: item
        })
    }
}


export const addProduct = (product: FoodModel) => {
    //console.log('helloooo',product.unit)
    const quantity = product.unit || 0
    product.unit = quantity + 1;
    console.log('check ở reducer',quantity)
    return (dispatch: Dispatch<UserAction>) => {
        dispatch({
            type: 'ADD_PRODUCT',
            payload: product
        })
    }
}

export const removeProduct = (product: FoodModel) => {
    const quantity1 = product.unit || 0;
    product.unit = quantity1 - 1;

    return (dispatch: Dispatch<UserAction>) => {
        dispatch({
            type: 'REMOVE_PRODUCT',
            payload: product
        })
    }
}




export const onUserLogin = (email: string, password: string) => {


    return async (dispatch: Dispatch<UserAction>) => {
        try {

            // fetch data từ API
            const response = await axios.post<UserModel>(`${BASE_URL}user/login` ,{
                email,
                password
            }) 

            if(!response) // nếu dữ liệu ko có 
            {
                dispatch({
                    type: 'ON_USER_ERROR',   // trả về loại : ...
                    payload: 'User Login error' // trả về hành động : ....
                })
            }else // nếu có dữ liệu
            {
                dispatch({                          
                    type:'ON_USER_LOGIN',  // trả về loại : ...
                    payload: response.data   // trả về hành động : lấy data
                })
            }            
        } catch (error) {
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }
    }
}

export const onUserSignUp = (email: string, phone: string ,password: string) => {


    return async (dispatch: Dispatch<UserAction>) => {
        try {

            // fetch data từ API
            const response = await axios.post<UserModel>(`${BASE_URL}user/create-account` ,{
                email,
                password,
                phone
            }) 

            if(!response) // nếu dữ liệu ko có 
            {
                dispatch({
                    type: 'ON_USER_ERROR',   // trả về loại : ...
                    payload: 'Availability error' // trả về hành động : ....
                })
            }else // nếu có dữ liệu
            {
                dispatch({                          
                    type:'ON_USER_LOGIN',  // trả về loại : ...
                    payload: response.data   // trả về hành động : lấy data
                })
            }            
        } catch (error) {
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }
    }
}



export const onVerify = (otp : string,user : UserModel) => {


    return async (dispatch: Dispatch<UserAction>) => {
        try {

            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`  // lấy mã token tương ứng với mỗi user

            // fetch data từ API
            const response = await axios.patch<UserModel>(`${BASE_URL}user/verify` ,{
                otp
            }) // nhận giá trị trả về là mã otp

            if(!response) // nếu dữ liệu ko có 
            {
                dispatch({
                    type: 'ON_USER_ERROR',   // trả về loại : ...
                    payload: 'User Verification error' // trả về hành động : ....
                })
            }else // nếu có dữ liệu
            {
                dispatch({                          
                    type:'ON_USER_LOGIN',  // trả về loại : ...
                    payload: response.data   // trả về hành động : lấy data
                })
            }            
        } catch (error) {
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }
    }
}

export const onOTPRequest = (user : UserModel) => {


    return async (dispatch: Dispatch<UserAction>) => {
        try {

            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`  // lấy mã token tương ứng với mỗi user

            // fetch data từ API
            const response = await axios.patch<UserModel>(`${BASE_URL}user/otp`) // nhận giá trị trả về là mã otp

            if(!response) // nếu dữ liệu ko có 
            {
                dispatch({
                    type: 'ON_USER_ERROR',   // trả về loại : ...
                    payload: 'User Verification error' // trả về hành động : ....
                })
            }else // nếu có dữ liệu
            {
                dispatch({                          
                    type:'ON_USER_LOGIN',  // trả về loại : ...
                    payload: response.data   // trả về hành động : lấy data
                })
            }            
        } catch (error) {
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }
    }
}



export const onUserLoginGG = (user : UserModel) => {
    console.log('Người dungff', user)
    return async (dispatch: Dispatch<UserAction>) => {
        dispatch({
            type: 'ON_USER_LOGIN_GG',
            payload: user
        })
    }
}