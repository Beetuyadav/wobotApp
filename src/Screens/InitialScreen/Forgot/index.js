import React from 'react';
import { View, Text, AsyncStorage, TextInput, TouchableOpacity, Image } from 'react-native';
import styles from './Styles';
import Colors from '../../../Config/Colors';
export default class Forgot extends React.Component{

    getLogin = () => {
        this.props.navigation.navigate('Login')
    }
render(){
    return(
        <View style={styles.container}>
       
        <View style={styles.mainview}>
        <Image  style={styles.logo}
        source={require('../../../Images/wobot-logo.png')}></Image>
        <Text style={styles.heading}>Enter your Username / Email / Mobile detail  </Text>
        <Text style={styles.heading}>Below to reset your password </Text>
        <TextInput placeholder='Username / Email / Mobile' placeholderTextColor= {Colors.primary} style={styles.textinput}></TextInput>
        <View style={styles.buttonview}>
        <TouchableOpacity onPress={this.getLogin}>
        <View style={styles.button}>
        <Text style={styles.buttontext}>Cancel</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.getSend}>
        <View style={styles.button}>
        <Text style={styles.buttontext}>Send</Text>
        </View>
        </TouchableOpacity>
        </View>
        </View>
        </View>
    )
}
}