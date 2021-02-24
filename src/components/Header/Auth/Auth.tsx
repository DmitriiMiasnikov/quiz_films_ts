import React from 'react';
import { connect } from 'react-redux';
import { AuthDom } from './AuthDom';
import { userAuthorization, setShowRegistration } from './../../../store/userReducer';


type Props = {
  isWrongAuthorization: boolean,
  userAuthorization: (name: string, password: string) => void,
  setShowRegistration: (show: boolean) => void
}
const Auth = (props: Props) => {
  const inputs = [
    { name: 'name', text: 'имя' },
    { name: 'password', text: 'пароль' },
  ]
  const validate = (data: any) => {
    const err = {};
    // if (!data.name) err.name = 'Введите имя';
    // if (!data.password) err.password = 'Введите пароль';
    return err
  }
  const authorizationHandler = (data: any) => {
    props.userAuthorization(data.name, data.password);
  }
  const showRegistrationHandler = () => {
    props.setShowRegistration(true);
  }
  return (
    <AuthDom {...props} {...{inputs, validate, authorizationHandler, showRegistrationHandler}}/>
  )
}

const mapStatesToProps = (state: any) => {
  return {
    isWrongAuthorization: state.user.isWrongAuthorization
  }
}

export default connect(mapStatesToProps, { userAuthorization, setShowRegistration })(Auth)