import { FETCH_ALL_SP, CREATE_SP, UPDATE_SP, DELETE_SP } from "../../constants/actionTypes";
import * as api from "../../api/index.js";

export const getSchedPanel = () => async (dispatch) => {
    try {
        const { data } = await api.fetchSchedPanel();

        dispatch({ type: FETCH_ALL_SP, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const createSchedPanel = (post) => async (dispatch) => {
    try {
        const { data } = await api.createSchedPanel(post);

        dispatch({ type: CREATE_SP, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const updateSchedPanel = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updateSchedPanel(id, post);

        dispatch({ type: UPDATE_SP, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const deleteSchedPanel = (id) => async (dispatch) => {
    try {
        await await api.deleteSchedPanel(id);

        dispatch({ type: DELETE_SP, payload: id });
    } catch (error) {
        console.log(error);
    }
};