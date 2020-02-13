import React from 'react';
import { View, Text, TouchableOpacity, AsyncStorage, ScrollView, Image } from 'react-native';
import Styles from './Styles';
import Colors from '../Config/Colors';
import Toast from 'react-native-simple-toast';

export default class Drawer extends React.Component {

    state={
        username:'',
        name: '',
    }

    componentWillMount = async() =>{
      const email= await  AsyncStorage.getItem('WTUsername')
      const name= await  AsyncStorage.getItem('WTUname')
           this.setState({
               username: email,
               name: name
            })
    }

    render(){
        const { username, name } = this.state;
        return(
            <View style={Styles.container}>
            <View style={Styles.headview}> 
            <Image  style={Styles.logo}
            source={require('..//Images/wobot-logo.png')}></Image>
            <Text style={Styles.header}>{name}({username})</Text>
            </View>
             <View style={Styles.menuview}>
             <Image  style={Styles.smalllogo}
             source={require('..//Images/logo.png')}></Image>
             <TouchableOpacity onPress={()=> this.props.navigation.navigate('reportView')}>
             <Text style={Styles.menutext}>Report</Text>
             </TouchableOpacity>

             </View>
            
            </View>
        )
    }

}