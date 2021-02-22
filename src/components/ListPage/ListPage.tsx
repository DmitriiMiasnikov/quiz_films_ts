import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ListPageDom } from './ListPageDom';
import { clearList, getList, setPage } from './../../store/listReducer';
import { withRouter } from 'react-router-dom';

type Props = {
  list: Array<{
    name: string,
    title: string,
    randomName: string
  }>,
  page: number,
  getList: (page: number) => void,
  setPage: (page: number) => void,
  clearList: () => void,
}
const ListPage = (props: Props) => {

  useEffect(() => {
    props.getList(props.page)
  }, [props.page])
  useEffect(() => {
    return () => props.clearList()
  }, [])
  const addItemsHandler = () => {
    props.setPage(props.page + 1)
  }
  return (
    <ListPageDom {...props} addItemsHandler={addItemsHandler} />
  )
}

const mapStatesToProps = (state: any) => {
  return {
    list: state.list.list,
    page: state.list.page
  }
}

export default withRouter(connect(mapStatesToProps, { getList, setPage, clearList })(ListPage))