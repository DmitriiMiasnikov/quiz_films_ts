import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

type Props = {
  menuItems: Array<{ text: string, link: string }>,
}

export const HeaderDom = (props: Props) => {
  return (
    <div className={styles.wrapper}>
      {
        props.menuItems.map(({ text, link }, i: number) => {
          return (
            <NavLink to={link} key={i} className={styles.item}>
              {text}
            </NavLink>
          )
        })
      }
    </div>
  )
}