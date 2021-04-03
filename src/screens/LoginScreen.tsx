import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Dimensions, Image, Text, Button, Alert } from 'react-native'
import { FoodModel, ApplicationState, ShoppingState, UserState, onUserLogin, onUserSignUp, onOTPRequest, onVerify,onUserLoginGG } from '../redux'
import { TextField } from '../component'
import { connect } from 'react-redux'
import { ButtonWithTitle } from '../component/ButtonWithTitle'
import { useNavigation, checkExistence } from '../utils'
import * as Google from 'expo-google-app-auth'
import * as Account from '../utils/LoginHelper'
import * as Facebook from 'expo-facebook';
import {Ionicons} from '@expo/vector-icons'

interface LoginProps {
    onUserLogin: Function,
    onUserSignUp: Function,
    userReducer: UserState,
    onOTPRequest: Function, onVerify: Function,
    Account: {},
    onUserLoginGG: Function,

}




const _LoginScreen: React.FC<LoginProps> = ({ onUserLogin, onUserSignUp, userReducer, Account, onUserLoginGG }) => {

    const { navigate} = useNavigation()
    const [isSignUp, setIsSignUp] = useState(false)
    const [vertified, setVertified] = useState(true)
    const [isLoginGG, setIsLoginGG] = useState(false)
  
    const {user, userGG} = userReducer
    //google
    async function signInWithGoogleAsync() {
        try {
            const result = await Google.logInAsync({
                androidClientId: '237033973781-habtir4dmjr82b3teqb9l44743n5237s.apps.googleusercontent.com',
                scopes: ['profile', 'email'],
            });

            if (result.type === 'success') {
                onUserLoginGG(result)
                
                setIsLoginGG(true)
                return {
                    token : result.accessToken,
                    isNavigate : true
                };

            } else {
                return { cancelled: true };
            }
        } catch (e) {
            return { error: e };
        }
    }

    //facebook
    async function logIn() {
        try {
            await Facebook.initializeAsync({
                appId: '787040031882663',
            });
            const res = await Facebook.logInWithReadPermissionsAsync({ permissions: ['public_profile'] });
            if (res.type === 'success') {
                // Get the user's name using Facebook's Graph API
                const response = await fetch(`https://graph.facebook.com/me?access_token=${res.token}`);
                Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);

            } else {
                // type === 'cancel'
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    }

    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [title, setTitle] = useState('Login')
 

    const [otp, setOtp] = useState('')

    const [requestOtpTitle, setRequestOtpTitle] = useState('Request a new OTP in')
    const [canRequestOtp, setCanRequestOtp] = useState(true)




    const onTapOption = () => {
        setIsSignUp(!isSignUp)
        setTitle(!isSignUp ? 'SignUp' : 'SignIn')
    }

    const onTapAuthenticate = () => {
        if (isSignUp) {
            onUserSignUp(email, password, phone)
        } else {
            onUserLogin(email, password)
        }
    }

    let countDown: number

    useEffect(() => {

        if (user.vertified !== undefined) {
            if (user.vertified === true) {
                navigate('CartPage')
            } else {
                setVertified(user.vertified)
            }
        }
        
        onEnableOtpRequest()

        return () => {
            clearInterval(countDown)
        }

        
    }, [])




    const onEnableOtpRequest = () => {
        const otpDate = new Date()  // lấy ngày hiện tại

        otpDate.setTime(new Date().getTime() + (2 * 60 * 1000))  // lấy thời gian chờ là 2 phút

        const otpTime = otpDate.getTime() // thời gian otp gửi đến

        countDown = setInterval(function () {  // toognr thời gian đém ngược 

            const currentTime = new Date().getTime() // thời điểm hiện tại

            const totalTime = otpTime - currentTime // tổng thời gian = thời gian gửi otp - thời điểm hiện tại

            let minutes = Math.floor((totalTime % (1000 * 60 * 60)) / (1000 * 60)) // quy đổi ra phút

            let seconds = Math.floor((totalTime % (1000 * 60)) / 1000)  // quy đổi thời gian ra giây

            let minutesNew = seconds > 10 ? minutes : '0' + minutes

            let secondsNew = seconds > 10 ? seconds : '0' + seconds

            setRequestOtpTitle(`Request a New OTP in ${minutesNew} :  ${secondsNew}`)

            if (minutes < 1 && seconds < 1) {  // nếu thời gian hết mà chưa nhập mã otp
                setRequestOtpTitle(`Request a New OTP `) // chỉnh lại title
                setCanRequestOtp(true) // có thể gửi lại
                clearInterval(countDown) // xóa countdown vừa nãy
            }


        }, 1000)


    }


    const onTapVerify = () => {
        onVerify(otp, user)
    }

    const onTapRequestNewOTP = () => {
        setCanRequestOtp(false)
        onOTPRequest(user)

    }

    if (!vertified)  // account chưa được xác nhận
    {
        return (
            <View style={styles.container}>
             
                <View style={styles.body}>
                    <Image source={(require('../images/verify_otp.png'))} style={{ height: 120, width: 120, marginTop: 200 }} />
                    <Text style={{ fontSize: 22, fontWeight: '500', margin: 10 }}>Verification</Text>
                    <Text style={{ fontSize: 16, color: '#716F6F', marginBottom: 20, padding: 10 }}>Enter your OTP sent to your number</Text>
                    <TextField
                        isOTP={true}
                        placeholder='OTP'
                        onTextChange={() => { }}

                    />

                    <ButtonWithTitle title={'Verify OTP'} onTap={onTapVerify} width={340} height={50} />

                    <ButtonWithTitle disable={canRequestOtp} title={requestOtpTitle} isNoBg={true} onTap={onTapRequestNewOTP} width={320} height={50} />
                </View>

            </View>
        )
    }
    else {
        return (
            <View style={styles.container}>
                <View style={styles.navigation}>
                   <Text style={{fontSize:20, fontWeight:'bold'}}>{isSignUp ? 'Sign Up' : 'Sign In'}</Text>
                </View>
                <View style={styles.body}>
                    {/* <Image style={{ width: 200, height: 200, alignSelf: 'center' }} source={(require('../images/account_icon.png'))} /> */}
                    <TextField placeholder='Email' onTextChange={setEmail} />
                    {
                        isSignUp && <TextField placeholder='Phone' onTextChange={setPhone} />
                    }

                    <TextField placeholder='Password' onTextChange={setPassword} isSecure={true} />

                </View>
                <View style={styles.footer}>
                    <ButtonWithTitle onTap={onTapAuthenticate} width={340} height={50} title={title} />

                    <ButtonWithTitle onTap={() => onTapOption()} width={340} height={50} title={!isSignUp ? 'No Account ? Signup Here' : 'Have an Account ? Login Here'} isNoBg={true} />
                    <View style={{ padding: 10 , display:'flex', flexDirection:'row', alignItems:'center'}}>
                        <Text style={{borderBottomWidth:1, width:100, borderColor:'orange'}}></Text>
                        <Text style={{padding:5}}>or</Text>
                        <Text style={{borderBottomWidth:1, width:100,borderColor:'orange'}}></Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: Dimensions.get('screen').width - 50 }}>
                        <View style={{ borderWidth: 1, height: 40, alignItems: 'center', width: 150, borderRadius: 10 }}>
                            <Text style={{ lineHeight: 40 }} onPress={() => signInWithGoogleAsync().then(res => {
                                if(res?.isNavigate) {
                                    navigate('AccountPage')
                                }
                            })}>GOOGLE</Text>
                        </View>
                        <View style={{ borderWidth: 1, height: 40, alignItems: 'center', width: 150, borderRadius: 10, backgroundColor: 'blue' }}>
                            <Text style={{ lineHeight: 40, color: 'white' }} onPress={logIn}>FACEBOOK</Text>
                        </View>
                    </View>


                </View>

            </View>
        )
    }



}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    navigation : {
        flex:1,
        alignItems:'center',marginTop:50
    },
    body: {
        flex: 10,
        justifyContent: 'center',
        alignItems: 'center',

    },
    footer: {
        flex: 9,
        alignContent: 'center',
        alignItems: 'center',
    },
})

const mapToStateProps = (state: ApplicationState) => ({
    userReducer: state.userReducer,
    shoppingReducer: state.shoppingReducer
})

const LoginScreen = connect(mapToStateProps, { onUserLogin, onUserSignUp, onVerify, onOTPRequest, onUserLoginGG })(_LoginScreen)



export { LoginScreen }