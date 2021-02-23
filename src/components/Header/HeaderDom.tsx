import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

type Props = {
  menuItems: Array<{ name: string, text: string, link: string }>,
  openCatalogHandler: (name: string) => void
}

export const HeaderDom = (props: Props) => {
  return (
    <div className={styles.wrapper}>
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
  )
}