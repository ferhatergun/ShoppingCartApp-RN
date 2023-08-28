import React ,{useEffect}from 'react';
import { Button, View ,Text, StyleSheet,TouchableOpacity,StatusBar} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import  IconFa  from 'react-native-vector-icons/Feather';
import  IconAn  from 'react-native-vector-icons/AntDesign';
import  IconEn  from 'react-native-vector-icons/Entypo';
import  IconIo  from 'react-native-vector-icons/Ionicons';
import  IconMı  from 'react-native-vector-icons/MaterialIcons';
import Login from './src/pages/Login';
import Register from './src/pages/Register';
import Basket from './src/pages/Basket';
import Home from './src/pages/Home';
import ProductDetail from './src/pages/ProductDetail';
import store from './src/redux/store';
import { useSelector, useDispatch,Provider} from 'react-redux'
import { updateToken, updateUser } from './src/redux/UserSlice';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './src/pages/Profile';
import 'react-native-gesture-handler'
import { storage } from './src/storage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator()



function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown:true}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}


function ProductDetailNavigator({navigation,route}) {
  const item = route.params
  const basket = useSelector(state=>state.basket.basket)
  return (
    <Stack.Navigator screenOptions={{headerTitle:'Ferhat Shop',headerRight:()=>(
      <TouchableOpacity style={styles.basket} onPress={()=>navigation.navigate("Basket")} >
        <Text><IconFa name='shopping-cart' size={20} /></Text>
        <Text style={styles.badge}>{basket.length}</Text>
      </TouchableOpacity>
    ),headerTitleAlign:'center',headerStyle:styles.header}}>
  
      <Stack.Screen name="ProductDetail" component={ProductDetail} initialParams={{ item: item }} />
    </Stack.Navigator>
  );
}



const MainNavigator=()=>{
  const dispatch = useDispatch();
  const user =useSelector(state=>state.user.user)
  const token =useSelector(state=>state.user.token)
  const basket =useSelector(state=>state.basket.basket)
  const navigation =useNavigation()

  useEffect(() => {
    const fetchData =  () => {
      try {
        const user =  storage.getString("user")
        const token =  storage.getString("token")

        dispatch(updateUser(user));
        dispatch(updateToken(token));
      } catch (error) {
        console.error("Veri yükleme hatası:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return(
    <>{
      user && token ? 
      <Tab.Navigator 
        screenOptions={{
          headerTitle:'Ferhat Shop',
          headerTitleAlign:'center',
          headerStyle:styles.header,
          tabBarActiveTintColor:'rebeccapurple',
          tabBarInactiveTintColor:'gray',
          tabBarStyle:styles.tabbar,
          // tabBarLabelStyle:styles.tabbarLabel,
          tabBarIconStyle:styles.Icon,
          tabBarShowLabel:false,
          
        }}
        
      >
        <Tab.Screen 
          name='Home' 
          component={Home} 
          options={{tabBarIcon:({color})=><IconIo name='home' size={20} color={color} />}} />
        <Tab.Screen 
          name='Basket' 
          component={Basket} 
          options={{tabBarIcon:({color})=><>
          <IconMı name='shopping-cart' size={22} color={color}/>
          {
            basket.length>0 &&
            <Text style={styles.badgeTabbar}>{basket.length}</Text>
          }
          
          </>}} />
        <Tab.Screen 
          name='Profile' 
          component={Profile} 
          options={{tabBarIcon:({color})=><IconIo name='person' size={20} color={color} />}} />
      </Tab.Navigator>
      : 
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='Welcome Ferhat Shop' component={AuthStack}/>
      </Stack.Navigator>
    }
      
    </>
  )
}





export default function App() {
  return (
    <Provider store={store}>
      <AlertNotificationRoot theme='dark'>
        <StatusBar barStyle="default"/>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="main" component={MainNavigator} />
            <Stack.Screen name='ProductDetailNavigator' component={ProductDetailNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </AlertNotificationRoot>
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
    backgroundColor:'rebeccapurple',
    paddingLeft:5,
    paddingRight:5,
    color:'white',
    borderRadius:50,
    justifyContent: 'center',
    alignItems:'center',
    right: -10,
    top:-7
  },
  tabbarLabel:{
    marginBottom:11,
  },
  tabbar:{
    height:60
  },
  badgeTabbar:{
    fontSize:12,
    position:'absolute',
    backgroundColor:'rebeccapurple',
    paddingLeft:5,
    paddingRight:5,
    color:'white',
    borderRadius:50,
    justifyContent: 'center',
    alignItems:'center',
    right:45,
    top:10
  }
})