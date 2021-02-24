import React from 'react';
import styles from './Result.module.scss';
import classnames from 'classnames';

type Props = {
  quiz: any,
  answers: any
}

export const Result = (props: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.resultText}>
        {`Верно завершено ${props.answers.map((el: any) => el[0]).filter((el: boolean) => el).length} из ${props.answers.length}.`}
      </div>
      {
        props.quiz && props.quiz.questions.map((el: unknown, i: number) => {
          return <div className={styles.item} key={i}>
            <div className={styles.imageWrap}>
              <img src={props.answers[i][2]} className={styles.image}></img>
            </div>
            <div className={styles.questions}>
              {
                props.quiz.questions[i].options.map((el: { title: string, name: string }, item: number) => {
                  return <div className={styles.question} key={item}>
                    <div className={classnames(styles.tickCross, {
                      [styles.wrong]: props.answers[i][1] === item && props.answers[i][0] === false,
                      [styles.right]: props.quiz.questions[i].currect.name === el.name
                    })}></div>
                    <div className={styles.text}>{el.title}</div>
                  </div>
                })
              }
            </div>
          </div>
        })
      }
    </div>
  )
} 