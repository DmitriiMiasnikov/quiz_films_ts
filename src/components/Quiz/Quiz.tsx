import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { QuizDom } from './QuizDom';
import { clear, stepUp, checkAnswer, getResultText, toggleInactiveButtons, getQuiz } from './../../store/quizReducer';


const Quiz = (props: any) => {
  const [answers, setAnswer] = useState(null);
  const [hidePrevImage, setHidePrevImage] = useState(false);
  const shuffleAnswers = (currentQuiz: any) => {
    const shuffleFunc = (arr: any) => arr.map((a: any) => [Math.random(), a])
      .sort((a: any, b: any) => a[0] - b[0]).map((a: any) => a[1]);
    const shuffledArr = currentQuiz;
    shuffledArr.questions = shuffleFunc(shuffledArr.questions);
    shuffledArr.questions = shuffledArr.questions.map((el: any) => {
      const shuffleFunc = (arr: any) => arr.map((a: any) => [Math.random(), a])
        .sort((a: any, b: any) => a[0] - b[0]).map((a: any) => a[1]);
      el.options = shuffleFunc(el.options)
      return el
    })
    return shuffledArr
  }
  useEffect(() => {
    if (!props.currentQuiz) {
      props.getQuiz(props.match.params.quizName);
    }
  }, [])
  useEffect(() => {
    if (props.currentQuiz) {
      setAnswer(props.currentQuiz.questions.map(() => null))
      shuffleAnswers(props.currentQuiz)
    }
  }, [props.currentQuiz])

  useEffect(() => {
    return () => props.clear()
  }, [])

  const checkAnswerFunc = async (answer: any, step: number, item: number, currentImage: string) => {
    if (answers) {
      props.checkAnswer(answer, step, answers, item, props.currentQuiz, currentImage)
      props.toggleInactiveButtons(true)
      await new Promise(res => setTimeout(res, 300))
      setHidePrevImage(true)
      await new Promise(res => setTimeout(res, 350))
      props.stepUp()
      await new Promise(res => setTimeout(res, 300))
      setHidePrevImage(false)
      props.toggleInactiveButtons(false)
    }
  }
  useEffect(() => {
    if (hidePrevImage) {
      const right: number = props.answers.filter((el: any) => !el ? false : el[0] === true).length;
      const all: number = props.answers.length
      props.getResultText(right, all)
    }
  }, [hidePrevImage])

  return (
    <QuizDom {...props} checkAnswerFunc={checkAnswerFunc} hidePrevImage={hidePrevImage} /> 
  )
}

const mapStatesToProps = (state: any) => {
  return {
    currentQuiz: state.quiz.currentQuiz,
    step: state.quiz.step,
    answers: state.quiz.answers,
    resultText: state.quiz.resultText,
    inactiveButtons: state.quiz.inactiveButtons,
  }
}

export default connect(
  mapStatesToProps, { clear, stepUp, checkAnswer, getResultText, toggleInactiveButtons, getQuiz }
)(withRouter(Quiz));