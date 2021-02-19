import React from 'react';
import { connect } from 'react-redux';
import { ListPageDom } from './ListPageDom';

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
    question: Array<Question>
  }>
}
const ListPage = (props: Props) => {

  return (
    <ListPageDom list={props.list}/>
  )
}

const mapStatesToProps = (state: any) => {
  return {
    list: state.list.list
  }
}

export default connect(mapStatesToProps, {})(ListPage)