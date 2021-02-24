import React from 'react';
import { connect } from 'react-redux';
import { RegistrationDom } from './RegistrationDom';
import { userRegistration, setShowRegistration, setErrorsRegistration } from './../../store/userReducer';
import { Redirect } from 'react-router-dom';

type Props = {
  userRegistration: (name: string, password: string, email: string) => void,
  isAuth: boolean,
  setShowRegistration: (show: boolean) => void,
  setErrorsRegistration: (err: any) => void,
  errorsRegistration: string[] | null
}

const Registration = (props: Props) => {
  const inputs = [
    {name: 'name', text: 'имя'},
    {name: 'password', text: 'пароль'},
    {name: 'repeatPassword', text: ' повторите пароль'},
    {name: 'email', text: 'email'}
  ]
  const registrationHandler = (data: {name: string, password: string, email: string}) => {
    props.userRegistration(data.name, data.password, data.email); 
  }
  const closeRegistration = () => {
    props.setShowRegistration(false);
    props.setErrorsRegistration(null);
  }
  if (props.isAuth) {
    return (
      <Redirect to='/' />
    )
  }
  return (
    <RegistrationDom registrationHandler={registrationHandler} inputs={inputs} closeRegistration={closeRegistration}
    errorsRegistration={props.errorsRegistration}/>
  )
}

const mapStatesToProps = (state: any) => {
  return {
    isAuth: state.user.isAuth,
    errorsRegistration: state.user.errorsRegistration
  }
}

export default connect(mapStatesToProps, { userRegistration, setShowRegistration, setErrorsRegistration })(Registration);