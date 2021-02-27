import React from 'react';
import styles from './Scores.module.scss';

type Props = {
  quizStat: any,
  scores: number[]
}

export const ScoresDom = (props: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.scores}>
        {props.quizStat && props.scores.map((el: number, i: number) => {
          const maxScore = Math.max(...props.scores)
          const height = props.scores[i] ?
            `${(props.scores[i] / maxScore) * (100)}%` : '0%'
          return <div className={styles.scoresCollumn} key={i}
            style={{ height: height }}>
            {Boolean(el) && el}
          </div>
        })}
      </div>
    </div>
  )
}