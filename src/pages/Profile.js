import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
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





export default function Profile() { // useri kullanmak için JSON.parse yapmak lazım
    const user= useSelector(state=>state.user.user)
    console.log(user)
    const dispatch =useDispatch()
    const navigation= useNavigation()

    const loguot=async()=>{
      const data = await AsyncStorage.clear()
      dispatch(updateToken(false))
      dispatch(updateUser(false))
    }
    
    const [text, setText] = React.useState("");


 
  return (
    <View style={styles.container}>
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
                    value={text}
                    onChangeText={text => setText(text)}
                    style={styles.input}
                    mode='outlined'
                    // disabled
                  />
                  <View style={styles.editBtn}>
                    <IconFa5 name='pen' size={20} color='white'/>
                </View>
              </View>

              <View style={styles.updateInput}>
                  <TextInput
                    label="Email"
                    value={text}
                    onChangeText={text => setText(text)}
                    style={styles.input}
                    mode='outlined'
                    // disabled
                  />
                  <View style={styles.editBtn}>
                    <IconFa5 name='pen' size={20} color='white'/>
                </View>
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
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    // backgroundColor:'red',
    backgroundColor:'white'
  },
  header:{
    flex:1,
    backgroundColor:'rebeccapurple'
  },
  content:{
    flex:6,
    // backgroundColor:'white'
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
    // backgroundColor:'red',
    height:300,
    marginTop:10,
    gap:10
  },
  input:{
    width:200,
  },
  updateInput:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems: 'flex-end',
    // backgroundColor:'red'
  },
  editBtn:{
    padding:10,
    backgroundColor:'rebeccapurple',
    marginRight:12,
    borderRadius:10,
    justifyContent: 'center',
    height:50
  }
})