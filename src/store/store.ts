import {combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { headerReducer } from './headerReducer';
import { mainSettingsReducer } from './mainSettingsReducer';
import { listReducer } from './listReducer';

const reducers = combineReducers({
  header: headerReducer,
  mainSettings: mainSettingsReducer,
  list: listReducer
})

export const store = createStore(reducers, applyMiddleware(thunkMiddleware))