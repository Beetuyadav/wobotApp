import React from 'react';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { SERVER_URL } from '../../../Config/Constants';

export const JOB_COUNT_REQUEST= 'JOB_COUNT_REQUEST';
export const JOB_COUNT_SUCCESS= 'JOB_COUNT_SUCCESS';
export const JOB_COUNT_FAIL= 'JOB_COUNT_FAIL';

export const JOB_REQUEST= 'JOB_REQUEST';
export const JOB_SUCCESS= 'JOB_SUCCESS';
export const JOB_FAIL= 'JOB_FAIL';


export const jobCount = () => async dispatch =>{
    const WTappId= await AsyncStorage.getItem('WTappId')
    const WTauthKey= await AsyncStorage.getItem('WTauthKey')
    try {
        dispatch({ type: JOB_COUNT_REQUEST });
         const url=SERVER_URL;
        const data = await axios({
            method: 'POST',
            url,
            headers:{'Content-Type': 'application/json'},
            data:{"action":"fetchJobCounts","appId": WTappId,"authKey": WTauthKey}
        }) ;

        dispatch({
            type: JOB_COUNT_SUCCESS,
            payload: data,
            });    
       
     }catch (error) {
        dispatch({
          type: JOB_COUNT_FAIL,
          payload: error,
        });
      }
}

export const getJobs = (page,tasktype) => async dispatch =>{    

    const WTappId= await AsyncStorage.getItem('WTappId')
    const WTauthKey= await AsyncStorage.getItem('WTauthKey')
    // const jobType = tasktype === 'Open' ? 0 :1;

    try {
        dispatch({ type: JOB_REQUEST });
         const url=SERVER_URL;
        const data = await axios({
            method: 'POST',
            url,
            headers:{'Content-Type': 'application/json'},
            data:{"action":"fetchAllTicketingJobs","appId": WTappId,"authKey": WTauthKey,"page":page,"job_status_type" :tasktype }
        }) ;

        dispatch({
            type: JOB_SUCCESS,
            payload: data,
            });    
       
     }catch (error) {
        dispatch({
          type: JOB_FAIL,
          payload: error,
        });
      }
}

