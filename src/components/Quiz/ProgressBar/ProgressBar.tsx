import React from 'react';
import styles from './ProgressBar.module.scss';
import classnames from 'classnames';

type Props = {
  currentQuiz: any,
  answers: any,
}

export const ProgressBar = (props: Props) => {
  return (
    <div className={styles.wrapper}>
      {
        props.currentQuiz.questions.map((el: unknown, i: number) => {
          return <div className={styles.point} key={i}><div className={classnames(styles.image, {
            [styles.wrong]: !props.answers[i] ? false : props.answers[i][0] === false,
            [styles.right]: !props.answers[i] ? false : props.answers[i][0] === true
          })}></div></div>
        })
      }
    </div>
  )
}