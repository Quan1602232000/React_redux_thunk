import {
    SIGN_IN_REQUEST,
    SIGN_OUT_REQUEST
} from '../constants/UserConstant'

const SignInApp = (username, password) => (dispatch, getState) => {
    dispatch({ type: SIGN_IN_REQUEST, payload: { username, password } })
    localStorage.setItem('userInfo', JSON.stringify(getState().userSignIn.userInfo))
}

const SignOutApp = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: SIGN_OUT_REQUEST })
}

export {
    SignInApp,
    SignOutApp
}