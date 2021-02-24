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
  const authorizationHandler = (data: any) => {
    props.userAuthorization(data.name, data.password);
  }
  const showRegistrationHandler = () => {
    props.setShowRegistration(true);
  }
  return (
    <AuthDom {...props} {...{inputs, authorizationHandler, showRegistrationHandler}}/>
  )
}

const mapStatesToProps = (state: any) => {
  return {
    isWrongAuthorization: state.user.isWrongAuthorization
  }
}

export default connect(mapStatesToProps, { userAuthorization, setShowRegistration })(Auth)