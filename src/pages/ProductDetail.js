import { View, Text, StyleSheet ,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { addBasket } from '../redux/BasketSlice'
import { useDispatch } from 'react-redux'
import { Toast ,ALERT_TYPE } from 'react-native-alert-notification'

export default function ProductDetail({route}) {
  const {item} = route.params.item
  const dispatch=useDispatch()

  const basketAdd=()=>{
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Added To Cart',
      textBody: 'You Can Complete Your Shopping By Going To Cart',
      autoClose:2000
  })
  dispatch(addBasket(item))
  }
  return (
    <View style={styles.container}>
      <View style={{flex:9,width:'85%',marginTop:30}}>
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
      </View>
      <View style={styles.btnBar}>
        <TouchableOpacity style={styles.basketBtn} onPress={()=>basketAdd()}>
            <Text style={{fontSize:18,color:'white'}}>Add Basket</Text>
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
      height:40,
      backgroundColor:'rebeccapurple',
      justifyContent:'center',
      alignItems:'center',
      borderRadius:30,
      width:200,
    },
    btnBar:{
      flex:1,
      backgroundColor:'#F1F2F3',
      width:'100%',
      justifyContent:'center',
      alignItems:'center'
    }
})