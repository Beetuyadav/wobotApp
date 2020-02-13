import React from 'react';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { SERVER_URL } from '../../../Config/Constants';

export const PASSWORD_REQUEST= 'PASSWORD_REQUEST';
export const PASSWORD_SUCCESS= 'PASSWORD_SUCCESS';
export const PASSWORD_FAIL= 'PASSWORD_FAIL';


export const changePassword = (oldpassword,newpassword) => async dispatch =>{
    const WTappId= await AsyncStorage.getItem('WTappId')
    const WTauthKey= await AsyncStorage.getItem('WTauthKey')
    try {
        dispatch({ type: PASSWORD_REQUEST });
         const url=SERVER_URL;
        const data = await axios({
            method: 'POST',
            url,
            headers:{'Content-Type': 'application/json'},
            data:{"old_password":oldpassword,"new_password":newpassword,"action":"changePasssword","appId": WTappId,"authKey": WTauthKey}
        }) ;

        dispatch({
            type: PASSWORD_SUCCESS,
            payload: data,
            });    
       
     }catch (error) {
        dispatch({
          type: PASSWORD_FAIL,
          payload: error,
        });
      }
}

