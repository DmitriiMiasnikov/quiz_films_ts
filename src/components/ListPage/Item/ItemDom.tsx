import React from 'react';
import styles from './Item.module.scss';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';

type Props = {
  item: any,
  imagesLink: string,
  isMobile: boolean,
  quizStat: { name: string, scores: number[] } | null
}

export const ItemDom = (props: Props) => {
  return (
    <NavLink to={`/quiz/${props.item.name}`}
      className={classnames(styles.wrapper, { [styles.isMobile]: props.isMobile })}>
      <div className={styles.itemInner}>
        <div className={styles.content}>
          <img src={`${props.imagesLink}/imdb/${props.item.randomName}.jpg`}
            className={styles.image} ></img>
          <div className={styles.title}>
            {props.item.title}
          </div>
          {props.quizStat && <div className={styles.completed}>
            {props.quizStat.scores.length}
          </div>}
        </div>
      </div>
    </NavLink>
  )
}