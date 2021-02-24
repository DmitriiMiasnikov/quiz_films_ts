import React from 'react';
import styles from './ListPage.module.scss';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import Filters from '../Filters/Filters';
import loading from './../../assets/images/loading.svg';

type Props = {
  list: Array<{
    name: string,
    title: string,
    randomName: string
  }>,
  page: number,
  addItemsHandler: () => void,
  fetching: boolean,
  isMobile: boolean,
}

export const ListPageDom = (props: Props) => {
  return (
    <div className={styles.wrapper}>
      {
        <div className={styles.filters}>
          <Filters />
        </div>
      }
      <div className={classnames(styles.list, { [styles.isMobile]: props.isMobile })}>
        {Boolean(props.list.length) && props.list.map((el: any, i: number) => {
          return <NavLink to={`/quiz/${el.name}`}
            className={classnames(styles.item)} key={i}>
            <div className={styles.itemInner}>
              <div className={styles.content}>
                <img src={`https://dmitrii.amyasnikov.pro/films/${el.randomName}_${0}.jpg`}
                  className={styles.image} ></img>
                <div className={styles.title}>
                  {el.title}
                </div>
              </div>
            </div>
          </NavLink>
        })}
      </div>
      {
        props.fetching && <div className={styles.loading}>
          <img src={loading} alt='' />
        </div>
      }
      <div className={styles.buttonAddItemsWrapper}>
        <div className={styles.button} onClick={() => props.addItemsHandler()}>
          Добавить еще
        </div>
      </div>
    </div>
  )
}