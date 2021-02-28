import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { StatisticsDom } from './StatisticsDom';
import { getAllList } from './../../store/listReducer';

type Props = {
  allList: {
    name: string,
    title: string,
  }[],
  getAllList: (catalog: string) => void
}

const Statistics = (props: Props) => {
  const [allListState, setAllListState] = useState([{}]);

  useEffect(() => {
    props.getAllList('films')
  }, [])
  useEffect(() => {
    setAllListState(props.allList);
  }, [props.allList])
  return (
    <StatisticsDom quizzes={allListState}/>
  )
}

const mapStatesToProps = (state: any) => {
  return {
    allList: state.list.allList
  }
}

export default connect(mapStatesToProps, { getAllList })(Statistics)