import {
    SIGN_IN_REQUEST,
    SIGN_OUT_REQUEST
} from '../constants/UserConstant'

const userSignInReducer = (state = { userInfo: {} }, action) => {
    switch (action.type) {
        case SIGN_IN_REQUEST:
            console.log(action.payload)
            return { userInfo: action.payload }
        case SIGN_OUT_REQUEST:
            return {}
        default:
            return state
    }
}

export { userSignInReducer }