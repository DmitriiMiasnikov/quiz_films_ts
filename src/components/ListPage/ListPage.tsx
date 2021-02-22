import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ListPageDom } from './ListPageDom';
import { getList } from './../../store/listReducer';

type Props = {
  list: Array<{
    name: string,
    title: string,
    randomName: string
  }>,
  getList: () => void
}
const ListPage = (props: Props) => {
  useEffect(() => {
    props.getList()
  }, [])

  return (
    <ListPageDom {...props} />
  )
}

const mapStatesToProps = (state: any) => {
  return {
    list: state.list.list
  }
}

export default connect(mapStatesToProps, { getList })(ListPage)