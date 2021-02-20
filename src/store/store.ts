import {combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { headerReducer } from './headerReducer';
import { mainSettingsReducer } from './mainSettingsReducer';
import { listReducer } from './listReducer';
import { quizReducer } from './quizReducer';

const reducers = combineReducers({
  header: headerReducer,
  mainSettings: mainSettingsReducer,
  list: listReducer,
  quiz: quizReducer
})

export const store = createStore(reducers, applyMiddleware(thunkMiddleware))