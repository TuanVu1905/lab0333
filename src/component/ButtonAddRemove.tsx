import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, Image, ImageSourcePropType } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'


interface ButtonAddRemoveProps {
    onAdd: Function,
    unit: number,
    onRemove: Function

}
const ButtonAddRemove: React.FC<ButtonAddRemoveProps> = ({ onAdd, onRemove, unit }) => {
    
    // useEffect(() => {
    //     console.log('check unit', unit)
    // })
     // unit hiện đúng

     useEffect(() => {
         //console.log('kiểm tra số lượng unittttttttttttttttt', unit)
     })

    if(unit > 0) {
        return (
            <View style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center', borderRadius:20}}>
                <View style={styles.btn} onTouchStart={() => onRemove()}>
                    <Text style={{ fontSize: 18, color: '#f14b5d' }}> -  </Text>
                </View>
                <View style={{padding:5}}>
              <Text style={{fontWeight:'bold', fontSize:18, color:'#f14b5d'}}>{unit}</Text>
                </View>
                <View style={styles.btn}  onTouchStart={() => onAdd()}>
                    <Text style={{ fontSize: 18, color: '#f14b5d' }}> +  </Text>
                </View>
            </View>
    
        )
    }
    else {
        return (
            <View style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center', borderRadius:20}}>
                <View 
                     onTouchStart={() => onAdd()}
                     style={styles.btnO}>
                         <Text style={{ fontSize: 18, color: '#f14b5d', }}> ADD  </Text>
                </View>
            </View>
    
        )
    }
    

}

const styles = StyleSheet.create({
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
        height: 50,
        borderRadius: 10,
        alignSelf: 'center',
        borderWidth:1,
        borderColor:'#f14b5d',
    },
    btnO: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: 40,
        borderRadius: 10,
        alignSelf: 'center',
        borderWidth:1,
        borderColor:'#f14b5d',
    }
})


export { ButtonAddRemove }