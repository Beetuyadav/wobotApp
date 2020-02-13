import { COMMENT_REQUEST, COMMENTS_REQUEST, COMMENTS_SUCCESS, COMMENTS_FAIL} from '../../Actions/Comments';
inisialstate={
filearray: null,
comments: null,
isFetching: false
}
export default (state=inisialstate,action) =>{
switch (action.type) {
    case COMMENT_REQUEST:
        return{
      ...state,
      filearray: action.payload,
     }
     case COMMENTS_REQUEST:
             return{
           ...state,
           isFetching: true,
          }
         case COMMENTS_SUCCESS:
          return{
          ...state,
          isFetching: false,
          comments: action.payload
         }
        case COMMENTS_FAIL:
          return{
          ...state,
          isFetching: false,
          comments: action.payload
         }
   default:
        return state;
}
}