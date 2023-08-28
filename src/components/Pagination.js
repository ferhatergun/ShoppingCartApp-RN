import { View, Text ,TouchableOpacity} from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'

export default function Pagination({setPage,page}) {
  return (
    <View style={styles.container}>
        <TouchableOpacity style={[styles.btn,page === 1 && styles.active ]} onPress={()=>setPage(1)}><Text>1</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.btn,page === 2 && styles.active ]} onPress={()=>setPage(2)}><Text>2</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.btn,page === 3 && styles.active ]} onPress={()=>setPage(3)}><Text>3</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.btn,page === 4 && styles.active ]} onPress={()=>setPage(4)}><Text>4</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.btn,page === 5 && styles.active ]} onPress={()=>setPage(5)}><Text>5</Text></TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        gap:10,
        padding:20,
    },
    btn:{
        backgroundColor:'white',
        borderRadius:10,
        paddingHorizontal:12,
        paddingVertical:10,
        borderColor:'#663399',
        borderWidth:2
    },
    active:{
      backgroundColor:'#e6e6e6',
    }
})