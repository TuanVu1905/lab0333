import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'


interface SearchBarProps {
    onEndEditing? : any | undefined,   // kết thúc hành động gõ tìm kiếm, sẽ hiển thị icon
    didTouch? : any | undefined,  // đã gõ hay chưa ?
    autoFocus?: boolean | undefined,
    onTextChange: Function  // hàm lấy giá trị sau khi gõ search

}
 const SearchBar: React.FC<SearchBarProps> = ({onEndEditing, didTouch,autoFocus = false, onTextChange}) => {


    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                 <Image style={{width:25,height:25}} source={require('../images/search.png')} />
                 <TextInput 
                      style={{marginLeft:5, flex:9, display:'flex', fontSize:20, height:42}}
                      placeholder={'Searching Food'}
                      autoFocus={autoFocus}
                      onTouchStart={didTouch}
                      onChangeText={text => onTextChange(text)}
                      onEndEditing={onEndEditing}
                 />
            </View>
        </View>
    )

}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        height:70,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        alignContent:'center',
        paddingLeft:20,
        paddingRight:20,
        paddingTop:20,
        paddingBottom:15
    },
    searchBar: {
        display:'flex',
        height:34,
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignContent:'center',
        alignItems:'center',
        borderRadius:20,
        paddingRight:10,
        paddingLeft:10,
        borderColor:'#E5E5E5',
        backgroundColor:'#ededed',
        borderWidth:2
    }

})



export { SearchBar }