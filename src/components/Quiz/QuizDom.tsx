import React from 'react';
import styles from './Quiz.module.scss';
import classnames from 'classnames';
import { ProgressBar } from './ProgressBar/ProgressBar';
import { Result } from './Result/Result';

export const QuizDom = (props: any) => {
  const currentImage = props.currentQuiz && props.step < props.currentQuiz.questions.length && 
    `${props.currentQuiz.questions[props.step].currect.name}_${Math.floor(Math.random() * 5)}`;
  const imageLink = () => `https://dmitrii.amyasnikov.pro/films/${currentImage}.jpg`;
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
            <img src={imageLink()}
              className={styles.image}></img>
            <div className={styles.questions}>
              {
                props.currentQuiz.questions[props.step].options.map((el: any, i: number) => {
                  return <div className={styles.question} key={i}
                    onClick={() => props.checkAnswerFunc(el.name, props.step, i, currentImage)}>{el.title}</div>
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