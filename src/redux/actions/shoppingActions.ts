import axios from 'axios'
import {Dispatch} from 'react'
import {BASE_URL} from '../../utils'
import { Address } from 'expo-location'
import { FoodAvailability, FoodModel } from '../models'

//availability 
export interface AvailabilityAction{
    readonly type: 'ON_SHOPPING_AVAILABILITY',
    payload: FoodAvailability
}

export interface FoodSearchAction {
    readonly type: 'ON_FOOD_SEARCH',
    payload:[FoodModel]
}

export interface ShoppingErrorAction{
    readonly type: 'ON_SHOPPING_ERROR',
    payload: any
}

export type ShoppingAction = AvailabilityAction | ShoppingErrorAction | FoodSearchAction


export const onAvailability = (postCode: string) => {


    return async (dispatch: Dispatch<ShoppingAction>) => {
        try {

            // fetch data từ API
            const response = await axios.get<FoodAvailability>(`${BASE_URL}food/availability/123456`)
            
            if(!response) {
                dispatch({
                    type: 'ON_SHOPPING_ERROR',
                    payload: 'Availability error'
                })
            }else {
                dispatch({
                    type:'ON_SHOPPING_AVAILABILITY',
                    payload: response.data
                })
            }            
        } catch (error) {
            dispatch({
                type: 'ON_SHOPPING_ERROR',
                payload: error
            })
        }
    }
}

export const onSearchFoods = (postCode: string) => {


    return async (dispatch: Dispatch<ShoppingAction>) => {
        try {

            // fetch data từ API
            const response = await axios.get<[FoodModel]>(`${BASE_URL}food/search/123456`) 
            
            // console.log('lấy dữ liệu', response.data) đã có data

            if(!response) // nếu dữ liệu ko có 
            {
                dispatch({
                    type: 'ON_SHOPPING_ERROR',   // trả về loại : ...
                    payload: 'Availability error' // trả về hành động : ....
                })
            }else // nếu có dữ liệu
            {
                dispatch({                          
                    type:'ON_FOOD_SEARCH',  // trả về loại : ...
                    payload: response.data   // trả về hành động : lấy data
                })
            }            
        } catch (error) {
            dispatch({
                type: 'ON_SHOPPING_ERROR',
                payload: error
            })
        }
    }
}
