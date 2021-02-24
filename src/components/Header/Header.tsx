import React, { useState } from 'react';
import { connect } from 'react-redux';
import { HeaderDom } from './HeaderDom';
import { setCatalog } from './../../store/listReducer';

type Props = {
  menuItems: Array<{ name: string, text: string, link: string }>,
  allCatalogs: string[],
  isAuth: boolean
}

const Header = (props: Props) => {
  const [showAuthBlock, setShowAuthBlock] = useState(false);
  const openCatalogHandler = (catalog: string) => {
    if (props.allCatalogs.includes(catalog)) {
      setCatalog(catalog);
    }
  }
  const blockAuthHandler = (show: boolean) => {
    setShowAuthBlock(show);
  }
  return (
    <HeaderDom menuItems={props.menuItems} openCatalogHandler={openCatalogHandler} isAuth={props.isAuth}
    blockAuthHandler={blockAuthHandler} showAuthBlock={showAuthBlock}/>
  )
}

const mapStatesToProps = (state: any) => {
  return {
    menuItems: state.header.menuItems,
    allCatalogs: state.list.allCatalogs,
    isAuth: state.user.isAuth
  }
}

export default connect(mapStatesToProps, { setCatalog })(Header)