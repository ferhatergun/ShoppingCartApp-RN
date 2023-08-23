import { View, Text ,FlatList,TouchableOpacity ,StyleSheet} from 'react-native'
import React ,{useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BasketListProduct from '../components/BasketListProduct'
import  IconIo  from 'react-native-vector-icons/Ionicons'
import  IconMc  from 'react-native-vector-icons/MaterialCommunityIcons'
import { removeAll } from '../redux/BasketSlice'


export default function Basket() {
  const dispatch = useDispatch()
  const basket = useSelector(state=>state.basket.basket)
  const [total,setTotal]=useState(0)
  console.log(basket)

  useEffect(() => {
    // Sepetteki ürünlerin toplam fiyatını hesapla
    const calculatedTotal = basket.reduce((accumulator, item) => {
      return accumulator + item.pcs * item.product.price;
    }, 0);
    
    setTotal(calculatedTotal);
  }, [basket]);
  return (
    <View style={styles.container}>
      <View style={styles.list}>
        {
          basket.length > 0 ?
            <FlatList 
          data={basket}
          keyExtractor={(item)=>item.product.id}
          renderItem={(item)=><BasketListProduct item={item.item}/>}
          />:<Text>boş</Text>
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
          <TouchableOpacity style={styles.complated}>
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
    }
 })