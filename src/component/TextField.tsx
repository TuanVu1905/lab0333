import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, Image, ImageSourcePropType, ImageBackground } from 'react-native'
import { FoodModel, ApplicationState, ShoppingState, onUpdateCart, UserState, addProduct, removeProduct } from '../redux'
import { ButtonWithIcon, ButtonAddRemove, FoodCard, SearchBar } from '../component'

import { useNavigation, checkExistence } from '../utils'
import { TextInput } from 'react-native-gesture-handler'





interface TextFieldProps {
    placeholder: string,
    isSecure?: boolean,
    onTextChange: Function,
    isOTP?: boolean

}
const TextField: React.FC<TextFieldProps> = ({ placeholder, isSecure, onTextChange, isOTP = false }) => {


    if (isOTP) {
        return (
            <View style={styles.container}>
                <TextInput
                    autoCapitalize='none'
                    secureTextEntry={true}
                    maxLength={6}
                    placeholder={placeholder}
                    onChangeText={text => onTextChange(text)}
                    style={styles.optTextField}
                />
            </View>
        )
    }
    else {
        return (
            <View style={styles.container}>
                <TextInput
                    autoCapitalize='none'
                    secureTextEntry={isSecure}
                    placeholder={placeholder}
                    onChangeText={text => onTextChange(text)}
                    style={styles.textField}
                />
            </View>
        )
    }



}

const styles = StyleSheet.create({

    container: {
        width: 340,
        backgroundColor: '#DBDBDB',
        height: 50,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        marginLeft: 30,
        marginRight: 30
    },
    textField: {
        flex: 1,
        height: 50,
        width: 320,
        fontSize: 20,
        color: '#000'
    },
    optTextField: {
        flex: 1,
        height: 50,
        width: 320,
        fontSize: 30,
        color: '#000',
        textAlign:'center',
    }
})

export { TextField }