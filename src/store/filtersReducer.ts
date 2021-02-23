const SET_CURRENT_FILTER = 'SET_CURRENT_FILTER';

type InitialStates = {
  filters: {
    name: string,
    title: string
  }[],
  currentFilter: string
}

const initialStates: InitialStates = {
  filters: [
    {name: 'animation', title: 'Анимация'},
    {name: 'action', title: 'Боевики'},
    {name: 'musical', title: 'Мюзиклы'},
    {name: 'western', title: 'Вестерны'},
    {name: 'war', title: 'Военные'},
    {name: 'historical', title: 'Исторические'},
    {name: 'fantasy', title: 'Фентези'},
    {name: 'comedy', title: 'Комедии'},
    {name: 'drama', title: 'Драмы'},
    {name: 'melodrama', title: 'Мелодрамы'},
    {name: 'horror', title: 'Ужасы'},
  ],
  currentFilter: 'no'
}

export const filtersReducer = (state = initialStates, action: any) => {
  switch (action.type) {
    case (SET_CURRENT_FILTER): {
      return { ...state, currentFilter: action.currentFilter }
    }
    default: break;
  }
  return state
}

export const setCurrentFilter = (currentFilter: string) => {
  return { type: SET_CURRENT_FILTER, currentFilter }
}
