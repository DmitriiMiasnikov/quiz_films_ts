import React from 'react';
import styles from './Statistics.module.scss';
import Scores from './Scores/Scores';

type Props = {
  quizzes: any
}

export const StatisticsDom = (props: Props) => {
  return (
    <div className={styles.wrapper}>
      {props.quizzes && <div className={styles.statisticsWrap}>
        {props.quizzes.map((el: any, i: number) => {
          return <div key={i} className={styles.score}><Scores quiz={el.name} /></div>
        })}
      </div>}
    </div>
  )
}