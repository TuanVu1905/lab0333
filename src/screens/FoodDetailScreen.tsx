import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions,ImageBackground } from 'react-native'
import { FoodModel, ApplicationState ,addProduct,removeProduct} from '../redux'
import { ButtonWithIcon, FoodCard } from '../component'

import { useNavigation } from '../utils'
import { connect } from 'react-redux'

var { width, height } = Dimensions.get('screen')

interface FoodDetailProps {
    navigation: { getParam: Function, goBack: Function },
    addProduct: Function,
    removeProduct:Function

}
const _FoodDetailScreen: React.FC<FoodDetailProps> = (props) => {

    const { getParam, goBack } = props.navigation

    const food = getParam('food') as FoodModel

    const { navigate } = useNavigation()

    // const onTapFood = (item: FoodModel) => {
    //     navigate('FoodDetailPage', { food: item })
    // }

    useEffect(() => {
        console.log('check unit ở foodDetail' , food.unit)
    })

    return (
        <View style={styles.container}>
            <View style={styles.navigation}>
                <ButtonWithIcon icon={require('../images/back_arrow.png')} onTap={() => goBack()} width={42} height={42} />
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 50 }}>{food.name}</Text>
            </View>
            <View style={styles.body}>
                <ImageBackground source={{ uri: `${food.images[0]}` }} style={{ width: width, height: 300, justifyContent: 'flex-end' }}>
                        <View style={{height:120, backgroundColor:'rgba(0,0,0,0.6)', padding:10}}>
                            <Text style={{ color: '#fff', fontSize: 30, fontWeight: '700' }}>{food.name}</Text>
                            <Text style={{ color: '#fff', fontSize: 22, fontWeight: '300',fontStyle:'italic' }}> {food.category}</Text>
                        </View>
                </ImageBackground>
                <View style={{display:'flex', height:300, padding:20}}>
                    <View>
                         <Text>Food will be ready within {food.readyTime} minutes</Text>
                    </View>
                    <View style={{marginTop:20}}>
                        <Text style={{fontStyle:'italic', fontSize:20, fontWeight:'900'}} >Description : </Text>
                        <Text style={{fontSize:15}}>{food.description}</Text>
                    </View>
                </View>
               
            </View>
            <View style={styles.footer}>     
                      <FoodCard onRemove={props.removeProduct} item={food} onTap={() => {}} onUpdateCart={props.addProduct} />
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
        flex: 1,
        marginTop: 43,
        paddingLeft: 5,
        flexDirection: "row",
        alignItems: 'center'
    },
    body: {
        flex: 7,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    footer: {
        flex: 2,
    }
})


const mapStateToProps = (state: ApplicationState) => ({
    shoppingReducer: state.shoppingReducer,
    userReducer : state.userReducer
})

const FoodDetailScreen = connect(mapStateToProps, {addProduct,removeProduct})(_FoodDetailScreen)



export { FoodDetailScreen }