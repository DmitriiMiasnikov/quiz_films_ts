import { statisticsApi } from "../api/api";

const GET_STATISTICS_QUIZ = 'GET_STATISTICS_QUIZ';
const GET_STATISTICS_FILM = 'GET_STATISTICS_FILM';
const CLEAR_STATISTICS = 'CLEAR_STATISTICS';

type InitialStates = {
  statisticsQuiz: any,
  statisticsFilm: any
}

const initialStates: InitialStates = {
  statisticsQuiz: null,
  statisticsFilm: null,
}

export const statisticsReducer = (state = initialStates, action: any) => {
  switch (action.type) {
    case (GET_STATISTICS_QUIZ): {
      const newStat = { ...state.statisticsQuiz };
      newStat[action.quizName] = action.statisticsQuiz || { name: action.quizName, scores: [] };
      return { ...state, statisticsQuiz: newStat }
    }
    case (GET_STATISTICS_FILM): {
      const newStat = { ...state.statisticsFilm };
      newStat[action.filmName] = action.statisticsFilm || { name: action.filmName, rightCounter: 0, wrongCounter: 0 };
      return { ...state, statisticsFilm: newStat }
    }
    case (CLEAR_STATISTICS): {
      return {...initialStates };
    }
    default: break;
  }
  return state
}

export const clearStatistics = () => {
  return { type: CLEAR_STATISTICS }
}

const getStatisticsQuizFunc = (statisticsQuiz: any, quizName: string) => {
  return { type: GET_STATISTICS_QUIZ, statisticsQuiz, quizName }
}

const getStatisticsFilmFunc = (statisticsFilm: any, filmName: string) => {
  return { type: GET_STATISTICS_FILM, statisticsFilm, filmName }
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

export const setStatisticsFilm = (name: string, answer: string) => {
  return async (dispatch: any) => {
    const res = await statisticsApi.setStatisticsFilm(name, answer)
  }
}

export const getStatisticsFilm = (name: string) => {
  return async (dispatch: any) => {
    const res = await statisticsApi.getStatisticsFilm(name)
    dispatch(getStatisticsFilmFunc(res.data.statisticsFilm, res.data.filmName))
  }
}