import {combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { headerReducer } from './headerReducer';

const reducers = combineReducers({
  header: headerReducer
})

export const store = createStore(reducers, applyMiddleware(thunkMiddleware))