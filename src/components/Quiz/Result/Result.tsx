import React from 'react';
import styles from './Result.module.scss';
import classnames from 'classnames';

type Props = {
  currentQuiz: any,
  answers: any,
  resultText: any
}

export const Result = (props: Props) => {
  return (
    <div className={styles.wrapper}>
      {
        props.currentQuiz && props.currentQuiz.questions.map((el: unknown, i: number) => {
          return <div className={styles.item} key={i}>
            <img src={props.currentQuiz.questions[i].src} className={styles.image}></img>
            <div className={styles.questions}>
              {
                props.currentQuiz.questions[i].options.map((el: {title: string, name: string}, item: number) => {
                  return <div className={styles.question} key={item}>
                    <div className={classnames(styles.tickCross, {
                      [styles.wrong]: props.answers[i][1] === item && props.answers[i][0] === false,
                      [styles.right]: props.currentQuiz.questions[i].currect.name === el.name
                    })}></div>
                    <div className={styles.text}>{el.title}</div>
                  </div>
                })
              }
            </div>
          </div>
        })
      }
      <div className={styles.resultText}>
        {props.resultText['ru']}
      </div>
    </div>
  )
} 