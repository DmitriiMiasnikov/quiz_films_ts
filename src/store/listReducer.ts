import { listApi } from './../api/api';

const GET_LIST = 'GET_LIST';
const SET_PAGE = 'SET_PAGE';
const SET_CATALOG = 'SET_CATALOG';
const CLEAR_LIST = 'CLEAR_LIST';

type InitialStates = {
  list: {
    name: string,
    title: string,
    randomName: string
  }[],
  page: number,
  catalog: string,
  allCatalogs: string[]
}

const initialStates: InitialStates = {
  list: [],
  allCatalogs: ['films', 'serials'],
  catalog: 'films',
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
    case (SET_CATALOG): {
      return { ...state, catalog: action.catalog }
    }
    case (CLEAR_LIST): {
      return { ...state, list: [], page: 1 }
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
export const setCatalog = (catalog: string) => {
  return { type: SET_CATALOG, catalog }
}
export const clearList = () => {
  return { type: CLEAR_LIST }
}

export const getList = (page = 1, catalog: string, currentFilter: string) => {
  return async (dispatch: any) => {
    const res = await listApi.getList(page, catalog, currentFilter);
    dispatch(getListFunc(res));
  }
}