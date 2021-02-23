import React from 'react';
import styles from './Quiz.module.scss';
import classnames from 'classnames';
import { ProgressBar } from './ProgressBar/ProgressBar';
import { Result } from './Result/Result';

export const QuizDom = (props: any) => {
  return (
    <div className={styles.wrapper}>
      {
        props.quiz && <ProgressBar answers={props.answers} quiz={props.quiz} />
      }
      <div className={classnames(styles.content, { [styles.hide]: props.hidePrevImage })}>
        {
          props.quiz && props.step < props.quiz.questions.length && <div className={classnames(styles.quiz, {
            [styles.inactive]: props.inactiveButtons
          })}>
            <img src={props.quiz.questions[props.step].image}
              className={styles.image}></img>
            <div className={styles.questions}>
              {
                props.quiz.questions[props.step].options.map((el: any, i: number) => {
                  return <div className={styles.question} key={i}
                    onClick={() => props.checkAnswerFunc(el.name, props.step, i, props.quiz.questions[props.step].image)}>
                    {el.title}</div>
                })
              }
            </div>
          </div>
        }
        {
          props.quiz && props.step === props.quiz.questions.length && (
            <Result answers={props.answers} quiz={props.quiz} />
          )
        }
      </div>
    </div>
  )
}