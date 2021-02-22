import React from 'react';
import styles from './ListPage.module.scss';
import { NavLink } from 'react-router-dom';

type Props = {
  list: Array<{
    name: string,
    title: string
  }>,
  openQuiz: (quiz: Record<string, unknown>) => void
}

export const ListPageDom = (props: Props) => {
  return (
    <div className={styles.wrapper}>
      {props.list && props.list.map((el: any, i: number) => {
        return <NavLink to={`/quiz/${el.name}`} onClick={() => props.openQuiz(el)}
          className={styles.item} key={i}>
          {/* <img src={el.src} className={styles.image} ></img> */}
          <div className={styles.title}>
            {el.title}
          </div>
        </NavLink>
      })}
    </div>
  )
}