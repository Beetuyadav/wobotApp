import React from 'react';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { SERVER_URL } from '../../../Config/Constants';

export const LOGIN_REQUEST= 'LOGIN_REQUEST';
export const LOGIN_SUCCESS= 'LOGIN_SUCCESS';
export const LOGIN_FAIL= 'LOGIN_FAIL';

export const FORGOT_REQUEST= 'FORGOT_REQUEST';
export const FORGOT_SUCCESS= 'FORGOT_SUCCESS';
export const FORGOT_FAIL= 'FORGOT_FAIL';

export const userLogin = (username,password) => async dispatch =>{
    const WTappId= await AsyncStorage.getItem('WTappId')
    const WTauthKey= await AsyncStorage.getItem('WTauthKey')
    try {
        dispatch({ type: LOGIN_REQUEST });
         const url=SERVER_URL;
        const data = await axios({
            method: 'POST',
            url,
            headers:{'Content-Type': 'application/json'},
            data:{"username": username, "password": password, "action":"appLogin"}
        }) ;

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data,
            });    
       
     }catch (error) {
        dispatch({
          type: LOGIN_FAIL,
          payload: error,
        });
      }
}

export const forgotPassword = (username) => async dispatch =>{
    
    try {
        dispatch({ type: FORGOT_REQUEST });
         const url=SERVER_URL;
        const data = await axios({
            method: 'POST',
            url,
            headers:{'Content-Type': 'application/json'},
            data:{}
        }) ;

        dispatch({
            type: FORGOT_SUCCESS,
            payload: data,
            });    
       
     }catch (error) {
        dispatch({
          type: FORGOT_FAIL,
          payload: error,
        });
      }
}
