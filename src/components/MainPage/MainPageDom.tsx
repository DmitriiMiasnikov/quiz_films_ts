import React from 'react';
import styles from './MainPage.module.scss';
import Scores from './Scores/Scores';

type Props = {
  quizzes: string[]
}

export const MainPageDom = (props: Props) => {
  return (
    <div className={styles.wrapper}>
      {<div className={styles.statisticsWrap}>
        {props.quizzes.map((el: string, i: number) => {
          return <div key={i}><Scores quiz={el} /></div>
        })}
      </div>}
    </div>
  )
}