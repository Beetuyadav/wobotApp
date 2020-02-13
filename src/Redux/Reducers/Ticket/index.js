import { TICKET_REQUEST, TICKET_SUCCESS, TICKET_FAIL,} from '../../Actions/Ticket';
     inisialstate={
    isFetching: false,
    response: null,
   
     }
    export default (state=inisialstate,action) =>{
         switch (action.type) {
             case TICKET_REQUEST:
                 return{
               ...state,
               isFetching: true,
              }
             case TICKET_SUCCESS:
              return{
              ...state,
              isFetching: false,
              response: action.payload
             }
            case TICKET_FAIL:
              return{
              ...state,
              isFetching: false,
              response: action.payload
             }
            
            default:
                 return state;
         }
    }