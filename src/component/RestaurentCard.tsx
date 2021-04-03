import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions,ActivityIndicator, ImageSourcePropType,Image } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import {  Restaurent, FoodModel } from '../redux'
// import {Image} from 'react-native-elements'

interface RestaurentProps {
   item : Restaurent | FoodModel
   onTap: Function

}
const screenWidth = Dimensions.get('screen').width

 const RestaurentCard: React.FC<RestaurentProps> = ({item, onTap}) => {


    return (
        <TouchableOpacity style={styles.container} onPress={() => onTap(item)}>
             
              <Image  
            //   PlaceholderContent = {<ActivityIndicator/>}
                      source={{uri: `${item.images[0]}`}}
                      style={{width:screenWidth-20, height:220, borderRadius:20,backgroundColor:'#EAEAEA'}}
                       />
        </TouchableOpacity>
        
        
    )

}

const styles = StyleSheet.create({
   container: {
        width:screenWidth-20,
        height:230,
        justifyContent:'space-around',
        alignItems:'center',
        margin:5,
        paddingTop:20
    }
})

export { RestaurentCard}