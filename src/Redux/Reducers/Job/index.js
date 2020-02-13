import { JOB_COUNT_REQUEST, JOB_COUNT_SUCCESS, JOB_COUNT_FAIL,
JOB_REQUEST, JOB_SUCCESS, JOB_FAIL } from '../../Actions/Job';
 inisialstate={
isFetching: false,
response: null,
jobs: null,
 }
export default (state=inisialstate,action) =>{
     switch (action.type) {
         case JOB_COUNT_REQUEST:
             return{
           ...state,
           isFetching: true,
          }
         case JOB_COUNT_SUCCESS:
          return{
          ...state,
          isFetching: false,
          response: action.payload
         }
        case JOB_COUNT_FAIL:
          return{
          ...state,
          isFetching: false,
          response: action.payload
         }
         case JOB_REQUEST:
         return{
        ...state,
        isFetching: true,
        }
        case JOB_SUCCESS:
        return{
        ...state,
        isFetching: false,
        jobs: action.payload
        }
        case JOB_FAIL:
        return{
        ...state,
        isFetching: false,
        jobs: action.payload
        }
       
        default:
             return state;
     }
}