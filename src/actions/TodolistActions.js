import {
    GET_TODOLIST_REQUEST,
    GET_TODOLIST_SUCCESS,
    GET_TODOLIST_FAIL,
    GET_TODOLIST_COMPLETED_REQUEST,
    GET_TODOLIST_COMPLETED_SUCCESS,
    GET_TODOLIST_COMPLETED_FAIL,
    PATCH_STATUS_TODOLIST_REQUEST,
    PATCH_STATUS_TODOLIST_SUCCESS,
    PATCH_STATUS_TODOLIST_FAIL,
    GET_TODOLIST_BY_ID_REQUEST,
    GET_TODOLIST_BY_ID_SUCCESS,
    GET_TODOLIST_BY_ID_FAIL,
    PATCH_TODOLIST_REQUEST,
    PATCH_TODOLIST_SUCCESS,
    PATCH_TODOLIST_FAIL,
    DELETE_TODOLIST_REQUEST,
    DELETE_TODOLIST_SUCCESS,
    DELETE_TODOLIST_FAIL,
    POST_TODOLIST_REQUEST,
    POST_TODOLIST_SUCCESS,
    POST_TODOLIST_FAIL
} from '../constants/TodolistContant';
import axios from 'axios';

const url = "http://localhost:4000/api/Todolist"

const getTodolistItem = () => async (dispatch) => {
    try {
        dispatch({ type: GET_TODOLIST_REQUEST });
        const { data } = await axios.get(`${url}`);
        dispatch({ type: GET_TODOLIST_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: GET_TODOLIST_FAIL, payload: error.message });
    }
}

const getTodolistItemById = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_TODOLIST_BY_ID_REQUEST, payload: id });
        const { data } = await axios.get(`${url}/${id}`);
        dispatch({ type: GET_TODOLIST_BY_ID_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: GET_TODOLIST_BY_ID_FAIL, payload: error.message });
    }
}

const getTodolistItemCompleted = () => async (dispatch) => {
    try {
        dispatch({ type: GET_TODOLIST_COMPLETED_REQUEST });
        const { data } = await axios.get(`${url}/?status=Completed&status=Canceled`);
        dispatch({ type: GET_TODOLIST_COMPLETED_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: GET_TODOLIST_COMPLETED_FAIL, payload: error.message });
    }
}

const PatchStatusTodolist = (status, id) => async (dispatch) => {
    try {
        dispatch({ type: PATCH_STATUS_TODOLIST_REQUEST, payload: { status, id } });
        const { data } = await axios.patch(`${url}/${id}`, { status });
        dispatch({ type: PATCH_STATUS_TODOLIST_SUCCESS, payload: data });
        const dataReder = await axios.get(`${url}`);
        dispatch({ type: GET_TODOLIST_SUCCESS, payload: dataReder.data });
    }
    catch (error) {
        dispatch({ type: PATCH_STATUS_TODOLIST_FAIL, payload: error.message });
    }
}

const PatchTodolistByid = (id, title, status, priority, description) => async (dispatch) => {
    try {
        dispatch({ type: PATCH_TODOLIST_REQUEST, payload: { id, title, status, priority, description } });
        const { data } = await axios.patch(`${url}/${id}`, { title, status, priority, description });
        dispatch({ type: PATCH_TODOLIST_SUCCESS, payload: data });
        const databyid = await axios.get(`${url}/${id}`);
        dispatch({ type: GET_TODOLIST_BY_ID_SUCCESS, payload: databyid.data });
    }
    catch (error) {
        dispatch({ type: PATCH_TODOLIST_FAIL, payload: error.message });
    }
}

const DeleteTodolistByid = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_TODOLIST_REQUEST, payload: id });
        const { data } = await axios.delete(`${url}/${id}`);
        dispatch({ type: DELETE_TODOLIST_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: DELETE_TODOLIST_FAIL, payload: error.message });
    }
}

const PostTodolist = (title, status, priority, description, create_Date) => async (dispatch) => {
    try {
        dispatch({ type: POST_TODOLIST_REQUEST, payload: { title, status, priority, description, create_Date } });
        const { data } = await axios.post(`${url}`, { title, status, priority, description, create_Date });
        dispatch({ type: POST_TODOLIST_SUCCESS, payload: data });
        const dataReder = await axios.get(`${url}`);
        dispatch({ type: GET_TODOLIST_SUCCESS, payload: dataReder.data });
    }
    catch (error) {
        dispatch({ type: POST_TODOLIST_FAIL, payload: error.message });
    }
}

export {
    getTodolistItem,
    getTodolistItemCompleted,
    PatchStatusTodolist,
    getTodolistItemById,
    PatchTodolistByid,
    DeleteTodolistByid,
    PostTodolist,
}
