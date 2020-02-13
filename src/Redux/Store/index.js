import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import Reducer from '../Reducers';


export default store = createStore(Reducer, {}, applyMiddleware(ReduxThunk))