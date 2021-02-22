import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ListPageDom } from './ListPageDom';
import { setCurrentQuiz } from './../../store/quizReducer';
import { getList } from './../../store/listReducer';

type Props = {
  list: Array<{
    name: string,
    title: string,
    randomName: string
  }>,
  setCurrentQuiz: (name: string) => void,
  getList: () => void
}
const ListPage = (props: Props) => {
  useEffect(() => {
    props.getList()
  }, [])
  const openQuiz = (quiz: any) => {
    props.setCurrentQuiz(quiz);
  }
  return (
    <ListPageDom {...props} openQuiz={openQuiz} />
  )
}

const mapStatesToProps = (state: any) => {
  return {
    list: state.list.list
  }
}

export default connect(mapStatesToProps, { setCurrentQuiz, getList })(ListPage)