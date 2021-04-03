export const BASE_URL = "http://online-foods.herokuapp.com/"

export const deepCloneArray = (array : any[]) => array.map(m => ({...m}));

export * from './useNavigation'

export * from './CartHelper'
export * from './LoginHelper'