import React from 'react';
import { connect } from 'react-redux';
import { MainPageDom } from './MainPageDom';

const MainPage = () => {
  return (
    <MainPageDom />
  )
}

const mapStatesToProps = (state: any) => {
  return {
    
  }
}

export default connect(mapStatesToProps, {})(MainPage)