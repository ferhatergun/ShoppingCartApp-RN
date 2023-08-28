import { View, Text, TouchableOpacity,FlatList} from 'react-native'
import React, { useEffect, useState,useRef } from 'react'
import { StyleSheet } from 'react-native'
import axios from 'axios'
import Product from '../components/Product'
import Pagination from '../components/Pagination'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

export default function Home({navigation})  {
    const user= useSelector((state)=>state.user.user)
    const token= useSelector((state)=>state.user.token)

    const [product,setProduct]= useState([])

    const [page,setPage] = useState(1)

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`https://demoapi.webudi.tech/api/products?page=${page}`, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`,
                },
            });              
    
           const result = await response.data
           setProduct(result.products.data)
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(()=>{
        if(token && user){
            fetchProduct()
            scrollToTop()
        }
  
    },[page,token,user])
    const numColumns = 2;
    const ItemSeparator = () => <View style={styles.separator} />
    const renderFooter = () => (<Pagination setPage={setPage} page={page} />)
    const flatListRef = useRef();
    
    const scrollToTop = () => {
        flatListRef?.current?.scrollToOffset({ offset: 0, animated: true});
      };

  return (
    <View style={styles.container}>
        {
            (user && token) ?
            <View style={styles.productContainer}>
                <FlatList 
                ref={flatListRef}
                style={{height:'100%'}}
                data={product}
                renderItem={({item})=>(
                    <Product item={item} />
                )}
                keyExtractor={item => item.id.toString()}
                numColumns={numColumns}
                ItemSeparatorComponent={ItemSeparator}
                ListFooterComponent={product.length > 0 && renderFooter}
                />
            </View>:
            <View><Text>Yükleniyor</Text></View>
        }
      
    </View>
  )
}

const styles=StyleSheet.create({
    container:{
        backgroundColor:'white',
        flex:1
    },
    productContainer: {
        display: 'flex',
        gap: 10,
        flex: 1,
    },
    separator: {
        height: 10,
        width:'100%'
    },
})