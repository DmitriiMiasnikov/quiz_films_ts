import {combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { headerReducer } from './headerReducer';
import { mainSettingsReducer } from './mainSettingsReducer';

const reducers = combineReducers({
  header: headerReducer,
  mainSettings: mainSettingsReducer
})

export const store = createStore(reducers, applyMiddleware(thunkMiddleware))