import React from 'react';
import { StyleSheet } from 'react-native';
import Colors from '../Config/Colors';

export default StyleSheet.create({
    container:{
        height: '100%'
    },
    headview: {
    backgroundColor: Colors.lightgrey
    },
    menuview:{ 
        flexDirection: 'row',
        padding: 10,
        marginLeft: 10,
        marginTop:10
    },
    menutext: { 
        marginLeft: 15,
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.primary
     },
     header:{
         marginLeft: 20,
         marginVertical: 30,
         color: Colors.black,
         fontSize: 20,
         fontWeight: 'bold'
     },
     logo: {
        width: 180,
        height: 50,
        marginTop: 50,
        marginLeft: 20,
        marginBottom:20
        },
        smalllogo: {
            width: 60,
            height: 25,
            },   
})