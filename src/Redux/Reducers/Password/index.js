import { PASSWORD_REQUEST, PASSWORD_SUCCESS, PASSWORD_FAIL,} from '../../Actions/Password';
     inisialstate={
    isFetching: false,
    response: null,
   
     }
    export default (state=inisialstate,action) =>{
         switch (action.type) {
             case PASSWORD_REQUEST:
                 return{
               ...state,
               isFetching: true,
              }
             case PASSWORD_SUCCESS:
              return{
              ...state,
              isFetching: false,
              response: action.payload
             }
            case PASSWORD_FAIL:
              return{
              ...state,
              isFetching: false,
              response: action.payload
             }
            
            default:
                 return state;
         }
    }