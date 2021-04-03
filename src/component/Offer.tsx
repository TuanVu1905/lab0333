import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, Image, ImageSourcePropType, ImageBackground,Alert, Modal  } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import {  Restaurent, FoodModel } from '../redux'
import { useState } from 'react'
import { useNavigation } from '../utils'


interface OfferProps {
   item : Restaurent ,
   onTap : Function

}
const screenWidth = Dimensions.get('screen').width

 const Offer: React.FC<OfferProps> = ({item, onTap}) => {
    const [modalVisible, setModalVisible] = useState(false);
   
    const {navigate} = useNavigation()


    return (
        <TouchableOpacity style={styles.container}  onPress={() => {
            setModalVisible(true);
          }}>
             
             <ImageBackground 
                            
                            source={{ uri: `${item.images[0]}` }}
                            style={{ width: screenWidth, height: 300, justifyContent: 'flex-end', padding:10 }}>
                    <View style={{ height: 120, backgroundColor: 'rgba(0,0,0,0.6)', padding: 5, marginLeft:20 }}>
                        <Text 
                            onPress = {() => onTap()}
                            style={{
                            fontWeight: 'bold', fontSize: 15 ,color: 'white', textShadowColor: 'rgba(0, 0, 0, 0.75)',
                            textShadowOffset: { width: -1, height: 1 },
                            textShadowRadius: 10
                        }}>{item.name} - <Text style={{fontStyle:'italic'}}>5 km</Text></Text>
                        <Text style={{ color: '#fff', fontSize: 20, fontWeight: '500' }}>{item.address}- Hotline:{item.phone}</Text>
                        <Text>
                            <Image style={styles.starIcon} source={(require('../images/starIcon.png'))} />
                            <Image style={styles.starIcon} source={(require('../images/starIcon.png'))} />
                            <Image style={styles.starIcon} source={(require('../images/starIcon.png'))} />
                            <Image style={styles.starIcon} source={(require('../images/starIcon.png'))} />
                            <Image style={styles.starIcon} source={(require('../images/starIcon.png'))} />
                        </Text>
                    </View>
                </ImageBackground>
        </TouchableOpacity>
        
        
    )

}

const styles = StyleSheet.create({
   container: {
        width:screenWidth-20,
        height:230,
        justifyContent:'space-around',
        alignItems:'center',
        paddingTop:20,
        marginTop:10
      
    },
    starIcon : {
        width:15,
        height:15,
        
    }
})

export { Offer}