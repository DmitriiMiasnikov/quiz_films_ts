import React from 'react';
import './App.css';

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
    <div className="App">
      asd
    </div>
  );
}

export default App;
