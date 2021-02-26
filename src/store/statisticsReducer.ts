import { statisticsApi } from "../api/api";

// const SET_CURRENT_QUIZ = 'SET_CURRENT_QUIZ';

type InitialStates = {
  // currentQuiz: {
  //   name: string,
  //   questions: []
  // }[] | null,
}

const initialStates: InitialStates = {
  // currentQuiz: null,
}

export const statisticsReducer = (state = initialStates, action: any) => {
  switch (action.type) {
    // case (SET_CURRENT_QUIZ): {
    //   return { ...state, currentQuiz: action.quiz }
    // }
    default: break;
  }
  return state
}
// const setCurrentQuizFunc = (quiz: any) => {
//   return { type: SET_CURRENT_QUIZ, quiz }
// }

export const setStatisticsQuiz = (name: string, score: number) => {
  return async (dispatch: any) => {
    const res = await statisticsApi.setStatisticsQuiz(name, score)
    // dispatch(setCurrentQuizFunc(res.data.quiz))
  }
}