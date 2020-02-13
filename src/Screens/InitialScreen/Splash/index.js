import React from 'react';
import { View, Text, AsyncStorage, Image, ImageBackground} from 'react-native';
import styles from './Styles';
import Loader from '../../../Components/Loader';

export default class Splash extends React.Component{
   
    componentDidMount = async() =>{
          const WTauthKey= await AsyncStorage.getItem('WTauthKey')
        setTimeout(()=>{
            if (WTauthKey == '' || WTauthKey == null) {
                this.props.navigation.navigate('Login')
            } else {
                this.props.navigation.navigate('Home')
            }
       
        },1500)
    }
render(){
    return(
        <View style={styles.container}>
        <View style={styles.logoView}>
        <View style={styles.logobg}>
        <Image   style={styles.logo}
         source={require('../../../Images/logo.png')}></Image>
        </View>
        </View>
        <View style={styles.bottomView}>
        <View style={styles.iconview}>
        <View style={styles.iconbackground}>
          <Image  style={styles.iconsize}
          source={require('../../../Images/settings.png')}></Image>
        </View>
        <View style={styles.iconbackground}>
          <Image  style={styles.charticon}
           source={require('../../../Images/chart.png')}></Image>
        </View>
        <View style={styles.iconbackground}>
          <Image  style={styles.markicon}
           source={require('../../../Images/mark.png')}></Image>
        </View>
        </View>
        <Text style={styles.bottomtext}>BOOST YOUR BUSINESS</Text>
        <View style={styles.bottomline}></View>
        </View>
        </View>
    )
}
}