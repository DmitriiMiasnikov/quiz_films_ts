import React from 'react';
import { connect } from 'react-redux';
import { HeaderDom } from './HeaderDom';
import { setCatalog } from './../../store/listReducer';

type Props = {
  menuItems: Array<{ name: string, text: string, link: string }>,
  allCatalogs: string[]
}

const Header = (props: Props) => {

  const openCatalogHandler = (catalog: string) => {
    if (props.allCatalogs.includes(catalog)) {
      setCatalog(catalog);
    }
  }
  return (
    <HeaderDom menuItems={props.menuItems} openCatalogHandler={openCatalogHandler} />
  )
}

const mapStatesToProps = (state: any) => {
  return {
    menuItems: state.header.menuItems,
    allCatalogs: state.list.allCatalogs
  }
}

export default connect(mapStatesToProps, { setCatalog })(Header)