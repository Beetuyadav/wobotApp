import { combineReducers } from 'redux';
import Auth from '../Reducers/Auth';
import Job from '../Reducers/Job';
import Ticket from '../Reducers/Ticket';
import Password from '../Reducers/Password';
import Notification from '../Reducers/Notification';
import Comments from '../Reducers/Comments';

export default combineReducers({
Auth,
Job,
Ticket,
Password,
Notification,
Comments
})