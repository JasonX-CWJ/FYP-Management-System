import { FETCH_ALL_INFO, CREATE_INFO, UPDATE_INFO, DELETE_INFO } from "../constants/actionTypes";
import * as api from "../api/index.js";

export const getInfoGuide = () => async (dispatch) => {
    try {
        const { data } = await api.fetchInfoGuide();

        dispatch({ type: FETCH_ALL_INFO, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const createInfoGuide = (post) => async (dispatch) => {
    try {
        const { data } = await api.createInfoGuide(post);

        dispatch({ type: CREATE_INFO, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const updateInfoGuide = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updateInfoGuide(id, post);

        dispatch({ type: UPDATE_INFO, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const deleteInfoGuide = (id) => async (dispatch) => {
    try {
        await await api.deleteInfoGuide(id);

        dispatch({ type: DELETE_INFO, payload: id });
    } catch (error) {
        console.log(error);
    }
};
