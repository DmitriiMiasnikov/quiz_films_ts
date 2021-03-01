import { statisticsApi } from "../api/api";

const GET_STATISTICS_QUIZ = 'GET_STATISTICS_QUIZ';

type InitialStates = {
  statisticsQuiz: any
}

const initialStates: InitialStates = {
  statisticsQuiz: null,
}

export const statisticsReducer = (state = initialStates, action: any) => {
  switch (action.type) {
    case (GET_STATISTICS_QUIZ): {
      const newStat = { ...state.statisticsQuiz };
      newStat[action.quizName] = action.statisticsQuiz || { name: action.quizName, scores: [] };
      return { ...state, statisticsQuiz: newStat }
    }
    default: break;
  }
  return state
}

const getStatisticsQuizFunc = (statisticsQuiz: any, quizName: string) => {
  return { type: GET_STATISTICS_QUIZ, statisticsQuiz, quizName }
}

export const setStatisticsQuiz = (name: string, score: number) => {
  return async (dispatch: any) => {
    const res = await statisticsApi.setStatisticsQuiz(name, score)
  }
}

export const getStatisticsQuiz = (name: string) => {
  return async (dispatch: any) => {
    const res = await statisticsApi.getStatisticsQuiz(name)
    dispatch(getStatisticsQuizFunc(res.data.statisticsQuiz, res.data.quizName))
  }
}