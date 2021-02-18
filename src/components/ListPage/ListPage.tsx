import React from 'react';
import { connect } from 'react-redux';
import { ListPageDom } from './ListPageDom';

const ListPage = () => {
  return (
    <ListPageDom />
  )
}

const mapStatesToProps = (state: any) => {
  return {

  }
}

export default connect(mapStatesToProps, {})(ListPage)