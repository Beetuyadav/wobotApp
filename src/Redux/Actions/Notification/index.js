import React from 'react';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { SERVER_URL } from '../../../Config/Constants';

export const NOTIFICATION_REQUEST= 'NOTIFICATION_REQUEST';
export const NOTIFICATION_SUCCESS= 'PASSWORD_SUCCESS';
export const NOTIFICATION_FAIL= 'PASSWORD_FAIL';

export const NOTIFI_MARK_REQUEST= 'NOTIFI_MARK_REQUEST';
export const NOTIFI_MARK_SUCCESS= 'NOTIFI_MARK_SUCCESS';
export const NOTIFI_MARK_FAIL= 'NOTIFI_MARK_FAIL';


export const fetchNotification = () => async dispatch =>{
    const WTappId= await AsyncStorage.getItem('WTappId')
    const WTauthKey= await AsyncStorage.getItem('WTauthKey')
    try {
        dispatch({ type: NOTIFICATION_REQUEST });
         const url=SERVER_URL;
        const data = await axios({
            method: 'POST',
            url,
            headers:{'Content-Type': 'application/json'},
            data:{"action":"fetchTicketingNotifications","appId": WTappId,"authKey": WTauthKey}
        }) ;

        dispatch({
            type: NOTIFICATION_SUCCESS,
            payload: data,
            });    
       
     }catch (error) {
        dispatch({
          type: NOTIFICATION_FAIL,
          payload: error,
        });
      }
}

export const markNotification = () => async dispatch =>{
    const WTappId= await AsyncStorage.getItem('WTappId')
    const WTauthKey= await AsyncStorage.getItem('WTauthKey')
   
    try {
        dispatch({ type: NOTIFI_MARK_REQUEST });
         const url=SERVER_URL;
        const data = await axios({
            method: 'POST',
            url,
            headers:{'Content-Type': 'application/json'},
            data:{"action":"markAllViewed","appId": WTappId,"authKey": WTauthKey}
        }) ;

        dispatch({
            type: NOTIFI_MARK_SUCCESS,
            payload: data,
            });    
       
     }catch (error) {
        dispatch({
          type: NOTIFI_MARK_FAIL,
          payload: error,
        });
      }
}

