import React, { useEffect, useState } from 'react';
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
  currentFilter: string,
  isMobile: boolean,
  getList: (page: number, currentFilter: string) => void,
  setPage: (page: number) => void,
  clearList: () => void,
}
const ListPage = (props: Props) => {
  const [fetching, setFetching] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setFetching(true);
      props.getList(props.page, props.currentFilter)
      setFetching(false);
    }
    fetchData()
  }, [props.page, props.currentFilter])
  useEffect(() => {
    return () => props.clearList()
  }, [])
  const addItemsHandler = () => {
    props.setPage(props.page + 1)
  }
  return (
    <ListPageDom {...props} addItemsHandler={addItemsHandler} fetching={fetching}/>
  )
}

const mapStatesToProps = (state: any) => {
  return {
    list: state.list.list,
    page: state.list.page,
    currentFilter: state.filters.currentFilter,
    isMobile: state.mainSettings.isMobile
  }
}

export default withRouter(connect(mapStatesToProps, { getList, setPage, clearList })(ListPage))