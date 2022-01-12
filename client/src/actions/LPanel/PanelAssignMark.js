import { FETCH_ALL_PAM, CREATE_PAM, UPDATE_PAM, DELETE_PAM } from "../../constants/actionTypes";
import * as api from "../../api/index.js";

export const getPanelAssignMark = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPanelAssignMark();

        dispatch({ type: FETCH_ALL_PAM, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const createPanelAssignMark = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPanelAssignMark(post);

        dispatch({ type: CREATE_PAM, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const updatePanelAssignMark = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePanelAssignMark(id, post);

        dispatch({ type: UPDATE_PAM, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const deletePanelAssignMark = (id) => async (dispatch) => {
    try {
        await await api.deletePanelAssignMark(id);

        dispatch({ type: DELETE_PAM, payload: id });
    } catch (error) {
        console.log(error);
    }
};