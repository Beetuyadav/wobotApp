import React from 'react';
import { View, Text, AsyncStorage, TextInput, TouchableOpacity, Image, NetInfo } from 'react-native';
import styles from './Styles';
import Colors from '../../../Config/Colors';
import Toast from 'react-native-simple-toast';
import Loader from '../../../Components/Loader';
import { connect } from 'react-redux';
import { userLogin } from '../../../Redux/Actions/Auth';
import propTypes from 'prop-types';

class Login extends React.Component{
    state={
        username: '',
        password: '',
    }
    getSignin = () => {
        const { username, password } = this.state;
        if (username == '' || password == '') {
            Toast.show('Please enter credentials')
        } else {
           if (NetInfo.isConnected) {
            this.props.userLogin(username,password) 
           } else {
            Toast.show('Please check your connectivity') 
           }
            
        }
       
    }

    componentWillReceiveProps = (nextprops)=>{
     console.log(nextprops)
     try {

        if(nextprops.Response.Auth.isFetching == false){
            if (nextprops.Response.Auth.response.data.status == 1) {
               
               AsyncStorage.setItem('WTUsername',nextprops.Response.Auth.response.data.user[0].username)
               AsyncStorage.setItem('WTappId',nextprops.Response.Auth.response.data.user[0].appId)
               AsyncStorage.setItem('WTauthKey',nextprops.Response.Auth.response.data.user[0].authKey)
               AsyncStorage.setItem('WTUroleid',nextprops.Response.Auth.response.data.user[0].role_id)
               AsyncStorage.setItem('WTUname',nextprops.Response.Auth.response.data.user[0].name)
               Toast.show(nextprops.Response.Auth.response.data.message)
               this.props.navigation.navigate('Home')
            } else {
               Toast.show(nextprops.Response.Auth.response.data.message)
            }
            }
         
     } catch (error) {
        Toast.show('Error '+error) 
     }
    }
  
    getForgot = () => {
        this.props.navigation.navigate('Forgot')
    }
render(){
     if(this.props.Response.Auth.isFetching){
         return(
             <Loader/>
         )
     }
    return(
        <View style={styles.container}>
        <View style={styles.mainview}>
        <Image  style={styles.logo}
        source={require('../../../Images/wobot-logo.png')}></Image>
        <TextInput 
         placeholder='Username' 
         inlineImageLeft='user'
         inlineImagePadding= {50}
         placeholderTextColor= {Colors.primary} 
         onChangeText={text=> this.setState({username: text})}
         style={styles.textinput}></TextInput>

        <TextInput 
        placeholder='Password' 
        inlineImageLeft='lock'
        secureTextEntry={true}
        inlineImagePadding= {50}
        placeholderTextColor= {Colors.primary} 
        onChangeText={text=> this.setState({password: text})}
        style={styles.textinput}></TextInput>

       
        <TouchableOpacity onPress={this.getSignin}>
        <View style={styles.button}>
        <Text style={styles.buttontext}>SignIn</Text>
        </View>
        </TouchableOpacity>
       
        <TouchableOpacity onPress={this.getForgot}>
        <Text style={styles.forgottext}>Forgot Password?</Text>
        </TouchableOpacity>
        </View>
        </View>
    )
}
}

Login.propTypes ={
    userLogin: propTypes.func.isRequired,
    Response: propTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return{
    Response: state
   }
}

const dispatchStateToProps = {userLogin}

export default connect(mapStateToProps,dispatchStateToProps)(Login)