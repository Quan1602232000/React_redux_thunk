import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { userSignInReducer } from './reducers/UserReducer';
import thunk from 'redux-thunk';
import {
    GetTodolistReducer,
    GetTodolistByIdReducer
} from './reducers/TodolistReducer';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const initialState = {
    userSignIn: {
        userInfo: localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null,
    },
};
const reducer = combineReducers({
    GetTodolist: GetTodolistReducer,
    GetTodolistById: GetTodolistByIdReducer,
    userSignIn: userSignInReducer
})
const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);
export default store;