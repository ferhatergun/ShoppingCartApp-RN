import { StyleSheet, Text, TouchableOpacity, View ,Keyboard} from 'react-native'
import React, { useState ,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { updateToken,updateUser } from '../redux/UserSlice'
import { useNavigation } from '@react-navigation/native'
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import { Avatar } from 'react-native-paper'
import  IconAn  from 'react-native-vector-icons/AntDesign'
import  IconFe from 'react-native-vector-icons/Feather'
import  IconFa5 from 'react-native-vector-icons/FontAwesome5'
import { TextInput } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler'
import axios from 'axios'
import { Toast,ALERT_TYPE } from 'react-native-alert-notification'


export default function Profile() { // useri kullanmak için JSON.parse yapmak lazım
    const user= JSON.parse(useSelector(state=>state.user.user))
    const token = useSelector(state=>state.user.token)
    console.log(user.name)
    const dispatch =useDispatch()
    const navigation= useNavigation()

    const loguot=async()=>{
      const data = await AsyncStorage.clear()
      dispatch(updateToken(false))
      dispatch(updateUser(false))
    }
    
    const [text, setText] = React.useState("");
    const [keyboardShown,setKeyboardShown]=useState(false)

    useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
          setKeyboardShown(true)
      });
    
      const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
        setKeyboardShown(false)
      });
    
      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
    }, []);

    const [name,setName] = useState((user).name)
    const [email,setEmail] = useState(user.email)
    const [password,setPassword] = useState("")
    const [passwordCheck,setPasswordCheck] = useState("")

    const [showName,setShowName] = useState(false)
    const [showEmail,setShowEmail] = useState(false)
    const [showPassword,setShowPassword] = useState(false)
    
    const changeName = async () => {
      try {
        const response = await axios.post(
          "https://demoapi.webudi.tech/api/update-profile",
          {
            name: name,
            email:user.email
          },
          {
            headers: {
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${token}`
            }
          }
        );
    
        const result = await response.data;
        console.log(result);
        dispatch(updateUser(JSON.stringify(result.user)))
        await AsyncStorage.setItem("user",JSON.stringify(result.user))
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Başarıyla Güncellendi',
          textBody: 'isim başarıyla güncellendi',
          autoClose:2000
      })
      } catch (error) {
        console.error(error);
      }
    };
    

    const changeEmail = async () => {
      try{
        const response = await axios.post("https://demoapi.webudi.tech/api/update-profile",{
          name:user.name,
          email:email
        },
        {
          headers:{
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
          }
        })
        const result = await response.data
        console.log(result)
        dispatch(updateUser(JSON.stringify(result.user)))
        await AsyncStorage.setItem("user",JSON.stringify(result.user))
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Başarıyla Güncellendi',
          textBody: 'email başarıyla güncellendi',
          autoClose:2000
      })
      }catch(e){
        console.log(e)
      }

    }

    const changePassword = async () => {
      try{
        const response = await axios.post("https://demoapi.webudi.tech/api/update-profile",{
          name:user.name,
          email:user.email,
          password:password,
          password_confirmation:passwordCheck
        },
        {
          headers:{
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
          }
        })
        const result = await response.data
        console.log(result)
        dispatch(updateUser(JSON.stringify(result.user)))
        await AsyncStorage.setItem("user",JSON.stringify(result.user))
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Başarıyla Güncellendi',
          textBody: 'şifre başarıyla güncellendi',
          autoClose:2000
      })
      }catch(e){
        console.log(e)
      }

    }
  return (
  <ScrollView contentContainerStyle={{flexGrow:1}}>
    <View style={[styles.container, keyboardShown ? styles.padding : null]}>
      <View style={styles.header}></View>
      <View style={styles.content}>
        <View style={styles.imgView}>
          <Avatar.Image size={90} source={require('../assets/avatar.png')} />
        </View>
        <View style={styles.acordionView}>
          <Text style={{fontSize:18,marginBottom:5}}>Mustafa</Text>
            <Collapse>
          <CollapseHeader>
            <View style={styles.acordionHeader}>
              <IconAn name='setting' size={20} />
              <Text>Setting</Text>
            </View>
          </CollapseHeader>
          <CollapseBody>
            <View style={styles.acordionBody}>
                <View style={styles.updateInput}>
                  <TextInput
                    label="Name"
                    value={name}
                    onChangeText={text => setName(text)}
                    style={styles.input}
                    mode='outlined'
                    disabled = {showName ? false : true}
                  />
                  {
                    showName ? 
                    <TouchableOpacity style={styles.editBtn} onPress={()=>changeName()}>
                      <IconFe name='send' size={20} color='white'  />
                    </TouchableOpacity> :

                    <TouchableOpacity style={styles.editBtn} onPress={()=>setShowName(true)}>
                     <IconFa5 name='pen' size={20} color='white'  />
                    </TouchableOpacity>

                  }
                  
              </View>

              <View style={styles.updateInput}>
                  <TextInput
                    label="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                    mode='outlined'
                    disabled = {showEmail ? false : true}
                  />
                  {
                    showEmail ? 
                    <TouchableOpacity style={styles.editBtn} onPress={()=>changeEmail()}>
                      <IconFe name='send' size={20} color='white'  />
                    </TouchableOpacity> :

                    <TouchableOpacity style={styles.editBtn} onPress={()=>setShowEmail(true)}>
                     <IconFa5 name='pen' size={20} color='white'  />
                    </TouchableOpacity>

                  }
              </View>

              <View style={styles.updateInput}>
                <View>
                  <TextInput
                    label="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    mode='outlined'
                    disabled = {showPassword ? false : true}
                  />
                  <TextInput
                    label="Password Check"
                    value={passwordCheck}
                    onChangeText={text => setPasswordCheck(text)}
                    style={styles.input}
                    mode='outlined'
                    disabled = {showPassword ? false : true}
                  /></View>
                  {
                    showPassword ? 
                    <TouchableOpacity style={styles.editBtn} onPress={()=>changePassword()}>
                      <IconFe name='send' size={20} color='white'  />
                    </TouchableOpacity> :

                    <TouchableOpacity style={styles.editBtn} onPress={()=>setShowPassword(true)}>
                     <IconFa5 name='pen' size={20} color='white'  />
                    </TouchableOpacity>

                  }
              </View>
            </View>
          </CollapseBody>
        </Collapse>
        </View>
      </View>
      


      <TouchableOpacity style={styles.logout} onPress={loguot}>
          <IconFe name='log-out' size={20} />
      </TouchableOpacity>
     
    </View> 
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
  },
  padding:{
    paddingBottom:100
  },
  header:{
    height:'15%',
    backgroundColor:'rebeccapurple'
  },
  content:{
    height:'85%',
    // backgroundColor:'red',
  },
  imgView:{
    position:'absolute',
    right:'38%',
    top:-45,
    zIndex:5
  },
  acordionView:{
    marginTop:50,
    alignItems:'center'
  },
  acordionHeader:{
    width:300,
    backgroundColor:'#F1F2F3',
    flexDirection:'row',
    borderRadius:10,
    padding:10,
    gap:20,
    height:40,
    alignItems: 'center',
  },
  logout:{
    position:'absolute',
    right:10,
    top:10,
    backgroundColor:'lightgray',
    padding:10,
    borderRadius:10
  },
  acordionBody:{
    // backgroundColor:'yellow',
    marginTop:10,
    gap:10,
  },
  input:{
    width:200,
    backgroundColor:'transparent'
  },
  updateInput:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems: 'flex-start',
    backgroundColor:'#F1F2F3',
    padding:10,
    borderRadius:10
  },
  editBtn:{
    padding:10,
    backgroundColor:'rebeccapurple',
    marginRight:12,
    borderRadius:10,
    justifyContent: 'center',
    marginTop:5
  }
})