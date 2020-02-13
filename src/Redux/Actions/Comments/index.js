import React from 'react';
import { SERVER_URL } from '../../../Config/Constants';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
export const COMMENT_REQUEST= 'COMMENT_REQUEST';
export const COMMENTS_REQUEST= 'COMMENTS_REQUEST';
export const COMMENTS_SUCCESS= 'COMMENTS_SUCCESS';
export const COMMENTS_FAIL= 'COMMENTS_FAIL';

export const readFlieArray = (array) =>  dispatch =>{
        dispatch({
            type: COMMENT_REQUEST,
            payload: array,
            });    
}

export const getComments = (jobid) => async dispatch =>{
    const WTappId= await AsyncStorage.getItem('WTappId')
    const WTauthKey= await AsyncStorage.getItem('WTauthKey')
    try {
        dispatch({ type: COMMENTS_REQUEST });
         const url=SERVER_URL;
        const data = await axios({
            method: 'POST',
            url,
            headers:{'Content-Type': 'application/json'},
            data:{"action":"fetchComments","room_type": "3","appId": WTappId,"authKey": WTauthKey,"type_id":jobid}
        }) ;

        dispatch({
            type: COMMENTS_SUCCESS,
            payload: data,
            });    
       
     }catch (error) {
        dispatch({
          type: COMMENTS_FAIL,
          payload: error,
        });
      }
}
