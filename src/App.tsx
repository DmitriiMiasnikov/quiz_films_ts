import React from 'react';
import { Route } from 'react-router-dom';
import styles from './App.module.scss';
import Header from './components/Header/Header';
import MainPage from './components/MainPage/MainPage';
import ListPage from './components/ListPage/ListPage';
import Quiz from './components/Quiz/Quiz';

type AddressType = {
  country: null | string,
  city: null | string,
}
const initialState = {
  name: null as string | null,
  age: null as number | null,
  address: [] as Array<AddressType>
}
export type initialStateType = typeof initialState;
const state: initialStateType = {
  name: 'asda',
  age: 22,
  address: [{
    country: 'asas',
    city: 'asda'
  }]
}

function App() {
  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <Header />
        </div>
        <div className={styles.content}>
          <Route path={'/main'} render={() => <MainPage />} />
          <Route path={'/list/:listName'} render={() => <ListPage />} />
          <Route path={'/quiz/:quizName'} render={() => <Quiz />} />
        </div>
      </div>
    </div>
  );
}

export default App;
