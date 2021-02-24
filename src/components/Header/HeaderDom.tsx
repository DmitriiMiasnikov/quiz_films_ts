import React, { useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Auth from './Auth/Auth';
import styles from './Header.module.scss';

type Props = {
  menuItems: Array<{ name: string, text: string, link: string }>,
  openCatalogHandler: (name: string) => void,
  isAuth: boolean,
  blockAuthHandler: (show: boolean) => void,
  showAuthBlock: boolean
}

export const HeaderDom = (props: Props) => {
  const refLoginMenu = useRef(null);
  const handleMouseClickLoginMenu = (e: any) => {
    function composedPath(el: any) {
      const path = [];
      while (el) {
        path.push(el);
        if (el.tagName === 'HTML') {
          path.push(document);
          path.push(window);
          return path;
        }
        el = el.parentElement;
      }
    }
    const path = e.path || (e.composedPath && e.composedPath()) || composedPath(e.target);
    if (!path.includes(refLoginMenu.current)) {
      props.blockAuthHandler(false);
    }
  }
  useEffect(() => {
    document.addEventListener('click', handleMouseClickLoginMenu, true)
    return () => document.removeEventListener('click', handleMouseClickLoginMenu, true)
  })
  return (
    <div className={styles.wrapper}>
      <div className={styles.menuItems}>
        {
          props.menuItems.map(({ name, text, link }, i: number) => {
            return (
              <NavLink to={link} key={i} className={styles.item} onClick={() => props.openCatalogHandler(name)}>
                {text}
              </NavLink>
            )
          })
        }
      </div>
      <div className={styles.auth} ref={refLoginMenu}>
        {!props.isAuth && <div className={styles.buttonAuth}
          onClick={() => props.blockAuthHandler(!props.showAuthBlock)}>Войти</div>}
        {props.showAuthBlock && <div className={styles.authBlock}>
          <Auth />
        </div>}
      </div>
    </div>
  )
}