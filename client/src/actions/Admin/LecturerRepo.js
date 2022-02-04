import { FETCH_ALL_LR, CREATE_LR, UPDATE_LR, DELETE_LR } from "../../constants/actionTypes";
import * as api from "../../api/index.js";

export const getLecturerRepo = () => async (dispatch) => {
    try {
        const { data } = await api.fetchLecturerRepo();

        dispatch({ type: FETCH_ALL_LR, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const createLecturerRepo = (post) => async (dispatch) => {
    try {
        const { data } = await api.createLecturerRepo(post);

        dispatch({ type: CREATE_LR, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const updateLecturerRepo = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updateLecturerRepo(id, post);

        dispatch({ type: UPDATE_LR, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const deleteLecturerRepo = (id) => async (dispatch) => {
    try {
        await await api.deleteLecturerRepo(id);

        dispatch({ type: DELETE_LR, payload: id });
    } catch (error) {
        console.log(error);
    }
};