import React from 'react';
import { View, Text, Image, AsyncStorage, TextInput, ScrollView, TouchableOpacity, StyleSheet, NetInfo } from 'react-native';
import styles from './Styles';
import Colors from '../../../Config/Colors';
import Toast from 'react-native-simple-toast';
import Icon from "react-native-vector-icons/Ionicons";
import { changePassword } from '../../../Redux/Actions/Password';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Loader from '../../../Components/Loader';

class ChangePassword extends React.Component{
    state={
        currentpassword: '',
        newpassword: '',
        confirmpassword: '',
    }
    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'Change Password',
        drawerLabel: 'Change Password',
        headerTintColor: Colors.white,
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerLeft: (
          <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
          <Image style={{width: 22, height: 22, marginLeft: 20}} source={require('../../../Images/back.png')}></Image>
          </TouchableOpacity>
        ),
      })
    goRegister = () =>{
        const { currentpassword, newpassword, confirmpassword} = this.state;
        if (currentpassword == '' || newpassword == '' || confirmpassword == '') {
                Toast.show('All Field is mandatory', Toast.SHORT);
        } else if(newpassword != confirmpassword){
            Toast.show('Password and confirm password must be same', Toast.SHORT);
        }else {
            if (NetInfo.isConnected) {
                this.props.changePassword( currentpassword, newpassword);
               } else {
                Toast.show('Please check your connectivity') 
               }
        }
    }
    
      componentWillReceiveProps = (nextprops)=>{
        console.log(nextprops)
        try {
    
          if(nextprops.Response.Password.isFetching == false){
            if (nextprops.Response.Password.response.data.status == 1) {
               
                Toast.show(nextprops.Response.Password.response.data.message)
                AsyncStorage.clear()
                this.props.navigation.navigate('Login')

            } else {
               Toast.show(nextprops.Response.Password.response.data.message)
            }
            }
          
        } catch (error) {
          Toast.show('Error '+error)
        }
       }
   
render(){
  
    if(this.props.Response.Password.isFetching){
      return(
          <Loader/>
      )
   }
    return(
        
        <View style={styles.container}>
        <ScrollView>
        <View style={styles.mainview}>

        <TextInput 
        placeholder='Current Password' 
        placeholderTextColor= {Colors.primary} 
        onChangeText={text=>this.setState({currentpassword: text})}
        style={styles.textinput}></TextInput>
        
        <TextInput 
        placeholder='New Password' 
        placeholderTextColor= {Colors.primary} 
        onChangeText={text=>this.setState({newpassword: text})}
        style={styles.textinput}></TextInput>

        <TextInput 
        placeholder='Confirm Password' 
        placeholderTextColor= {Colors.primary} 
        onChangeText={text=>this.setState({confirmpassword: text})}
        style={styles.textinput}></TextInput>
       
        <TouchableOpacity onPress={this.goRegister}>
        <View style={styles.button}>
        <Text style={styles.buttontext}>Change</Text>
        </View>
        </TouchableOpacity>
       
        </View>
        </ScrollView>
        </View>
       
    )
    }
}

ChangePassword.propTypes ={
    changePassword: propTypes.func.isRequired,
    Response: propTypes.object.isRequired
  }
  
  const mapStateToProps = (state) => {
    return{
    Response: state
   }
  }
  
  const dispatchStateToProps = {changePassword}
  
  export default connect(mapStateToProps,dispatchStateToProps)(ChangePassword)