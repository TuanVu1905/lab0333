import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, Image, ImageSourcePropType, ImageBackground } from 'react-native'
import { TextInput, TouchableOpacity, FlatList } from 'react-native-gesture-handler'
import { FoodModel, ApplicationState, ShoppingState, onUpdateCart, UserState, addProduct, removeProduct } from '../redux'
import { ButtonWithIcon, ButtonAddRemove, FoodCard, SearchBar } from '../component'

import { useNavigation, checkExistence } from '../utils'
import { connect } from 'react-redux'




interface CardProps {
    shoppingReducer: ShoppingState,
    userReducer: UserState,
    onUpdateCart: Function,
    addProduct: Function,
    removeProduct: Function

}
const _CardScreen: React.FC<CardProps> = (props) => {

    // const { getParam, goBack } = props.navigation

    // const food = getParam('food') as FoodModel

    const [isCheckSignIn, setIsCheckSignIn] = useState(false)

    const { navigate } = useNavigation()

    const { cart, user } = props.userReducer

    const onTapFood = (item: FoodModel, eventName?: string) => {
        if (eventName === 'go_detail') {
            navigate('FoodDetailPage', { food: item })
        }
    }
    useEffect(() => {
        if (props.userReducer.cart.length === 0) {
            setIsCheck(false)
        } else {
            setIsCheck(true)
        }

        console.log(cart.map(x => x.unit))
    })

    const [isCheckCart, setIsCheck] = useState(false)


    const onTotal = () => {
        const total = props.userReducer.cart.reduce((a, b) => {
            return a + (b.unit * b.price)
        }, 0)
        return total
    }

    const onTapLogin = () => {
        if (isCheckCart === true) {
            if (!user.vertified) {
                navigate('LoginPage')
            }
            else {
                navigate('CartDetailPage')
            }

        }
        else {
            alert('Your cart is empty')
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.navigation}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: 40, alignItems: 'center', marginLeft: 4 }}>
                    <ButtonWithIcon onTap={() => navigate('HomePage')} width={40} height={50} icon={require('../images/back_arrow.png')} />
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', padding: 10 }}>My Cart</Text>
                        <Image style={{ width: 40, height: 40 }} source={(require('../images/orders.png'))} />
                    </View>
                </View>
            </View>
            <View style={styles.body}>
                {
                    props?.userReducer?.cart?.length !== 0 ? (
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={props?.userReducer?.cart || []}
                            renderItem={({ item }) => <FoodCard onUpdateCart={props.addProduct} onRemove={props.removeProduct} item={item} onTap={onTapFood} />}
                            keyExtractor={(item) => `${item._id}`}

                        />
                    ) : <View>
                            <Text style={{ fontSize: 30 }}> Cart empty </Text>
                            <Text onPress={() => navigate('HomePage')} style={{ fontSize: 15, marginLeft: 20, fontStyle: 'italic', color: 'orange' }}>Continue shopping</Text>
                        </View>
                }
            </View>
            <View style={{ display: 'flex', marginBottom: 10 }}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', paddingLeft: 20, paddingRight: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 10, color: 'orange' }}>Total : </Text>
                    <Text style={{ fontSize: 18, fontStyle: 'italic', padding: 10, fontWeight: 'bold' }}>${onTotal()}</Text>
                </View>
                <View style={{
                    height: 50,
                    marginLeft: 40,
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: '#f3f3f3',
                    width: 270, borderRadius: 20, backgroundColor: '#f5576c'
                }} onTouchStart={onTapLogin}>
                    <Text style={{ fontSize: 20, color: 'white', lineHeight: 50 }}>
                        Order Now
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

const CardScreen = connect(mapStateToProps, { addProduct, removeProduct })(_CardScreen)

export { CardScreen }