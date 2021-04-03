import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, Image, ImageSourcePropType, ImageBackground } from 'react-native'
import { TextInput, TouchableOpacity, FlatList } from 'react-native-gesture-handler'
import { FoodModel, ApplicationState, ShoppingState , onUpdateCart, UserState,addProduct, removeProduct} from '../redux'
import { ButtonWithIcon, ButtonAddRemove, FoodCard, SearchBar } from '../component'

import { useNavigation, checkExistence } from '../utils'
import { connect } from 'react-redux'
import { FoodCardSearch } from '../component/FoodCardSearch'




interface SearchProps {
    shoppingReducer: ShoppingState,
    userReducer: UserState,
    onUpdateCart : Function,
    addProduct : Function,
    removeProduct :Function

}
const _SearchScreen: React.FC<SearchProps> = (props) => {


     const { navigate } = useNavigation()


    const [isEditing, setisEditing] = useState(false)
    const [keyword, setKeyword] = useState('')

    const { availableFoods } = props.shoppingReducer


    const {cart} = props.userReducer

    const onTapFood = (item : FoodModel,eventName? : string) => {
        // navigate('FoodDetailPage', {food: item})
        if(eventName === 'go_detail') {
            navigate('FoodDetailPage', {food: item})
        }
    }

    useEffect(() => {
   
    })


    return (
        <View style={styles.container}>
            <View style={styles.navigation}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', height: 40, alignItems: 'center', marginLeft: 4 }}>
                    <ButtonWithIcon onTap={() => navigate('HomePage')} width={40} height={50} icon={require('../images/back_arrow.png')} />
                    <SearchBar
                        didTouch={() => setisEditing(true)}
                        onTextChange={setKeyword}
                        onEndEditing={() => setisEditing(false)}
                    />
                </View>
            </View>
            <View style={styles.body}>
            
                        <FlatList
                    showsVerticalScrollIndicator={false}
                    data={isEditing ? availableFoods.filter(item => {
                        return item.name.includes(keyword)
                    }) : availableFoods}
                    renderItem={({ item }) => <FoodCardSearch onUpdateCart={props.addProduct}  onRemove={props.removeProduct}  item={item} onTap={onTapFood} />}
                    keyExtractor={(item) => `${item._id}`}

                />
                   
                
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
    userReducer : state.userReducer
})

const SearchScreen = connect(mapStateToProps, {addProduct,removeProduct})(_SearchScreen)

export { SearchScreen }