import React from 'react';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { SERVER_URL } from '../../../Config/Constants';

export const TICKET_REQUEST= 'TICKET_REQUEST';
export const TICKET_SUCCESS= 'TICKET_SUCCESS';
export const TICKET_FAIL= 'TICKET_FAIL';


export const addTicket = () => async dispatch =>{
    const WTappId= await AsyncStorage.getItem('WTappId')
    const WTauthKey= await AsyncStorage.getItem('WTauthKey')
    try {
        dispatch({ type: TICKET_REQUEST });
         const url=SERVER_URL;
        const data = await axios({
            method: 'POST',
            url,
            headers:{'Content-Type': 'application/json'},
            data:{"activity_title":"test123","region":"9","city":"13","issue":"4","sub_issue":"5","action":"addTicketingJob",
            "room_type":"3","type_id":"2","remark":"sjjhidhui","appId": WTappId,"authKey": WTauthKey}
        }) ;

        dispatch({
            type: TICKET_SUCCESS,
            payload: data,
            });    
       
     }catch (error) {
        dispatch({
          type: TICKET_FAIL,
          payload: error,
        });
      }
}


