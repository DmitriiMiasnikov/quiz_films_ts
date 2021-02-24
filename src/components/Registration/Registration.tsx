import React from 'react';
import { connect } from 'react-redux';
import { RegistrationDom } from './RegistrationDom';
import { userRegistration, setShowRegistration } from './../../store/userReducer';
import { Redirect } from 'react-router-dom';

type Props = {
  userRegistration: (name: string, password: string, email: string) => void,
  isAuth: boolean,
  setShowRegistration: (show: boolean) => void
}

const Registration = (props: Props) => {
  const inputs = [
    {name: 'name', text: 'имя'},
    {name: 'password', text: 'пароль'},
    {name: 'repeatPassword', text: ' повторите пароль'},
    {name: 'email', text: 'email'}
  ]
  // const validate = (data: {name: string, email: string, password: string, repeatPassword: string}) => {
  //   const err: {name?: string, email?: string, password?: string, repeatPassword?: string} = {};
  //   // if (!data.name) err.name = 'Введите имя';
  //   if (data.name && data.name.length < 4) err.name = 'Мин. длина имени 4 знака';

  //   // if (!data.email) err.email = 'Введите почту';
  //   if (data.email && !data.email.includes('@')) err.email = 'Введите корректную почту';

  //   // if (!data.password) err.password = 'Введите пароль';
  //   if (data.password && data.password.length < 6) err.password = 'Мин. пароль 6 знаков';
  //   if (data.password && data.password.length > 15) err.password = 'Макс. пароль 20 знаков';

  //   if (!data.repeatPassword) {
  //     // err.repeatPassword = 'Повторите пароль';
  //   } else if (data.password !== data.repeatPassword) err.repeatPassword = 'Не совпадает пароль';

  //   return err
  // }
  const registrationHandler = (data: {name: string, password: string, email: string}) => {
    props.userRegistration(data.name, data.password, data.email); 
  }
  const closeRegistration = () => {
    props.setShowRegistration(false);
  }
  if (props.isAuth) {
    return (
      <Redirect to='/' />
    )
  }
  return (
    <RegistrationDom registrationHandler={registrationHandler} inputs={inputs} closeRegistration={closeRegistration}/>
  )
}

const mapStatesToProps = (state: any) => {
  return {
    isAuth: state.user.isAuth
  }
}

export default connect(mapStatesToProps, { userRegistration, setShowRegistration })(Registration);