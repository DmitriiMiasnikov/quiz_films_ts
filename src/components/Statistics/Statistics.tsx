import React from 'react';
import { connect } from 'react-redux';
import { StatisticsDom } from './StatisticsDom';

const Statistics = () => {
  const quizzes = ['action','advanture'];
  return (
    <StatisticsDom quizzes={quizzes}/>
  )
}

const mapStatesToProps = (state: any) => {
  return {

  }
}

export default connect(mapStatesToProps, {})(Statistics)