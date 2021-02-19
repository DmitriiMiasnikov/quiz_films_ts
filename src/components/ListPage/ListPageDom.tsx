import React from 'react';
import styles from './ListPage.module.scss';

type Question = {
  options: string[],
  currect: string,
  src: string
}

type Props = {
  list: Array<{
    name: string,
    en: string,
    ru: string,
    type: string,
    src: string,
    question: Array<Question>
  }>
}

export const ListPageDom = (props: Props) => {
  return (
    <div className={styles.wrapper}>
      {props.list.map((el: any, i: number) => {
        return (
          <div key={styles.item}>
            {el.en}
          </div>
        )
      })}
    </div>
  )
}