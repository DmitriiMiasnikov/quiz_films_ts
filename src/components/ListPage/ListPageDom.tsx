import React from 'react';
import styles from './ListPage.module.scss';
import classnames from 'classnames';
import loading from './../../assets/images/loading.svg';
import Item from './Item/Item';

type Props = {
  list: Array<{
    name: string,
    title: string,
    randomName: string
  }>,
  addItemsHandler: () => void,
  fetching: boolean,
  isAllShown: boolean
}

export const ListPageDom = (props: Props) => {
  return (
    <div className={styles.wrapper}>
      {Boolean(props.list.length) && <div className={classnames(styles.list)}>
        {props.list.map((el: any, i: number) => {
          return <Item item={el} key={i} />
        })}
      </div>}
      {
        props.fetching && <div className={styles.loading}>
          <img src={loading} alt='' />
        </div>
      }
      {!props.isAllShown && Boolean(props.list.length) && <div className={styles.buttonAddItemsWrapper}>
        <div className={styles.button} onClick={() => props.addItemsHandler()}>
          Добавить еще
        </div>
      </div>}
    </div>
  )
}