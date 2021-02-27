import React from 'react';
import { connect } from 'react-redux';
import { MainPageDom } from './MainPageDom';

type Props = {
}

const MainPage = (props: Props) => {
  const quizzes = ['advanture'];

  return (
    <MainPageDom quizzes={quizzes}/>
  )
}

const mapStatesToProps = (state: any) => {
  return {
  }
}

export default connect(mapStatesToProps, {})(MainPage)