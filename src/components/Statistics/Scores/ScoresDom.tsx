import React from 'react';
import styles from './Scores.module.scss';

type Props = {
  quizStat: any,
  scores: number[],
  title: string
}

export const ScoresDom = (props: Props) => {
  return (
    <div className={styles.wrapper}>
      {
        props.quizStat && <div>
          <div className={styles.title}>
            {props.title} ({props.quizStat.completed}
            {['2', '3', '4'].includes(props.quizStat.completed.toString().slice(-1)) ? ' раза' : ' раз'} пройдено)
          </div>
          <div className={styles.scores}>
            {props.scores.map((el: number, i: number) => {
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
      }
    </div>
  )
}