import { View, Text ,FlatList,TouchableOpacity ,StyleSheet,Image, Button} from 'react-native'
import React ,{useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BasketListProduct from '../components/BasketListProduct'
import  IconIo  from 'react-native-vector-icons/Ionicons'
import  IconMc  from 'react-native-vector-icons/MaterialCommunityIcons'
import { removeAll } from '../redux/BasketSlice'
import img from '../assets/empty.png'
import { Dialog ,ALERT_TYPE} from 'react-native-alert-notification'
import { storage } from '../storage'


export default function Basket() {
  const dispatch = useDispatch()
  const basket = useSelector(state=>state.basket.basket)
  const [total,setTotal]=useState(0)


  useEffect(() => {
    // Sepetteki ürünlerin toplam fiyatını hesapla
    const calculatedTotal = basket.reduce((accumulator, item) => {
      return accumulator + item.pcs * item.product.price;
    }, 0);
    
    setTotal(calculatedTotal);
  }, [basket]);

  const complated=()=>{
    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Your Order Has Been Received',
      textBody: 'Will Be Delivered Within 3 Days',
      autoClose:2000
  })
    dispatch(removeAll())
  }
  return (
    <View style={styles.container}>
      <View style={styles.list}>
        {
          basket.length > 0 ?
            <FlatList 
          data={basket}
          keyExtractor={(item)=>item.product.id}
          renderItem={(item)=><BasketListProduct item={item.item}/>}
          />:
          <View style={styles.imgView}>
            <Image source={img} style={styles.img} />
            <Text style={{fontSize:17}}>Your Cart Is Empty</Text>
            
          </View>
        }
        
      </View>
      <View style={styles.tabbar}>
        <View style={styles.priceView}>
          <Text>{total} $</Text>
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.removeAll} onPress={()=>dispatch(removeAll())}>
            <IconIo name='trash-bin-outline' size={30} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.complated} onPress={()=>complated()}>
            <Text>Complated</Text>
            <IconMc name='truck-fast-outline' size={25} />
          </TouchableOpacity>
        </View>
      </View>
      
    </View>
  )
}
 const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'white'
    },
    list:{
      flex:8
    },
    tabbar:{
      flex:1,
      flexDirection:'row',
      backgroundColor:'#F1F2F3',
      borderColor:'gray',
      borderTopWidth:1
    },
    priceView:{
      width:'30%',
      justifyContent:'center',
      alignItems: 'center',
    },
    buttonView:{
      width:'70%',
      // backgroundColor:'yellow',
      flexDirection:'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap:10
    },
    removeAll:{
      height:50,
      width:80,
      backgroundColor:'lightgray',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:10
    },
    complated:{
      width:120,
      height:50,
      backgroundColor:'lightgray',
      flexDirection:'row',
      justifyContent:'center',
      alignItems: 'center',
      gap:5,
      borderRadius:10
    },
    img:{
      width:300,
      height:300,
    },
    imgView:{
      width:'100%',
      justifyContent:'center',
      alignItems:'center',
      marginTop:30,
      opacity: 0.8,
    }
 })