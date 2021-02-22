import React from 'react';
import styles from './ListPage.module.scss';
import { NavLink } from 'react-router-dom';

type Props = {
  list: Array<{
    name: string,
    title: string,
    randomName: string
  }>,
  openQuiz: (quiz: Record<string, unknown>) => void
}

export const ListPageDom = (props: Props) => {
  console.log(props);
  return (
    <div className={styles.wrapper}>
      {props.list && props.list.map((el: any, i: number) => {
        return <NavLink to={`/quiz/${el.name}`} onClick={() => props.openQuiz(el.name)}
          className={styles.item} key={i}>
          <img src={`https://dmitrii.amyasnikov.pro/films/${el.randomName}_${Math.floor(Math.random() * 5)}.jpg`} 
            className={styles.image} ></img>
          <div className={styles.title}>
            {el.title}
          </div>
        </NavLink>
      })}
    </div>
  )
}