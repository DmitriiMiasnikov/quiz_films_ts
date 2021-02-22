import { listApi } from './../api/api';

const GET_LIST = 'GET_LIST';

type InitialStates = {
  list: Array<{
    name: string,
    title: string,
    randomName: string
  }> | null
}

const initialStates: InitialStates = {
  list: null
}

export const listReducer = (state = initialStates, action: any) => {
  switch (action.type) {
    case (GET_LIST): {
      return { ...state, list: action.list }
    }
    default: break;
  }
  return state
}

const getListFunc = (list: Array<{ name: string, title: string, randomName: string }>) => {
  return { type: GET_LIST, list }
}

export const getList = () => {
  return async (dispatch: any) => {
    const res = await listApi.getList();
    dispatch(getListFunc(res));
  }
}