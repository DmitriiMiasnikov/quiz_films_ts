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
            `${(maxScore / props.scores[i]) * (100 / maxScore)}%` : '0%'
          return <div className={styles.scoresCollumn} key={i}
            style={{ height: height }}>
            {el}
          </div>
        })}
      </div>
    </div>
  )
}