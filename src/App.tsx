import React from 'react';
import styles from './App.module.scss';

type AddressType = {
  country: null | string,
  city: null | string,
}
const initialState = {
  name: null as string | null,
  age: null as number | null,
  address: [] as Array<AddressType>
}
export type initialStateType = typeof initialState;
const state: initialStateType = {
  name: 'asda',
  age: 22,
  address: [{
    country: 'asas',
    city: 'asda'
  }]
}
console.log(state);

function App() {
  return (
    <div className={styles.App}>
      <div className={styles.header}>
        asd
      </div>
      <div className={styles.content}>
        gfsd
      </div>
    </div>
  );
}

export default App;
