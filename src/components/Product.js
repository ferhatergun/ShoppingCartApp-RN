import { View, Text ,Image,TouchableOpacity} from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import  IconFon  from 'react-native-vector-icons/Fontisto'
import  IconMC  from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { addBasket } from '../redux/BasketSlice'
import { useSelector } from 'react-redux'
import { Toast , ALERT_TYPE  } from 'react-native-alert-notification'

export default function Product({item}) {
    const navigation =useNavigation()
    // console.log(item) 
    const dispatch = useDispatch()
    const sepet =useSelector(state=>state.basket.basket)
    // console.log(sepet)

    const basketAdd=()=>{
        dispatch(addBasket(item))
        Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Sepete Eklendi',
            textBody: 'Sepete Giderek Alışverişi Tamamalayabilisin',
            autoClose:2000
        })
    }
  return (
    <TouchableOpacity style={styles.container} onPress={()=>navigation.navigate("ProductDetailNavigator",{item:item})}>
        <View style={styles.imageView}>
            <Image source={{ uri: item.image }} style={styles.image} />
        </View>
        <View style={styles.productTitleView}>
            <Text style={styles.productTitle}>{item.title}</Text>
        </View>
        <View style={styles.productCategoryView}>
            <Text style={styles.productCategory}>{item.category.title}</Text>
        </View>
        <View style={styles.productPriceView}>
            <Text style={styles.productPrice}>{Math.floor(item.price)}$</Text>
        </View>
        <TouchableOpacity style={styles.basket} onPress={()=>basketAdd()}>
            <IconMC name='cart-plus' size={20} />
        </TouchableOpacity>

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container:{
        width:'48%',
        height:240,
        borderRadius:10,
        marginLeft:5,
        padding:15,
        position:'relative',
        
        
    },
    imageView:{
        height:130,
    },
    image:{
        width:'100%',
        height:'100%',
        borderTopRightRadius:10,
        borderTopLeftRadius:10
    },
    productTitleView:{
        marginTop:5,
    },
    productTitle:{
        fontSize:16
    },
    productCategory:{
        fontSize:12,
        color:'gray'
    },
    productPriceView:{
        marginTop:10
    },
    productPrice:{
        fontSize:15
    },
    basket:{
        position:'absolute',
        bottom:10,
        right:10,
        padding:7,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'rebeccapurple',
        borderWidth:1
   }

})