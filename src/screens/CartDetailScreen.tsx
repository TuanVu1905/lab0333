import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, Image, ImageSourcePropType, ImageBackground, Alert } from 'react-native'
import { TextInput, TouchableOpacity, FlatList } from 'react-native-gesture-handler'
import { FoodModel, ApplicationState, ShoppingState, onUpdateCart, UserState, addProduct, removeProduct } from '../redux'
import { ButtonWithIcon, ButtonAddRemove, FoodCard, SearchBar } from '../component'

import { useNavigation, checkExistence } from '../utils'
import { connect } from 'react-redux'
import { CartDetail } from '../component/CartDetail'




interface CartDetailrops {
    shoppingReducer: ShoppingState,
    userReducer: UserState,
}
const _CardSDetailcreen: React.FC<CartDetailrops> = (props) => {

    const {navigate} = useNavigation()

    const onTotal = () => {
        const total = props.userReducer.cart.reduce((a, b) => {
            return a + (b.unit * b.price)
        }, 0)
        return total
    }

    const createTwoButtonAlert = () =>
    Alert.alert(
      "Awesome",
      "Continue order",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel"
        },
        { text: "OK", onPress: () => navigate('HomePage') }
      ],
      { cancelable: false }
    );

    return (
        <View style={styles.container}>
            <View style={styles.navigation}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: 40, alignItems: 'center', marginLeft: 4 }}>
                    <ButtonWithIcon onTap={() => navigate('CartPage')} width={40} height={50} icon={require('../images/back_arrow.png')} />
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', padding: 10 }}>CHECK AGAIN</Text>
                        <Image style={{ width: 40, height: 40 }} source={(require('../images/orders.png'))} />
                    </View>
                </View>
            </View>
            <View style={styles.body}>
            <FlatList
                            showsVerticalScrollIndicator={false}
                            data={props?.userReducer?.cart || []}
                            renderItem={({ item }) => <CartDetail item={item}  />}
                            keyExtractor={(item) => `${item._id}`}

                        />
            </View>
            <View style={{ display: 'flex', marginBottom: 10 }}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', paddingLeft: 20, paddingRight: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 10, color: 'orange' }}>Total : </Text>
                    <Text style={{ fontSize: 18, fontStyle: 'italic', padding: 10, fontWeight: 'bold' }}>${onTotal()}</Text>
                </View>
                <View 
                
                   onTouchStart={createTwoButtonAlert}

                style={{
                    height: 50,
                    marginLeft: 40,
                    alignItems: 'center',
                   
                    width: 270, backgroundColor: '#f5576c'
                }}>
                    <Text style={{ fontSize: 20, color: 'white', lineHeight: 50 }}>
                         ĐƠN HÀNG ĐÃ CHUÂN BỊ
                    </Text>
                </View>

            </View>

        </View>
    )

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    navigation: {
        flex: 1,
        marginTop: 40,
        marginBottom: 10
    },
    body: {
        flex: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
})



const mapStateToProps = (state: ApplicationState) => ({
    shoppingReducer: state.shoppingReducer,
    userReducer: state.userReducer
})

const CartDetailScreen = connect(mapStateToProps, {  })(_CardSDetailcreen)

export { CartDetailScreen }