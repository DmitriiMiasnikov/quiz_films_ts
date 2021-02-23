import React from 'react';
import styles from './ProgressBar.module.scss';
import classnames from 'classnames';

type Props = {
  quiz: any,
  answers: any,
}

export const ProgressBar = (props: Props) => {
  return (
    <div className={styles.wrapper}>
      {
        props.quiz.questions.map((el: unknown, i: number) => {
          return <div key={i} className={classnames(styles.point, {
            [styles.wrong]: !props.answers[i] ? false : props.answers[i][0] === false,
            [styles.right]: !props.answers[i] ? false : props.answers[i][0] === true
          })}></div>;
        })
      }
    </div>
  )
}