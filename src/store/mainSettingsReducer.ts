
const IS_MOBILE = 'IS_MOBILE';

const initialStates = {
  isMobile: false,
}

export const mainSettingsReducer = (state = initialStates, action: any) => {
  switch (action.type) {
    case (IS_MOBILE): {
      const isMobile = /Mobile|webOS|BlackBerry|IEMobile|MeeGo|mini|Fennec|Windows Phone|Android|iP(ad|od|hone)/i.test(navigator.userAgent);
      return { ...state, isMobile: isMobile || action.width < 1100 }
    }
    default: break;
  }
  return state
}

export const setIsMobile = (width: number) => {
  return { type: IS_MOBILE, width }
}