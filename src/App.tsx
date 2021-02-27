import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './App.module.scss';
import Header from './components/Header/Header';
import MainPage from './components/MainPage/MainPage';
import ListPage from './components/ListPage/ListPage';
import Quiz from './components/Quiz/Quiz';
import { setIsMobile } from './store/mainSettingsReducer';
import Registration from './components/Registration/Registration';

type Props = {
  setIsMobile: (width: number) => void,
  showRegistration: boolean
}

function App(props: Props) {
  const [heightWindow, setHeightWindow] = useState(0);
  const widthHandler = () => {
    props.setIsMobile(window.innerWidth)
    setHeightWindow(window.innerHeight)
  }
  const subscribeResize = () => window.addEventListener('resize', widthHandler, true);
  const unsubscribeResize = () => window.removeEventListener('resize', widthHandler, true);
  useEffect(() => {
    props.setIsMobile(window.innerWidth);
    setHeightWindow(window.innerHeight);
  }, [props.setIsMobile])
  useEffect(() => {
    subscribeResize()
    return () => unsubscribeResize()
  })
  return (
    <div className={styles.page}>
      <div className={styles.wrapper} style={{ minHeight: heightWindow }}>
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
        {props.showRegistration && <Registration />}
      </div>
    </div>
  );
}

const mapStatesToProps = (state: any) => {
  return {
    isMobile: state.mainSettings.isMobile,
    showRegistration: state.user.showRegistration
  }
}
export default connect(mapStatesToProps, { setIsMobile })(App);
