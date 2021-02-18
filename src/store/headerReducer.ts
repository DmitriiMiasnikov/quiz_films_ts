
type headerItems = { name: string, text: string, link: string }

const initialStates = {
  menuItems: [
    { name: 'all', text: 'все', link: '/list/all'},
    { name: 'films', text: 'фильмы', link: '/list/films' },
    { name: 'serials', text: 'сериалы', link: '/list/serials' }
  ] as Array<headerItems>
}
export const headerReducer = (state = initialStates, action: any) => {
  switch(action.type) {
    case ('asd'): {
      return { ...state }
    }
    default: break;
  }
  return state
}