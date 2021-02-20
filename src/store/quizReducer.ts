
const SET_CURRENT_QUIZ = 'SET_CURRENT_QUIZ';

type InitialStates = {
  currentQuiz: null | string;
}

const initialStates: InitialStates = {
  currentQuiz: null
}

export const quizReducer = (state = initialStates, action: any) => {
  switch(action.type) {
    case (SET_CURRENT_QUIZ): {
      return { ...state, currentQuiz: action.name }
    }
    default: break;
  }
  return state
}
export const setCurrentQuiz = (name: string) => {
  return { type: SET_CURRENT_QUIZ, name }
}