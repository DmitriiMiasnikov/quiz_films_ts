import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { QuizDom } from './QuizDom';
import { clear, stepUp, checkAnswer, getQuiz } from './../../store/quizReducer';
import { setStatisticsQuiz, getStatisticsQuiz } from './../../store/statisticsReducer';

type Props = {
  answers: [boolean, number, string][],
  checkAnswer: (answer: string, step: number, item: number, quiz: any, currentImage: string) => void,
  clear: () => void,
  currentQuiz: { name: string, questions: { currect: string, image: string, options: string[] }[] },
  getQuiz: (quiz: string) => void,
  getStatisticsQuiz: (quiz: string) => void,
  imagesLink: string,
  isMobile: boolean,
  setStatisticsQuiz: (quiz: string, answers: number) => void,
  statisticsQuiz: any,
  step: number,
  stepUp: () => void,
  match: any
}
const Quiz = (props: Props) => {
  const [hidePrevImage, setHidePrevImage] = useState(false);
  const [inactiveButtons, setInactiveButtons] = useState(false);
  const [quizStat, setQuizStat] = useState(null);
  const [quiz, setQuiz] = useState({name: '', questions: []});
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
    shuffledArr.questions = shuffledArr.questions
      .map((el: { currect: string, image: string, options: string[] }, i: number) => {
        const imageLink = `${props.imagesLink}/imdb/${el.image}.jpg`;
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

  useEffect(() => {
    if (props.step === 10 && props.answers) {
      const fetchData = async () => {
        await props.setStatisticsQuiz(props.currentQuiz.name, props.answers
          .filter((el: [boolean, number, string]) => el[0]).length)
        await props.getStatisticsQuiz(props.currentQuiz.name);
      }
      fetchData()
    }
  }, [props.step])

  useEffect(() => {
    if (props.statisticsQuiz && props.currentQuiz) {
      setQuizStat(props.statisticsQuiz[props.currentQuiz.name]);
    }
  }, [props.statisticsQuiz])

  const checkAnswerFunc = async (answer: string, step: number, item: number, currentImage: string) => {
    if (quiz) {
      props.checkAnswer(answer, step, item, quiz, currentImage)
      setInactiveButtons(true)
      await new Promise(res => setTimeout(res, 500))
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
      inactiveButtons={inactiveButtons} quizStat={quizStat} />
  )
}

const mapStatesToProps = (state: any) => {
  return {
    currentQuiz: state.quiz.currentQuiz,
    step: state.quiz.step,
    answers: state.quiz.answers,
    isMobile: state.mainSettings.isMobile,
    imagesLink: state.mainSettings.imagesLink,
    statisticsQuiz: state.statistics.statisticsQuiz,
  }
}

export default withRouter(connect(
  mapStatesToProps, { clear, stepUp, checkAnswer, getQuiz, setStatisticsQuiz, getStatisticsQuiz }
)(Quiz));