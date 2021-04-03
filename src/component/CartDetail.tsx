import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, Image, ImageSourcePropType } from 'react-native'
import { TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { Restaurent, FoodModel } from '../redux'
import { ButtonAddRemove } from './ButtonAddRemove'


interface CartDetailProps {
    item: FoodModel

}
const screenWidth = Dimensions.get('screen').width

const CartDetail: React.FC<CartDetailProps> = ({ item }) => {

    return (
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            margin: 10,
            borderRadius: 20,
            borderWidth: 1,
            height: 100,
            flex: 1,
            borderColor: '#E5E5E5',
            width: Dimensions.get('screen').width - 20
        }}>
            <Image source={{ uri: `${item.images[0]}` }} style={{ width: 100, height: 100, borderRadius: 20 }} />
            <TouchableWithoutFeedback  
                style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-around' }} >
                <View style={{ width: Dimensions.get('screen').width - 220, marginTop: 10, marginLeft: 10 }}>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontSize: 20, fontWeight: 'bold' }}>
                        {item.name}
                    </Text>
                    <Text style={{ textTransform: 'uppercase', marginTop: 20, fontWeight: '600' }} >
                        {item.category}
                    </Text>
                </View>
                <View style={{ marginTop: 20 }}>

                    <Text style={{ marginLeft: 20, marginBottom: 5, fontWeight: 'bold', color: 'orange', fontStyle: 'italic' }}>
                        ${item.unit > 0 ? item.price * item.unit : item.price}
                    </Text>
                    <Text> Quantity :  {item.unit}</Text>
                </View>



            </TouchableWithoutFeedback>
        </View>
    )

}


export { CartDetail }