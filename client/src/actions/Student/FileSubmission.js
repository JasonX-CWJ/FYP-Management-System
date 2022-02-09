import { FETCH_ALL_F, CREATE_F, UPDATE_F, DELETE_F } from "../../constants/actionTypes";
import * as api from "../../api/index.js";

export const getFileSubmissions = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchFileSubmissions(id);

        dispatch({ type: FETCH_ALL_F, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const createFileSubmissions = (post) => async (dispatch) => {
    try {
        const { data } = await api.createFileSubmissions(post);

        dispatch({ type: CREATE_F, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const updateFileSubmissions = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updateFileSubmissions(id, post);

        dispatch({ type: UPDATE_F, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const deleteFileSubmissions = (id) => async (dispatch) => {
    try {
        await await api.deleteFileSubmissions(id);

        dispatch({ type: DELETE_F, payload: id });
    } catch (error) {
        console.log(error);
    }
};
