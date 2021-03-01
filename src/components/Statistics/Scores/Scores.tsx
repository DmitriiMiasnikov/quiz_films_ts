import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getStatisticsQuiz } from './../../../store/statisticsReducer';
import { ScoresDom } from './ScoresDom';

type Props = {
  getStatisticsQuiz: (name: string) => void,
  statisticsQuiz: any,
  quiz: any
}

const Scores = (props: Props) => {
  const [scores, setScores] = useState([0]);
  const [quizStat, setQuizStat] = useState(null);
  useEffect(() => {
      props.getStatisticsQuiz(props.quiz.name);
  }, [])
  useEffect(() => {
    if (props.statisticsQuiz && props.statisticsQuiz[props.quiz.name]) {
      setQuizStat(props.statisticsQuiz[props.quiz.name]);
      const newScores = [0,1,2,3,4,5,6,7,8,9].map((el: number) => {
        return props.statisticsQuiz[props.quiz.name].scores.filter((item: any) => el === item).length
      })
      setScores(newScores)
    }
  }, [props.statisticsQuiz])


  return (
    <ScoresDom quizStat={quizStat} scores={scores} title={props.quiz.title}/>
  )
}

const mapStatesToProps = (state: any) => {
  return {
    statisticsQuiz: state.statistics.statisticsQuiz
  }
}

export default connect(mapStatesToProps, { getStatisticsQuiz })(Scores)