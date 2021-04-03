import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import { connect } from 'react-redux' // sử dụng connect để kết nối state và action
import { onAvailability, UserState, ApplicationState, ShoppingState, Restaurent, FoodModel,onSearchFoods } from '../redux'
import { SearchBar, ButtonWithIcon, CategoryCard, RestaurentCard } from '../component'
import { useNavigation } from '../utils'
import { ScrollView, FlatList } from 'react-native-gesture-handler'


interface HomeProps {
    userReducer: UserState,
    onAvailability: Function,
    shoppingReducer: ShoppingState,
    onSearchFoods: Function
}

export const _HomeScreen: React.FC<HomeProps> = (props) => {

    const { location } = props.userReducer
    const { availability } = props.shoppingReducer

    const { categories, foods, restaurants } = availability

    const { navigate } = useNavigation()

    useEffect(() => {
        props.onAvailability(location.postalCode), 
        setTimeout(() => {
            props.onSearchFoods(location.postalCode)
        },1000)
    }, [])

    const onTapRestaurent = (item: Restaurent) => {
        navigate('RestaurentPage', { restaurant: item })
    }

    const onTapFood = (item: FoodModel) => {
        navigate('FoodDetailPage', { food: item })
    }


    return (
        <View style={styles.container}>
            <View style={styles.navigation}>
                <View style={{ marginTop: 50, flex: 4, paddingLeft: 20, paddingRight: 20, backgroundColor: 'white', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }}>
                    <Image style={{width:20,height:20}} source={(require('../images/delivery_icon.png'))} />
                     <Text style={{marginLeft:10, width:240}} textBreakStrategy='highQuality' numberOfLines={1} ellipsizeMode='tail' >{`${location.name}, ${location.street}, ${location.region}`}</Text>
                     <Image style={{width:20,height:20}} source={require('../images/edit_icon.png')} />
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', minHeight: 40, alignItems: 'center', marginLeft: 4}}>
                    <SearchBar

                        didTouch={() => {
                            navigate('SearchPage')
                        }}
                        onTextChange={() => {

                        }}

                    />
                    <ButtonWithIcon onTap={() => { }} width={50} height={40} icon={require('../images/hambar.png')} />
                </View>
            </View>
            <View style={styles.body}>
                <ScrollView>


                    {/* hien thij category */}
                    <FlatList
                        style={{backgroundColor:'#f4f4f4',marginTop:20}} // css
                        horizontal // chế độ dọc hay ngang
                        showsHorizontalScrollIndicator={false}
                        data={categories} // lấy dữ liệu
                        renderItem={({ item }) => <CategoryCard item={item} onTap={() => { alert('Categpry Tapped') }} />} // truy xuất dữ liệu
                        keyExtractor={item => `${item.id}`}  // chọn biến để trnash lỗi trùng , chọn id
                    />


                    <View >
                        <Text style={{
                            fontSize: 25, fontWeight: "bold", color: '#f15b5d', marginLeft: 20, marginTop: 20, textShadowColor: 'rgba(0, 0, 0, 0.75)',
                            textShadowOffset: { width: -1, height: 1 },
                            textShadowRadius: 10
                        }}>TOP RESTAURANT</Text>
                    </View>

                    <FlatList

                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={restaurants}
                        renderItem={({ item }) => <RestaurentCard item={item} onTap={onTapRestaurent} />}
                        keyExtractor={item => `${item._id}`}

                    />

                    <View >
                        <Text style={{ fontSize: 25, fontWeight: "bold", color: '#f15b5d', marginLeft: 20, marginTop: 20,
                                         textShadowColor: 'rgba(0, 0, 0, 0.75)',
                                         textShadowOffset: {width: -1, height: 1},
                                         textShadowRadius: 10
                    }}>30 MINUTES</Text>
                    </View>

                    <FlatList

                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={foods}
                        renderItem={({ item }) => <RestaurentCard item={item} onTap={onTapFood} />}
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
        backgroundColor: '#fff'
    },
    navigation: {
        flex: 2
    },
    body: {
        flex: 10,
        justifyContent: 'center',
        alignItems: 'center'

    },
})


const mapToStateProps = (state: ApplicationState) => ({
    userReducer: state.userReducer,
    shoppingReducer: state.shoppingReducer
})

const HomeScreen = connect(mapToStateProps, { onAvailability, onSearchFoods })(_HomeScreen)

export { HomeScreen }