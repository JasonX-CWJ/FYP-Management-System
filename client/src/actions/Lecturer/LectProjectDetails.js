import { FETCH_ALL_LPD, CREATE_LPD, UPDATE_LPD, DELETE_LPD } from "../../constants/actionTypes";
import * as api from "../../api/index.js";

export const getLectProjectDet = () => async (dispatch) => {
    try {
        const { data } = await api.fetchLectProjectDet();

        dispatch({ type: FETCH_ALL_LPD, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const createLectProjectDet = (post) => async (dispatch) => {
    try {
        const { data } = await api.createLectProjectDet(post);

        dispatch({ type: CREATE_LPD, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const updateLectProjectDet = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updateLectProjectDet(id, post);

        dispatch({ type: UPDATE_LPD, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const deleteLectProjectDet = (id) => async (dispatch) => {
    try {
        await await api.deleteLectProjectDet(id);

        dispatch({ type: DELETE_LPD, payload: id });
    } catch (error) {
        console.log(error);
    }
};
