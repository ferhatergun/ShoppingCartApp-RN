import React ,{useEffect}from 'react';
import { Button, View ,Text, StyleSheet,TouchableOpacity} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import  IconFa  from 'react-native-vector-icons/Feather';
import Login from './src/pages/Login';
import Register from './src/pages/Register';
import Basket from './src/pages/Basket';
import Home from './src/pages/Home';
import ProductDetail from './src/pages/ProductDetail';
import store from './src/redux/store';
import { useSelector, useDispatch,Provider} from 'react-redux'
import storage from './src/storage';
import { updateToken, updateUser } from './src/redux/UserSlice';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();



function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown:true}}>
      <Stack.Screen name="Log In" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}

function BasketNavigator() {
  return (
    <Stack.Navigator 
      screenOptions={{headerTitle:'My Store',headerTitleAlign:'center'}}>
      <Stack.Screen name="Basket" component={Basket} />
    </Stack.Navigator>
  );
}

function ProductDetailNavigator({navigation,route}) {
  const item = route.params
  const basket = useSelector(state=>state.basket.basket)
  return (
    <Stack.Navigator screenOptions={{headerTitle:'My Store',headerRight:()=>(
      <TouchableOpacity style={styles.basket} onPress={()=>navigation.navigate("BasketNavigator")} >
        <Text><IconFa name='shopping-cart' size={20} /></Text>
        <Text style={styles.badge}>{basket.length}</Text>
      </TouchableOpacity>
    ),headerTitleAlign:'center',headerStyle:styles.header}}>
  
      <Stack.Screen name="ProductDetail" component={ProductDetail} initialParams={{ item: item }} />
    </Stack.Navigator>
  );
}




function DrawerNavigatorScreen({navigation}) {
  const user = useSelector((state)=>state.user?.user)
   const dispatch = useDispatch();
   const basket = useSelector(state=>state.basket.basket)


  useEffect(() => {
    storage.load({
      key: 'user',
    }).then(data => {
      dispatch(updateToken(data.token));
      dispatch(updateUser(data.userId)); 
      console.log(data)
    }); 
  }, [dispatch]); 

  return (
    <Drawer.Navigator initialRouteName="Home" 
    screenOptions={{headerTitle:'My Store',headerRight:()=>(
        <TouchableOpacity style={styles.basket} onPress={()=>navigation.navigate("BasketNavigator")}>
          <Text><IconFa name='shopping-cart' size={20} /></Text>
          <Text style={styles.badge}>{basket.length}</Text>

        </TouchableOpacity>)
    ,headerTitleAlign:'center',headerStyle:styles.header}}>

     {
      user ?
      <Drawer.Screen name="Home" component={Home} /> :
      <Drawer.Screen name="Login" component={AuthStack} options={{headerShown:false}} />
     }
         
         
    
    
   
  </Drawer.Navigator>
  );
}






export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="DrawerNavigator" component={DrawerNavigatorScreen} />
          <Stack.Screen name="BasketNavigator" component={BasketNavigator} />
          <Stack.Screen name='ProductDetailNavigator' component={ProductDetailNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}


const styles=StyleSheet.create({
  basket:{
    marginRight:15,
  },
  header:{
    backgroundColor:'white',
    borderBottomColor:'black',
    borderBottomWidth:1,
  },
  badge:{
    fontSize:12,
    position:'absolute',
    backgroundColor:'black',
    paddingLeft:5,
    paddingRight:5,
    color:'white',
    borderRadius:50,
    justifyContent: 'center',
    alignItems:'center',
    right: -10,
    top:-7
  }
})