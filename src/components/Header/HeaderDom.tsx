import React from 'react';
import styles from './Header.module.scss';

type Props = {
  menuItems: any,
}

export const HeaderDom = (props: Props) => {
  return (
    <div className={styles.wrapper}>
      {
        props.menuItems.map((el: any, i: number) => {
          return (
            <div key={i} className={styles.item}>
              {el.name}
            </div>
          )
        })
      }
    </div>
  )
}