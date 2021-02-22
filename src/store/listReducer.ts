import { listApi } from './../api/api';

const GET_LIST = 'GET_LIST';
const SET_PAGE = 'SET_PAGE';

type InitialStates = {
  list: {
    name: string,
    title: string,
    randomName: string
  }[],
  page: number
}

const initialStates: InitialStates = {
  list: [],
  page: 1
}

export const listReducer = (state = initialStates, action: any) => {
  switch (action.type) {
    case (GET_LIST): {
      const newList = [...state.list, ...action.list]
      return { ...state, list: newList }
    }
    case (SET_PAGE): {
      return { ...state, page: action.page }
    }
    default: break;
  }
  return state
}

const getListFunc = (list: Array<{ name: string, title: string, randomName: string }>) => {
  return { type: GET_LIST, list }
}
export const setPage = (page: number) => {
  return { type: SET_PAGE, page }
}

export const getList = (page = 1) => {
  return async (dispatch: any) => {
    const res = await listApi.getList(page);
    dispatch(getListFunc(res));
  }
}