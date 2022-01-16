import { FETCH_ALL_PV, CREATE_PV, UPDATE_PV, DELETE_PV } from "../../constants/actionTypes";
import * as api from "../../api/index.js";

export const getPanelVote = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPanelVote();

        dispatch({ type: FETCH_ALL_PV, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const createPanelVote = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPanelVote(post);

        dispatch({ type: CREATE_PV, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const updatePanelVote = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePanelVote(id, post);

        dispatch({ type: UPDATE_PV, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const deletePanelVote = (id) => async (dispatch) => {
    try {
        await await api.deletePanelVote(id);

        dispatch({ type: DELETE_PV, payload: id });
    } catch (error) {
        console.log(error);
    }
};