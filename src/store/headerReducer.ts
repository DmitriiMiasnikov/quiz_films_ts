
type headerItems = { name: string }

const initialStates = {
  menuItems: [
    { name: 'all' },
    { name: 'films' },
    { name: 'serials' }
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