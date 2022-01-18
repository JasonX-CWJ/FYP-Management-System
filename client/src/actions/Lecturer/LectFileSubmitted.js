import { FETCH_ALL_LFS, CREATE_LFS, UPDATE_LFS, DELETE_LFS } from "../../constants/actionTypes";
import * as api from "../../api/index.js";

export const getLectFileSubmitted = () => async (dispatch) => {
    try {
        const { data } = await api.fetchLectFileSubmitted();

        dispatch({ type: FETCH_ALL_LFS, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const createLectFileSubmitted = (post) => async (dispatch) => {
    try {
        const { data } = await api.createLectFileSubmitted(post);

        dispatch({ type: CREATE_LFS, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const updateLectFileSubmitted = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updateLectFileSubmitted(id, post);

        dispatch({ type: UPDATE_LFS, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const deleteLectFileSubmitted = (id) => async (dispatch) => {
    try {
        await await api.deleteLectFileSubmitted(id);

        dispatch({ type: DELETE_LFS, payload: id });
    } catch (error) {
        console.log(error);
    }
};