import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, Image, ImageSourcePropType } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'


interface ButtonTitleProps {
     onTap: Function,
     width: number,
     height: number,
     title: string,
    isNoBg? : boolean,
    disable? : boolean
}
 const ButtonWithTitle: React.FC<ButtonTitleProps> = ({onTap, width,height,title, isNoBg = false, disable=false}) => {


    if(isNoBg) {
        return (
            <TouchableOpacity disabled={disable} style={[styles.btn, {width,height, backgroundColor:'transparent'}]} onPress={() => onTap()}>
                      <Text style={{color: disable ? '#6F6F6F' : '#3980D9',fontSize:19,}}>{title}</Text>
            </TouchableOpacity>
        )
    } else {
        return (
            <TouchableOpacity style={[styles.btn, {width,height}]} onPress={() => onTap()}>
                      <Text style={{color:'white',fontSize:19}}>{title}</Text>
            </TouchableOpacity>
        )
    }
    

}

const styles = StyleSheet.create({
    btn: {
        justifyContent:'center',
        alignItems:'center',
 
        borderRadius:50,
        backgroundColor:'#f14b5d',
        marginTop:20,
    }
})

export { ButtonWithTitle}