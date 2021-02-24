import { userApi } from './../api/api';

const IS_AUTH = 'IS_AUTH';
const SET_CURRENT_USER_ID = 'SET_CURRENT_USER_ID';
const SET_IS_WRONG_AUTHORIZATION = 'SET_IS_WRONG_AUTHORIZATION';
const SET_MY_USER_INFO = 'SET_MY_USER_INFO';
const SHOW_REGISTRATION = 'SHOW_REGISTRATION';
const SET_ERRORS_REGISTRATION = 'SET_ERRORS_REGISTRATION';

const initialStates = {
  isAuth: false,
  currentUserId: null,
  isWrongAuthorization: false,

  showRegistration: false,
  errorsRegistration: null,
}

export const userReducer = (state = initialStates, action: any) => {
  switch (action.type) {
    case (IS_AUTH): {
      return { ...state, isAuth: action.isAuth }
    }
    case (SET_CURRENT_USER_ID): {
      return { ...state, currentUserId: action.id }
    }
    case (SET_MY_USER_INFO): {
      return { ...state, myUserInfo: action.myUserInfo }
    }
    case (SET_IS_WRONG_AUTHORIZATION): {
      return { ...state, isWrongAuthorization: action.isWrongAuthorization }
    }
    case (SHOW_REGISTRATION): {
      return { ...state, showRegistration: action.show }
    }
    case (SET_ERRORS_REGISTRATION): {
      return { ...state, errorsRegistration: action.errors }
    }
    default: break;
  }
  return state
}

export const setIsAuth = (isAuth: boolean) => {
  return { type: IS_AUTH, isAuth }
}
export const setCurrentUserId = (id: number) => {
  return { type: SET_CURRENT_USER_ID, id }
}
const setMyUserInfoFunc = (myUserInfo: any) => {
  return { type: SET_MY_USER_INFO, myUserInfo }
}
export const setIsWrongAuthorization = (isWrongAuthorization: boolean) => {
  return { type: SET_IS_WRONG_AUTHORIZATION, isWrongAuthorization }
}
export const setShowRegistration = (show: boolean) => {
  return { type: SHOW_REGISTRATION, show }
}

export const setErrorsRegistration = (errors: string[] | null) => {
  return { type: SET_ERRORS_REGISTRATION, errors }
}

export const userRegistration = (userName = '', password = '', email = '') => {
  return async (dispatch: (arg?: any) => void) => {
    dispatch(setErrorsRegistration(null));
    const res = await userApi.registration(userName, password, email);
    dispatch(setIsAuth(res.data.isAuth));
    if (res.data.isAuth) {
      dispatch(setCurrentUserId(res.data.user.userId))
    } else {
      dispatch(setErrorsRegistration(res.data.err.message));
    }
  }
}

export const userAuthorization = (userName = '', password = '') => {
  return async (dispatch: (arg?: any) => void) => {
    dispatch(setIsWrongAuthorization(false));
    const res = await userApi.authorization(userName, password);
    dispatch(setIsAuth(res.data.isAuth));
    if (res.data.isAuth) {
      dispatch(setCurrentUserId(res.data.user.userId));
      dispatch(setMyUserInfoFunc(res.data.user));
    } else {
      dispatch(setIsWrongAuthorization(true));
    }
  }
}