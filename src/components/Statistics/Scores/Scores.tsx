import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getStatisticsQuiz } from './../../../store/statisticsReducer';
import { ScoresDom } from './ScoresDom';

type Props = {
  getStatisticsQuiz: (name: string) => void,
  statisticsQuiz: any,
  quiz: string
}

const Scores = (props: Props) => {
  const [scores, setScores] = useState([0]);
  const [quizStat, setQuizStat] = useState(null);
  useEffect(() => {
    // console.log(props.quiz);
      props.getStatisticsQuiz(props.quiz);
  }, [])
  useEffect(() => {
    if (props.statisticsQuiz && props.statisticsQuiz[props.quiz]) {
      setQuizStat(props.statisticsQuiz[props.quiz]);
      const newScores = [0,1,2,3,4,5,6,7,8,9].map((el: number) => {
        return props.statisticsQuiz[props.quiz].scores.filter((item: any) => el === item).length
      })
      setScores(newScores)
    }
  }, [props.statisticsQuiz])


  return (
    <ScoresDom quizStat={quizStat} scores={scores}/>
  )
}

const mapStatesToProps = (state: any) => {
  return {
    statisticsQuiz: state.statistics.statisticsQuiz
  }
}

export default connect(mapStatesToProps, { getStatisticsQuiz })(Scores)