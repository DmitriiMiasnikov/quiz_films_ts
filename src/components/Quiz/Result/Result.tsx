import React from 'react';
import styles from './Result.module.scss';
import classnames from 'classnames';
import tick from './../../../assets/images/tick.svg';
import cross from './../../../assets/images/cross.svg';

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
            <div className={classnames(styles.imageWrap)}>
              <img src={props.answers[i][2]} className={styles.image}></img>
              {props.answers[i][0] && <div className={styles.right}><img src={tick} className={styles.image} /></div>}
            </div>
            <div className={styles.questions}>
              {
                props.quiz.questions[i].options.map((el: { title: string, name: string }, item: number) => {
                  return <div className={styles.question} key={item}>
                    <div className={classnames(styles.tickCross)}>
                      {props.quiz.questions[i].currect.name === el.name && <img src={tick} className={styles.image} />}
                      {props.answers[i][1] === item && props.answers[i][0] === false && <img src={cross} className={styles.image} />}
                    </div>
                    <div className={classnames(styles.text, {
                      [styles.wrong]: props.answers[i][1] === item && props.answers[i][0] === false,
                      [styles.right]: props.quiz.questions[i].currect.name === el.name
                    })}>{el.title}</div>
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