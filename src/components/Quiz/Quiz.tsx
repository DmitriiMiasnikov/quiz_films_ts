import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { QuizDom } from './QuizDom';
import { clear, stepUp, checkAnswer, getQuiz } from './../../store/quizReducer';


const Quiz = (props: any) => {
  const [hidePrevImage, setHidePrevImage] = useState(false);
  const [inactiveButtons, setInactiveButtons] = useState(false);
  const [quiz, setQuiz] = useState(null);

  const shuffleAnswers = (currentQuiz: any) => {
    const shuffleFunc = (arr: any) => arr.map((a: any) => [Math.random(), a])
      .sort((a: any, b: any) => a[0] - b[0]).map((a: any) => a[1]);
    const shuffledArr = { ...currentQuiz };
    shuffledArr.questions = shuffleFunc(shuffledArr.questions);
    shuffledArr.questions = shuffledArr.questions.map((el: any) => {
      const shuffleFunc = (arr: any) => arr.map((a: any) => [Math.random(), a])
        .sort((a: any, b: any) => a[0] - b[0]).map((a: any) => a[1]);
      el.options = shuffleFunc(el.options)
      return el
    })
    shuffledArr.questions = shuffledArr.questions.map((el: any, i: number) => {
      const currentImage = `${el.currect.name}_${Math.floor(Math.random() * 5)}`;
      const imageLink = `https://dmitrii.amyasnikov.pro/films/${currentImage}.jpg`;
      return { ...el, image: imageLink }
    })
    setQuiz(shuffledArr);
  }
  useEffect(() => {
    if (!props.currentQuiz) {
      props.getQuiz(props.match.params.quizName);
    }
  }, [])
  useEffect(() => {
    if (props.currentQuiz) {
      shuffleAnswers(props.currentQuiz)
    }
  }, [props.currentQuiz])

  useEffect(() => {
    return () => props.clear()
  }, [])

  const checkAnswerFunc = async (answer: any, step: number, item: number, currentImage: string) => {
    if (quiz) {
      props.checkAnswer(answer, step, item, quiz, currentImage)
      setInactiveButtons(true)
      await new Promise(res => setTimeout(res, 300))
      setHidePrevImage(true)
      await new Promise(res => setTimeout(res, 350))
      props.stepUp()
      await new Promise(res => setTimeout(res, 300))
      setHidePrevImage(false)
      setInactiveButtons(false)
    }
  }

  return (
    <QuizDom {...props} quiz={quiz} checkAnswerFunc={checkAnswerFunc} hidePrevImage={hidePrevImage}
      inactiveButtons={inactiveButtons} />
  )
}

const mapStatesToProps = (state: any) => {
  return {
    currentQuiz: state.quiz.currentQuiz,
    step: state.quiz.step,
    answers: state.quiz.answers,
    isMobile: state.mainSettings.isMobile
  }
}

export default connect(
  mapStatesToProps, { clear, stepUp, checkAnswer, getQuiz }
)(withRouter(Quiz));