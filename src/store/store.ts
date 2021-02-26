import {combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { headerReducer } from './headerReducer';
import { mainSettingsReducer } from './mainSettingsReducer';
import { listReducer } from './listReducer';
import { quizReducer } from './quizReducer';
import { filtersReducer } from './filtersReducer';
import { userReducer } from './userReducer';
import { statisticsReducer } from './statisticsReducer';

const reducers = combineReducers({
  header: headerReducer,
  mainSettings: mainSettingsReducer,
  list: listReducer,
  quiz: quizReducer,
  filters: filtersReducer,
  user: userReducer,
  statistics: statisticsReducer
})

export const store = createStore(reducers, applyMiddleware(thunkMiddleware))