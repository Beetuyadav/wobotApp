import React from 'react';
import { View, Text, ActivityIndicator, Platform } from 'react-native';
import styles from './Styles';

export default class Loader extends React.Component{
    render(){
        return(
            <View style={styles.container}>
            <View style={styles.loaderView}>
            <ActivityIndicator size={Platform.OS=='ios'? 0: 30}></ActivityIndicator>
            <Text style={styles.Loadingtext}>Loading...</Text>
            </View>
            </View>
        )
    }
}