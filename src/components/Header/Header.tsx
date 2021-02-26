import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { HeaderDom } from './HeaderDom';
import { setCatalog, clearList } from './../../store/listReducer';
import { setIsAuth, setUserInfo } from '../../store/userReducer';

type Props = {
  menuItems: Array<{ name: string, text: string, link: string }>,
  allCatalogs: string[],
  catalog: string,
  isAuth: boolean,
  showRegistration: boolean,
  setIsAuth: (auth: boolean) => void,
  user: { userId: number, userName: string },
  setUserInfo: (user: any) => void,
  setCatalog: (catalog: string) => void,
  clearList: () => void
}

const Header = (props: Props) => {
  const [showAuthBlock, setShowAuthBlock] = useState(false);

  useEffect(() => {
    if (props.showRegistration || props.isAuth) {
      setShowAuthBlock(false);
    }
  }, [props.showRegistration, props.isAuth])

  const openCatalogHandler = (catalog: string) => {
    if (catalog !== props.catalog) {
      props.clearList()
      if (props.allCatalogs.includes(catalog)) {
        props.setCatalog(catalog);
      }
    }
  }

  const blockAuthHandler = (show: boolean) => {
    setShowAuthBlock(show);
  }
  const logout = () => {
    props.setIsAuth(false);
    props.setUserInfo(null)
  }

  return (
    <HeaderDom {...props} openCatalogHandler={openCatalogHandler}
      blockAuthHandler={blockAuthHandler} showAuthBlock={showAuthBlock} logout={logout} />
  )
}

const mapStatesToProps = (state: any) => {
  return {
    menuItems: state.header.menuItems,
    allCatalogs: state.list.allCatalogs,
    isAuth: state.user.isAuth,
    showRegistration: state.user.showRegistration,
    user: state.user.user,
    catalog: state.list.catalog
  }
}

export default connect(mapStatesToProps, { setCatalog, setIsAuth, setUserInfo, clearList })(Header)