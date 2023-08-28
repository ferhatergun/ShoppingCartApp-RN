import React,{useState} from 'react'
import { View ,Text,StyleSheet, Button,Image,ScrollView} from 'react-native'
import {  TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup';
import img from '../assets/register.png'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';






export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation()

    const Register= async (values,setErrors)=>{

        const data={
            name:values.name,
            email:values.email,
            password:values.password,
            password_confirmation:values.trypassword
        }
        try{
            const response = await fetch("https://demoapi.webudi.tech/api/register",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
             }) 
             const result = await response.json(); // database den gelen mesaj 
             
            console.log(result)  
            if(result.status == true){
                // redux ile user id token saklaması yapıp Login atacağız
                navigation.navigate("Login")
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
            <Text style={styles.textHeader}>Register</Text>
            <Formik
            initialValues={{
                email:"",
                password:"",
                name:"",
                trypassword:""
            }}
            validationSchema={
                yup.object({
                    name:yup.string().required("isim boş bırakılamaz"),
                    email:yup.string().email("Lütfen Geçerli Bir Mail Giriniz( @ )").required("Email Boş Bırakilamaz"),
                    password:yup.string().min(8,"Şifre En Az 8 Karakterli Olmalıdır").required("Şifre Boş Bırakılamaz"),
                    trypassword:yup.string().min(8,"Şifre En Az 8 Karakterli Olmalıdır").oneOf([yup.ref('password')], 'Şifreler Uyuşmuyor').required("Şifre Tekrarı Boş Bırakılamaz"),
                })
            }
            onSubmit={(values)=>{ // form submit olduktan sonra yapılacaklar

                    console.log(values)
                }}
            >
                {
                    ({values,errors,handleSubmit,handleChange,dirty,isSubmitting,touched,handleBlur,setErrors})=>(
                        <View style={styles.form}>
                                <View><TextInput
                                label="Name"
                                style={styles.Input}
                                value={values.name}
                                onChangeText={handleChange('name')}
                                mode='outlined'
                                error={errors.name && touched.name}
                                onBlur={handleBlur('name')}
                                />
                                { touched.name &&
                                    <Text style={styles.error}>{errors.name}</Text>
                                }</View>
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
                                
                                <View><TextInput
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
                                <View><TextInput
                                label="password try"
                                style={styles.Input}
                                value={values.trypassword}
                                onChangeText={handleChange('trypassword')}
                                mode='outlined'
                                error={errors.trypassword && touched.trypassword}
                                onBlur={handleBlur('trypassword')}
                                />
                                { touched.trypassword &&
                                    <Text style={styles.error}>{errors.trypassword}</Text>
                                }</View>
                               
                                {
                                    (Object.keys(errors).length > 0 || !Object.keys(touched).length) ?
                                     <Button title='Register' disabled />:
                                     <Button title='Register' onPress={()=>Register(values,setErrors)} style={styles.RegisterBtn} color="#663399"  />
                                }
                                
                            </View>
                        )}

                </Formik>
                <TouchableOpacity style={{marginTop:10}} onPress={()=>navigation.navigate('Login')}>
                    <Text>Have an account? Log in</Text>
                </TouchableOpacity>
        </View>
    </ScrollView> 
    
  )
}


const styles =StyleSheet.create({
    container:{
        // backgroundColor:'yellow',
        flexGrow:1,
        paddingBottom:150
        
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
    RegisterBtn:{
        backgroundColor:'black',
        color:'white'
    }
})