import { StyleSheet, Text, View ,Image } from 'react-native'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { TouchableOpacity } from 'react-native-gesture-handler'
import  IconFa  from 'react-native-vector-icons//Feather'
import { increase ,decrease,removeProduct} from '../redux/BasketSlice'


export default function BasketListProduct({item}) {
    // const [item,setItem]= useState([])
    // const token = useSelector(state => state.user.token)
    console.log(item)
    const dispatch = useDispatch()

    /* const getProduct =async () => {
        try{
            const response = await axios.get(`https://demoapi.webudi.tech/api/products/${data.productId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`,
                }
            });              
           const result = await response.data
            // console.log(result)
            if(result.status == true){
                setItem(result.product)
            }
            
        }catch(e){
            console.log(e)
        }
    }
 */
/*     useEffect(()=>{
        getProduct()
    },[]) */
  return (
    <View style={styles.container}>
      <View style={styles.imageView}>
        <Image source={{ uri: item?.product.image }} style={styles.image} />
      </View>
      <View style={styles.detail}>
        <Text>{item.product.title}</Text>
        <View style={styles.pcs}>
            <TouchableOpacity style={styles.pcsButton} onPress={()=>dispatch(decrease(item.product))}>
                <IconFa  name='minus' size={20} color="white" />
            </TouchableOpacity>
            <Text>{item.pcs}</Text>
            <TouchableOpacity style={styles.pcsButton} onPress={()=>dispatch(increase(item.product))}>
            <IconFa  name='plus' size={20} color="white" />
            </TouchableOpacity>
        </View>
        
      </View>
      <View style={styles.delete}>
            <TouchableOpacity style={styles.deleteButton} onPress={()=>dispatch(removeProduct(item.product))}>
                <IconFa name='trash' size={20}  />
            </TouchableOpacity>
            <View style={styles.price}>
                <Text>{(Math.floor(item.product.price)*item.pcs)}$</Text>
            </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        height:100,
        backgroundColor:'#F1F2F3',
        display:'flex',
        flexDirection:'row',
        padding:10,
        justifyContent:'space-between',
        borderRadius:10,
        marginTop:10
    },
    imageView:{
        width:130,
        height:'100%',
    },
    image:{
        width:'100%',
        height:'100%'
    },
    pcs:{
        display:'flex',
        flexDirection:'row',
        width:90,
        justifyContent: 'space-between',
        alignItems:'center',
    },
    detail:{
        justifyContent:'space-around',
        width:120
    },
    pcsButton:{
        width:30,
        height:30,
        backgroundColor:'black',
        justifyContent:'center',
        alignItems: 'center',
        borderRadius:10,
    },
    delete:{
        justifyContent:'flex-end',
        paddingLeft:20,
        paddingRight:20
    },
    deleteButton:{
        width:40,
        height:40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:10
    },
    price:{
        width:40,
        height:40,
        justifyContent: 'center',
        alignItems: 'center',
    }
})