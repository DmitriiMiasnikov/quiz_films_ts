import React from 'react';
import styles from './ListPage.module.scss';
import { NavLink } from 'react-router-dom';
import Filters from '../Filters/Filters';

type Props = {
  list: Array<{
    name: string,
    title: string,
    randomName: string
  }>,
  page: number,
  addItemsHandler: () => void
}

export const ListPageDom = (props: Props) => {
  return (
    <div className={styles.wrapper}>
      {
        <div className={styles.filters}>
          <Filters />
        </div>
      }
      <div className={styles.list}>
      {Boolean(props.list.length) && props.list.map((el: any, i: number) => {
        return <NavLink to={`/quiz/${el.name}`}
          className={styles.item} key={i}>
          <img src={`https://dmitrii.amyasnikov.pro/films/${el.randomName}_${0}.jpg`} 
            className={styles.image} ></img>
          <div className={styles.title}>
            {el.title}
          </div>
        </NavLink>
      })}
      </div>
      <div className={styles.buttonAddItemsWrapper}>
        <div className={styles.button} onClick={() => props.addItemsHandler()}>
          Добавить еще
        </div>
      </div>
    </div>
  )
}