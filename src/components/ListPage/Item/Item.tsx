import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ItemDom } from './ItemDom';
import { getStatisticsQuiz } from './../../../store/statisticsReducer';

type Props = {
  imagesLink: string,
  item: any,
  isMobile: boolean,
  statisticsQuiz: any,
  getStatisticsQuiz: (name: string) => void,
  page: any
}

const Item = (props: Props) => {
  const [quizStat, setQuizStat] = useState(null);

  useEffect(() => {
    props.getStatisticsQuiz(props.item.name)
  }, [])

  useEffect(() => {
    if (props.statisticsQuiz) {
      setQuizStat(props.statisticsQuiz[props.item.name]);
    }
  }, [props.statisticsQuiz])

  return (
    <ItemDom {...props} quizStat={quizStat} />
  )
}

const mapStatesToProps = (state: any) => {
  return {
    imagesLink: state.mainSettings.imagesLink,
    isMobile: state.mainSettings.isMobile,
    statisticsQuiz: state.statistics.statisticsQuiz,
    page: state.list.page
  }
}

export default connect(mapStatesToProps, { getStatisticsQuiz })(Item)