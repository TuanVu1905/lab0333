// import React, { useEffect, useState } from 'react'
// import { View, Text, StyleSheet, Dimensions, Image, ImageSourcePropType, ImageBackground } from 'react-native'
// import { TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native-gesture-handler'
// import { FoodModel, ApplicationState, ShoppingState, onUpdateCart, UserState, addProduct, removeProduct } from '../redux'
// import { ButtonWithIcon, ButtonAddRemove, FoodCard, SearchBar, Offer } from '../component'
// import MapView, { Marker } from 'react-native-maps'
// import { useNavigation, checkExistence } from '../utils'
// import { connect } from 'react-redux'
// import * as Location from 'expo-location' // sử dụng thư viện lấy tọa độ
// import Icon from 'react-native-vector-icons/Ionicons';




// interface MapProps {
//     shoppingReducer: ShoppingState,
//     userReducer: UserState,

// }

// var {width, height} = Dimensions.get('screen')
// const _MapAdressScreen: React.FC<MapProps> = (props) => {


//     const { navigate } = useNavigation()

//     const [errorMsg, setErrorMsg] = useState("")

//     const [lat, setLat] = useState('')
//     const [long, setLong] = useState('')

//     useEffect(() => {


//         (async () => {

//             let { status } = await Location.requestPermissionsAsync();

//             if (status !== 'granted') {
//                 setErrorMsg('Permission to access location is not granted')
//             }

//             let location: any = await Location.getCurrentPositionAsync({});

//             const { coords } = location

//             if (coords) {

//                 const { latitude, longitude } = coords;

//                 let addressResponse: any = await Location.reverseGeocodeAsync({ latitude, longitude })

//             } else {
//                 //notify user something went wrong with location
//             }

//         })();



//     }, [])

//     const _getLocation = () {
//         Geolocation.getCurrentPosition((info) => {
//           setLat(info.coords.latitude),
//           setLong(info.coords.long)
//         }, (error) => {
//           console.log(JSON.stringify(error))
//         })
//       }
//      const movementMaker = (e:any) => {
    
//         // lấy tọa độ
//         const latitude = e.nativeEvent.coordinate.latitude
//         const longtitude = e.nativeEvent.coordinate.longitude
    
//         // update tọa độ
    
//         setLong(longtitude)
//         setLat(latitude)
//       }
    
//       const onClickMap = (e : any) => {
//         const { latitude, longitude } = e.coordinate
//         setLong(longitude)
//         setLat(latitude)
//       }
    


//     return (
//         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Text>Address</Text>
//         <MapView
//           style={{ width: width - 20, height: height - 20, marginTop: 20 }}
//           initialRegion={{
//             latitude: lat,
//             longitude: long,
//             latitudeDelta: 0.0042,
//             longitudeDelta: 0.0121
//           }}
//           onPress={(e) => onClickMap(e.nativeEvent)}
//         >
//           <Marker
//             draggable
//             coordinate={{
//               latitude: this.state.latitude,
//               longitude: this.state.longitude
//             }}
//             title=""
//             onDragEnd={(e) => this.movementMaker(e)}
//           />

//           <TouchableOpacity style={{
//             backgroundColor: "white",
//             height: 60, width: 60,
//             borderRadius: 50,
//             alignItems: 'center',
//             padding: 5,
//             position: "absolute",
//             top: 10,
//             right: 10
//           }} onPress={() => this._getLocation()}>
//             <Icon name="md-locate" size={50} color={"gray"} />
//             </TouchableOpacity>
//         </MapView>


//       </View>
//     )

// }


// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#f2f2f2'
//     },
//     navigation: {
//         display: 'flex',
//         flex: 1,
//         marginTop: 43,
//         paddingLeft: 5,
//         flexDirection: "row",
//         alignItems: 'center',
//         alignContent: 'center'
//     },
//     body: {
//         flex: 11,
//         backgroundColor: '#FFF',
//         justifyContent: 'flex-start',
//         alignItems: 'center'
//     },
//     footer: {
//         flex: 1,
//         backgroundColor: 'grey'
//     },
//     starIcon: {
//         width: 15,
//         height: 15,

//     }
// })




// const mapStateToProps = (state: ApplicationState) => ({
//     shoppingReducer: state.shoppingReducer,
//     userReducer: state.userReducer
// })

// const MapAdressScreen = connect(mapStateToProps, {})(_MapAdressScreen)

// export { MapAdressScreen }