import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, Image, ImageSourcePropType, ImageBackground } from 'react-native'
import { TextInput, TouchableOpacity, FlatList } from 'react-native-gesture-handler'
import { Restaurent, FoodModel, ApplicationState,addProduct, removeProduct } from '../redux'
import { ButtonWithIcon, FoodCard } from '../component'

import {useNavigation} from '../utils'
import { connect } from 'react-redux'

var { width, height } = Dimensions.get('screen')

interface RestaurentProps {
    navigation: { getParam: Function, goBack: Function },
    addProduct : Function,
    removeProduct : Function
    

}
const _RestaurentScreen: React.FC<RestaurentProps> = (props) => {

    const { getParam, goBack } = props.navigation

    const restaurant = getParam('restaurant') as Restaurent

    const {navigate} = useNavigation()

    const onTapFood = (item : FoodModel) => {
        navigate('FoodDetailPage', {food: item})
    }

    return (
        <View style={styles.container}>
            <View style={styles.navigation}>
                <ButtonWithIcon icon={require('../images/back_arrow.png')} onTap={() => goBack()} width={42} height={42} />
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 50,textAlign:'center' }}>{restaurant.name}</Text>
            </View>
            <View style={styles.body}>
                <ImageBackground 
                            source={{ uri: `${restaurant.images[0]}` }}
                            style={{ width: width, height: 300, justifyContent: 'flex-end' }}>
                    <View style={{ height: 120, backgroundColor: 'rgba(0,0,0,0.6)', padding: 5 }}>
                        <Text style={{
                            fontWeight: 'bold', fontSize: 30, color: 'white', textShadowColor: 'rgba(0, 0, 0, 0.75)',
                            textShadowOffset: { width: -1, height: 1 },
                            textShadowRadius: 10
                        }}>{restaurant.name}</Text>
                        <Text style={{ color: '#fff', fontSize: 25, fontWeight: '500' }}>{restaurant.address}- Hotline:{restaurant.phone}</Text>
                        <Text>
                            <Image style={styles.starIcon} source={(require('../images/starIcon.png'))} />
                            <Image style={styles.starIcon} source={(require('../images/starIcon.png'))} />
                            <Image style={styles.starIcon} source={(require('../images/starIcon.png'))} />
                            <Image style={styles.starIcon} source={(require('../images/starIcon.png'))} />
                            <Image style={styles.starIcon} source={(require('../images/starIcon.png'))} />
                        </Text>
                    </View>
                </ImageBackground>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={restaurant.foods}
                    renderItem={({ item }) => <FoodCard onRemove={props.removeProduct} onUpdateCart={props.addProduct} item={item} onTap={onTapFood} />}
                    keyExtractor={(item) => `${item._id}`}

                />
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
        display:'flex',
        flex: 1,
        marginTop: 43,
        paddingLeft: 5,
        flexDirection: "row",
        alignItems: 'center',
        alignContent:'center'
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
    starIcon : {
        width:15,
        height:15,
        
    }
})


const mapStateToProps = (state: ApplicationState) => ({
    shoppingReducer: state.shoppingReducer,
    userReducer : state.userReducer
})

const RestaurentScreen = connect(mapStateToProps, {addProduct,removeProduct})(_RestaurentScreen)

export { RestaurentScreen }