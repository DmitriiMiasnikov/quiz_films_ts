import React, { useEffect, useState } from 'react';
import styles from './BarFinished.module.scss';
import classnames from 'classnames';

type Props = {
  side: string,
  answers: []
}
export const BarFinished = (props: Props) => {
  const [listFinished, setListFinished] = useState([]);
  useEffect(() => {
    if (props.side === 'left') {
      setListFinished(props.answers.slice(0, props.answers.length / 2))
    } else if (props.side === 'right') {
      setListFinished(props.answers.slice(props.answers.length / 2, props.answers.length))
    }
  }, [props.answers])

  return (
    <div className={styles.wrapper}>
      {
        listFinished.map((el: unknown, i: number) => {
          return <div className={classnames(styles.item, {[styles.wrong]: listFinished[i] && !listFinished[i][0], 
            [styles.right]: listFinished[i] && listFinished[i][0]}) } key={i}>
            <div className={styles.imageWrap}>
              {listFinished[i] && <img src={listFinished[i][2]} className={styles.image}></img>}
            </div>
          </div>
        })
      }
    </div>
  )
}