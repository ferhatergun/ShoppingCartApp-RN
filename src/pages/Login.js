import React,{useState} from 'react'
import { View ,Text,StyleSheet, Button,Image,ScrollView} from 'react-native'
import {  TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup';
import img from '../assets/login.png'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Register from './Register';
import { useDispatch } from 'react-redux';
import { updateToken } from '../redux/UserSlice';
import { updateUser } from '../redux/UserSlice';
import storage from '../storage'







export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation()
    const dispatch=useDispatch()


    const Login= async (values,setErrors)=>{
        console.log(values)
        // navigation.navigate("Home")
        const data={
            email:values.email,
            password:values.password
        }
        try{
            const response = await fetch("https://demoapi.webudi.tech/api/login",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
             }) 
             const result = await response.json(); // database den gelen mesaj 
             
            console.log(result)
            if(result.status == false){
                if(result.message=="Kullanıcıya ait kayıt bulunamadı!"){
                    setErrors({ email: 'Kayıtlı Kullanıcı Bulunamadı' })
                }
                if(result.message=="Parola Hatalı"){
                    setErrors({ password: 'Parola Hatalı' })
                }
            }
            else{
                if(result.message=="Giriş Başarılı")
                {
                    dispatch(updateToken(result.token))
                    dispatch(updateUser(result.user.uuid)) 
                     storage.save({
                        key:'user',
                        data:{
                            userId:result.user.uuid,
                            token:result.token
                        }
                    }) 
                    navigation.navigate("Home")
                }
            }
            
        }catch(e){
            console.log(e)
        }
        
    }


  return (
  
    <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imgView}>
            <Image source={img} style={styles.img} />
        </View>
        
        <View style={styles.content}>
            <Text style={styles.textHeader}>Login</Text>
            <Formik
            initialValues={{
                email:"",
                password:""
            }}
            validationSchema={
                yup.object({
                    email:yup.string().email("Lütfen Geçerli Bir Mail Giriniz( @ )").required("Email Boş Bırakilamaz"),
                    password:yup.string().min(8,"Şifre En Az 8 Karakterli Olmalıdır").required("Şifre Boş Bırakılamaz"),
                })
            }
            >
                {
                    ({values,errors,handleSubmit,handleChange,dirty,isSubmitting,touched,handleBlur,setErrors})=>(
                        <View style={styles.form}>
                               <View><TextInput
                                label="Email"
                                style={styles.Input}
                                value={values.email}
                                onChangeText={handleChange('email')}
                                mode='outlined'
                                error={errors.email && touched.email}
                                onBlur={handleBlur('email')}
                                
                                />
                                { touched.email &&
                                    <Text style={styles.error}>{errors.email}</Text>
                                }</View>
                                <View>
                                <TextInput
                                    label="Password"
                                    style={styles.Input}
                                    value={values.password}
                                    onChangeText={handleChange('password')}
                                    mode='outlined'
                                    secureTextEntry={true} // true false is text password
                                    error={errors.password && touched.password}
                                    onBlur={handleBlur('password')}

                                />
                                { touched.password &&
                                     <Text style={styles.error}>{errors.password}</Text>
                                }</View>
                               
                               {(Object.keys(errors).length > 0 || !Object.keys(touched).length) ?
                                    <Button title='Login' disabled />
                                    :
                                    <Button title='Login' onPress={() => Login(values, setErrors)} style={styles.loginBtn} color="#263238" />
                                }

                                
                            </View>
                        )}

                </Formik>
                <TouchableOpacity style={{marginTop:10}} onPress={()=>navigation.navigate('Register')}>
                    <Text>Tıkla Üye Ol</Text>
                </TouchableOpacity>
                

        
        </View>
    </ScrollView>
    
  )
}


const styles =StyleSheet.create({
    container:{
        backgroundColor:'white',
        flexGrow:1
    },
    content:{
        height:250,
        marginTop:20,
        alignItems:'center',
    },
    textHeader:{
        fontSize:20
    },
    Input:{
        width:'100%',
        height:50,
    },
    form:{
        width:'70%',
        minWidth:200,
        gap:15
    },
    error:{
        color:'red',
        fontSize:12,
        position:'absolute',
        top:58
    },
    img:{
        width:'80%',
        height:300
    },
    imgView:{
        width:'100%',
        height:280,
        alignItems:'center'
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    loginBtn:{
        backgroundColor:'black',
        color:'white'
    }
})