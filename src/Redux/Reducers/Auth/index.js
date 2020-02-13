import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL,
         FORGOT_REQUEST, FORGOT_SUCCESS, FORGOT_FAIL } from '../../Actions/Auth';
 inisialstate={
isFetching: false,
response: null,
forgotres: null,
 }
export default (state=inisialstate,action) =>{
     switch (action.type) {
         case LOGIN_REQUEST:
             return{
           ...state,
           isFetching: true,
          }
         case LOGIN_SUCCESS:
          return{
          ...state,
          isFetching: false,
          response: action.payload
         }
        case LOGIN_FAIL:
          return{
          ...state,
          isFetching: false,
          response: action.payload
         }
         case FORGOT_REQUEST:
             return{
           ...state,
           isFetching: true,
          }
         case FORGOT_SUCCESS:
          return{
          ...state,
          isFetching: false,
          forgotres: action.payload
         }
        case FORGOT_FAIL:
          return{
          ...state,
          isFetching: false,
          forgotres: action.payload
         }
        default:
             return state;
     }
}