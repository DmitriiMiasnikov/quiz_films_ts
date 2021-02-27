import React from 'react';
import styles from './Quiz.module.scss';
import classnames from 'classnames';
import { ProgressBar } from './ProgressBar/ProgressBar';
import { Result } from './Result/Result';
import { BarFinished } from './BarFinished/BarFinished';

export const QuizDom = (props: any) => {
  const heightQuiz = window.innerHeight - 105;
  return (
    <div className={styles.wrapper}>
      {
        props.quiz && <div className={styles.progressBarWrap}>
          <ProgressBar answers={props.answers} quiz={props.quiz} />
        </div>
      }
      <div className={classnames(styles.content, { [styles.hide]: props.hidePrevImage })}>
        {!props.isMobile && props.quiz && props.step < props.quiz.questions.length &&
          <div className={styles.barFinished} style={{ height: heightQuiz }}>
            <BarFinished side={'left'} answers={props.answers} />
          </div>}
        {
          props.quiz && props.step < props.quiz.questions.length && <div style={{ height: heightQuiz }}
            className={classnames(styles.quiz, { [styles.inactive]: props.inactiveButtons, [styles.isMobile]: props.isMobile })}>
            <div className={styles.imageWrap}>
              <img src={props.quiz.questions[props.step].image}
                className={styles.image}></img>
            </div>
            <div className={styles.questions}>
              {
                props.quiz.questions[props.step].options.map((el: string, i: number) => {
                  return <div className={classnames(styles.question, {
                    [styles.right]: props.answers[props.step] && i === props.answers[props.step][1] && props.answers[props.step][0],
                    [styles.wrong]: props.answers[props.step] && i === props.answers[props.step][1] && !props.answers[props.step][0]
                  })} key={i}
                    onClick={() => props.checkAnswerFunc(el, props.step, i, props.quiz.questions[props.step].image)}>
                    {el}</div>
                })
              }
            </div>
          </div>
        }
        {!props.isMobile && props.quiz && props.step < props.quiz.questions.length &&
          <div className={styles.barFinished} style={{ height: heightQuiz }}>
            <BarFinished side={'right'} answers={props.answers} />
          </div>}
        {
          props.quiz && props.step === props.quiz.questions.length && (
            <div className={styles.resultWrap}>
              <Result answers={props.answers} quiz={props.quiz} quizStat={props.quizStat}/>
            </div>
          )
        }
      </div>
    </div>
  )
}