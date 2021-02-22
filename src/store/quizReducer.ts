import { quizApi } from "../api/api";

const SET_CURRENT_QUIZ = 'SET_CURRENT_QUIZ';
const CLEAR = 'CLEAR';
const STEP_UP = 'STEP_UP';
const CHECK_ANSWER = 'CHECK_ANSWER';
const RESULT_TEXT = 'RESULT_TEXT';
const TOGGLE_INACTIVE_BUTTONS = 'TOGGLE_INACTIVE_BUTTONS';

type InitialStates = {
  currentQuiz: {
    name: string,
    title: string,
    randomName: string
  }[] | null,
  step: number,
  answers: Array<string>,
  resultText: string | null,
  inactiveButtons: boolean,
  hideArrow: boolean
}

const initialStates: InitialStates = {
  currentQuiz: null,
  step: 0,
  answers: [],
  resultText: null,
  inactiveButtons: false,
  hideArrow: false,
}

export const quizReducer = (state = initialStates, action: any) => {
  switch (action.type) {
    case (SET_CURRENT_QUIZ): {
      return { ...state, currentQuiz: action.quiz }
    }
    case (CLEAR): {
      return { ...initialStates }
    }
    case (STEP_UP): {
      return { ...state, step: state.step += 1 }
    }
    case (CHECK_ANSWER): {
      return {
        ...state, answers: action.answersArr.map((el: any, i: number) => {
          if (i > action.step) {
            return null
          } else if (i < action.step) {
            return state.answers[i]
          } else if (action.answer === action.currentQuiz.questions[action.step].currect.name) {
            return [true, action.item]
          } else return [false, action.item]
        })
      }
    }
    case (RESULT_TEXT): {
      return {
        ...state, resultText: {
          ru: `Верно завершено ${action.right} из ${action.all}.`,
          en: `Right answers ${action.right} from ${action.all}.`
        }
      }
    }
    case (TOGGLE_INACTIVE_BUTTONS): {
      return { ...state, inactiveButtons: state.inactiveButtons ? false : true }
    }
    default: break;
  }
  return state
}
const setCurrentQuizFunc = (quiz: any) => {
  return { type: SET_CURRENT_QUIZ, quiz }
}
export const clear = () => {
  return { type: CLEAR }
}
export const stepUp = () => {
  return { type: STEP_UP }
}
export const checkAnswer = (answer: any, step: number, answersArr: Array<string>, item: number, currentQuiz: any) => {
  return { type: CHECK_ANSWER , answer, step, answersArr, item, currentQuiz }
}
export const getResultText = (right: number, all: number) => {
  return { type: RESULT_TEXT, right, all }
}
export const toggleInactiveButtons = (toggle: boolean) => {
  return { type: TOGGLE_INACTIVE_BUTTONS, toggle }
}

export const getQuiz = (name: string) => {
  return async (dispatch: any) => {
    const res = await quizApi.getQuiz(name)
    dispatch(setCurrentQuizFunc(res.data.quiz))
  }
}