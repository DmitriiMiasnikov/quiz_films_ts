import React from 'react';
import { connect } from 'react-redux';
import { HeaderDom } from './HeaderDom';

type Props = {
  menuItems: any
}

const Header = (props: Props ) => {

  return (
    <HeaderDom menuItems={props.menuItems} />
  )
}

const mapStatesToProps = (state: any) => {
  return {
    menuItems: state.header.menuItems
  }
}

export default connect(mapStatesToProps, {})(Header)