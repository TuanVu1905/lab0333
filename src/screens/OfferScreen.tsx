import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, Image, ImageSourcePropType, ImageBackground } from 'react-native'
import { TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native-gesture-handler'
import { FoodModel, ApplicationState, ShoppingState, onUpdateCart, UserState, addProduct, removeProduct } from '../redux'
import { ButtonWithIcon, ButtonAddRemove, FoodCard, SearchBar, Offer } from '../component'

import { useNavigation, checkExistence } from '../utils'
import { connect } from 'react-redux'




interface OfferProps {
    shoppingReducer: ShoppingState,
    userReducer: UserState,
    onUpdateCart: Function,
    addProduct: Function,
    removeProduct: Function,
    onTap: Function

}
const _OfferScreen: React.FC<OfferProps> = (props) => {


    const { navigate } = useNavigation()


    const onTapFood = (item: FoodModel, eventName?: string) => {
        // navigate('FoodDetailPage', {food: item})
        if (eventName === 'go_detail') {
            navigate('FoodDetailPage', { food: item })
        }
    }

    const { availability } = props.shoppingReducer

    const { foods, restaurants } = availability


    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <View >
                    <Text
                        style={{
                            fontSize: 25, fontWeight: "bold", color: '#f15b5d', marginLeft: 20, marginTop: 20, textShadowColor: 'rgba(0, 0, 0, 0.75)',
                            textShadowOffset: { width: -1, height: 1 },
                            textShadowRadius: 10, paddingBottom: 10, paddingTop: 10
                        }}
                         >OFFER RESTAURANT
                    </Text>
                </View>
                <ScrollView
                >
                    <FlatList

                        horizontal={false}
                        showsHorizontalScrollIndicator={false}
                        data={restaurants}
                        // numColumns={4}
                        renderItem={({ item }) => <Offer onTap={() => navigate('RestaurantPage')} item={item} />}
                        keyExtractor={item => `${item._id}`}

                    />


                </ScrollView>
            </View>


        </View>
    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    navigation: {
        display: 'flex',
        flex: 1,
        marginTop: 43,
        paddingLeft: 5,
        flexDirection: "row",
        alignItems: 'center',
        alignContent: 'center'
    },
    body: {
        flex: 11,
        backgroundColor: '#FFF',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        backgroundColor: 'grey'
    },
    starIcon: {
        width: 15,
        height: 15,

    }
})




const mapStateToProps = (state: ApplicationState) => ({
    shoppingReducer: state.shoppingReducer,
    userReducer: state.userReducer
})

const OfferScreen = connect(mapStateToProps, {})(_OfferScreen)

export { OfferScreen }