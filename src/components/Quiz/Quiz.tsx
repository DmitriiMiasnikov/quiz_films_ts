import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { QuizDom } from './QuizDom';


const Quiz = (props: any) => {
  console.log(props.currentQuiz);
  return (
    <QuizDom {...props}/>
  )
}

const mapStatesToProps = (state: any) => {
  return {
    currentQuiz: state.quiz.currentQuiz
  }
}

export default connect(mapStatesToProps, {})(withRouter(Quiz));