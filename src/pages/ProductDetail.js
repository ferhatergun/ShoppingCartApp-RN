import { View, Text, StyleSheet ,Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function ProductDetail({route}) {
  const {item} = route.params.item
  console.log(item)
  return (
    <View style={styles.container}>
      <View style={{flex:1,width:'85%',marginTop:30}}>
        <View style={styles.imageView}>
        <Image source={{ uri: item.image }} style={styles.image} />
        </View>
        <View style={styles.titlePriceView}>
          <Text style={styles.productTitle}>{item.title}</Text>
          <Text style={styles.productPrice}>{item.price}</Text>
        </View>
        
        <View>
          <Text style={styles.productDescription}>{item.description}</Text>
        </View>
        <TouchableOpacity style={styles.basketBtn}>
          <Text style={{fontSize:18}}>Add Basket</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

  const styles =  StyleSheet.create({
    container:{
      flex:1,
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor:'white',
    },
    imageView:{
      width:'100%',
      height:300,
    },
    image:{
        width:'100%',
        height:'100%'
    },
    productTitle:{
      fontSize:20,
      marginTop:10
    },
    productPrice:{
      fontSize:18,
      marginTop:10,
    },
    titlePriceView:{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center', 
    },
    productDescription:{
      marginTop:20,
      fontSize:15
    },
    basketBtn:{
      height:50,
      backgroundColor:'yellow',
      justifyContent:'center',
      alignItems:'center',
      borderRadius:30,
      marginTop:20
    }
})