import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, Image, ImageSourcePropType } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'


interface ButtonProps {
     onTap: Function,
     width: number,
     height: number,
     icon: ImageSourcePropType

}
 const ButtonWithIcon: React.FC<ButtonProps> = ({onTap, width,height,icon}) => {


    return (
        <TouchableOpacity style={[styles.btn, {width,height}]} onPress={() => onTap()}>
             
              <Image style={{width:width , height:height}} source={icon} />

        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    btn: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    }
})

export { ButtonWithIcon}