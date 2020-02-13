import { NOTIFICATION_REQUEST, NOTIFICATION_SUCCESS, NOTIFICATION_FAIL,
         NOTIFI_MARK_REQUEST, NOTIFI_MARK_SUCCESS, NOTIFI_MARK_FAIL} from '../../Actions/Notification';
     inisialstate={
    isFetching: false,
    response: null,
    markres: null,
     }
    export default (state=inisialstate,action) =>{
         switch (action.type) {
             case NOTIFICATION_REQUEST:
                 return{
               ...state,
               isFetching: true,
              }
             case NOTIFICATION_SUCCESS:
              return{
              ...state,
              isFetching: false,
              response: action.payload
             }
            case NOTIFICATION_FAIL:
              return{
              ...state,
              isFetching: false,
              response: action.payload
             }
             case NOTIFI_MARK_REQUEST:
                 return{
               ...state,
               isFetching: true,
              }
             case NOTIFI_MARK_SUCCESS:
              return{
              ...state,
              isFetching: false,
              markres: action.payload
             }
            case NOTIFI_MARK_FAIL:
              return{
              ...state,
              isFetching: false,
              markres: action.payload
             }
            default:
                 return state;
         }
    }