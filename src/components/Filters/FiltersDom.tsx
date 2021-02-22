import React from 'react';
import styles from './Filters.module.scss';

type Props = {
  filters: {
    name: string,
    title: string
  }[],
  filterHandler: (name: string) => void
}

export const FiltersDom = (props: Props) => {
  return (
    <div className={styles.wrapper}>
      {
        props.filters.map(({ name, title }, i: number) => {
          return (
            <div className={styles.item} key={i} onClick={() => props.filterHandler(name)}>
              {title}
            </div>
          )
        })
      }
    </div>
  )
}