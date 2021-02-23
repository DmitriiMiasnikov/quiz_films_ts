import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './App.module.scss';
import Header from './components/Header/Header';
import MainPage from './components/MainPage/MainPage';
import ListPage from './components/ListPage/ListPage';
import Quiz from './components/Quiz/Quiz';
import { setIsMobile } from './store/mainSettingsReducer';
// type AddressType = {
//   country: null | string,
//   city: null | string,
// }
// const initialState = {
//   name: null as string | null,
//   age: null as number | null,
//   address: [] as Array<AddressType>
// }
// export type initialStateType = typeof initialState;
// const state: initialStateType = {
//   name: 'asda',
//   age: 22,
//   address: [{
//     country: 'asas',
//     city: 'asda'
//   }]
// }

type Props = {
  setIsMobile: (width: number) => void
}

function App(props: Props) {
  const widthHandler = () => {
    props.setIsMobile(window.innerWidth)
  }
  const subscribeResize = () => window.addEventListener('resize', widthHandler, true);
  const unsubscribeResize = () => window.removeEventListener('resize', widthHandler, true);
  useEffect(() => {
    props.setIsMobile(window.innerWidth);
  }, [props.setIsMobile])
  useEffect(() => {
    subscribeResize()
    return () => unsubscribeResize()
  })
  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <Header />
        </div>
        <div className={styles.content}>
          <Switch>
            <Redirect exact from='/' to='/main' />
            <Route path={'/main'} render={() => <MainPage />} />
            <Route path={'/list/:listName'} render={() => <ListPage />} />
            <Route path={'/quiz/:quizName'} render={() => <Quiz />} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

const mapStatesToProps = (state: any) => {
  return {
    isMobile: state.mainSettings.isMobile
  }
}
export default connect(mapStatesToProps, { setIsMobile })(App);
