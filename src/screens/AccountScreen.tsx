import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, Image, ImageSourcePropType, ImageBackground } from 'react-native'
import { FoodModel, ApplicationState,onUserLogin, onUserSignUp, onVerify, onOTPRequest, onUserLoginGG, UserState} from '../redux'
import { ButtonWithIcon, ButtonAddRemove, FoodCard, SearchBar } from '../component'

import { useNavigation, checkExistence } from '../utils'
import { connect } from 'react-redux'





interface AccountProps {
    //navigation: { getParam: Function, goBack: Function },
    onUserLogin: Function,
    onUserSignUp: Function,
    userReducer: UserState,
    onOTPRequest: Function, onVerify: Function,
    Account: {},
    onUserLoginGG: Function,

}
const _AccountScreen: React.FC<AccountProps> = (props) => {

    const { userGG} = props.userReducer
    const { navigate, getParam, goBack } = useNavigation()
    const onTapToLogin = () => {
        navigate('LoginPage')

    }



    if (userGG.hasOwnProperty('user')) {
        return (
            <View style={styles.container}>
                <View style={styles.navigation}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: 40, alignItems: 'center', marginLeft: 4 }}>
                        <ButtonWithIcon onTap={() => navigate('CartDetailPage')} width={40} height={50} icon={require('../images/back_arrow.png')} />
                        <View style={{}}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Hello {userGG?.user?.name} </Text>
                            
                        </View>
                    </View>
                </View>
                <View style={styles.body}>
                    <Image source={{ uri: `${userGG?.user?.photoUrl}` }} style={{width:120, height:120 , borderRadius:20}} />
                    <View style={styles.div}>
                        <Text style={{ width: Dimensions.get('screen').width - 150 }} numberOfLines={1} >Your Email : </Text>
                        <Text style={{ fontStyle: 'italic', padding: 5, width: 120 }}>{userGG?.user?.email}</Text>
                    </View>
                    <View style={styles.div}>
                        <Text style={{ width: Dimensions.get('screen').width - 150 }}>Your Location : </Text>
                        <Text style={{ fontStyle: 'italic', padding: 5, width: 120 }}>Tân Chánh Hiệp</Text>
                    </View>
                    <View style={styles.div}>
                        <Text style={{ width: Dimensions.get('screen').width - 150 }} >Your Age :</Text>
                        <Text style={{ fontStyle: 'italic', padding: 5, width: 120 }}>18</Text>
                    </View>
                    <View style={styles.div}>
                        <Text style={{ width: Dimensions.get('screen').width - 150 }} >Your Cart :</Text>
                        <Text style={{ fontStyle: 'italic', padding: 5, width: 120 }}>Đang chuẩn bị</Text>
                    </View>
                </View>
                <View style={styles.footer}>

                </View>

            </View>
        )
    }
    else {
        return (
            <View style={styles.container}>
                <View style={styles.navigation}>

                </View>
                <View style={styles.body}>
                    <Text> You dont sign in account, please SIGN IN </Text>
                    <Text onPress={onTapToLogin} style={{ marginTop: 20, fontStyle: 'italic', fontWeight: 'bold', color: 'orange' }}>CLICK HERE TO SIGN IN </Text>
                </View>
                <View style={styles.footer}>

                </View>

            </View>
        )

    }

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: 450,
    },
    navigation: {
        flex: 1,
        marginTop: 40,
        marginBottom: 10, width: Dimensions.get('screen').width
    },
    body: {
        flex: 6,
        justifyContent: 'center',
        alignItems: 'center', backgroundColor: '#f2f2f2',
        borderRadius: 50,
        width: 350
    },
    footer: {
        flex: 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('screen').width
    },
    div: {
        height: 60,
        width: Dimensions.get('screen').width,
        borderWidth: 1,
        borderColor: 'white',
        lineHeight: 30,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'center',
        alignItems: 'center'
    }
})

const mapToStateProps = (state: ApplicationState) => ({
    userReducer: state.userReducer,
    shoppingReducer: state.shoppingReducer
})

const AccountScreen = connect(mapToStateProps, { onUserLogin, onUserSignUp, onVerify, onOTPRequest, onUserLoginGG })(_AccountScreen)


export { AccountScreen }