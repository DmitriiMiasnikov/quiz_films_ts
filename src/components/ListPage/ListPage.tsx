import React from 'react';
import { connect } from 'react-redux';
import { ListPageDom } from './ListPageDom';
import { setCurrentQuiz } from './../../store/quizReducer';

type Question = {
  options: string[],
  currect: string,
  src: string
}

type Props = {
  list: Array<{
    name: string,
    en: string,
    ru: string,
    type: string,
    src: string,
    questions: Array<Question>
  }>,
  setCurrentQuiz: (name: string) => void
}
const ListPage = (props: Props) => {

  const openQuiz = (quiz: any) => {
    props.setCurrentQuiz(quiz);
  }
  return (
    <ListPageDom {...props} openQuiz={openQuiz}/>
  )
}

const mapStatesToProps = (state: any) => {
  return {
    list: state.list.list
  }
}

export default connect(mapStatesToProps, { setCurrentQuiz })(ListPage)