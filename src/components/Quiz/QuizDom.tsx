import React from 'react';
import styles from './Quiz.module.scss';
import classnames from 'classnames';
import { ProgressBar } from './ProgressBar/ProgressBar';
import { Result } from './Result/Result';

export const QuizDom = (props: any) => {
  return (
    <div className={styles.wrapper}>
      {
        props.currentQuiz && <ProgressBar answers={props.answers} currentQuiz={props.currentQuiz} />
      }
      <div className={classnames(styles.content, { [styles.hide]: props.hidePrevImage })}>
        {
          props.currentQuiz && props.step < props.currentQuiz.questions.length && <div className={classnames(styles.quiz, {
            [styles.inactive]: props.inactiveButtons
          })}>
            <img src={props.currentQuiz.questions[props.step].src} className={styles.image}></img>
            <div className={styles.questions}>
              {
                props.currentQuiz.questions[props.step].options.map((el: any, i: number) => {
                  return <div className={styles.question} key={i}
                    onClick={() => props.checkAnswerFunc(el, props.step, i)}>{el}</div>
                })
              }
            </div>
          </div>
        }
        {
          props.currentQuiz && props.step === props.currentQuiz.questions.length && (
            <Result answers={props.answers} currentQuiz={props.currentQuiz} resultText={props.resultText} />
          )
        }
      </div>
    </div>
  )
}