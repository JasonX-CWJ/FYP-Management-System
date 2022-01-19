import { FETCH_ALL_RW, CREATE_RW, UPDATE_RW, DELETE_RW } from "../../constants/actionTypes";
import * as api from "../../api/index.js";

export const getRubricWeight = () => async (dispatch) => {
    try {
        const { data } = await api.fetchRubricWeight();

        dispatch({ type: FETCH_ALL_RW, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const createRubricWeight = (post) => async (dispatch) => {
    try {
        const { data } = await api.createRubricWeight(post);

        dispatch({ type: CREATE_RW, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const updateRubricWeight = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updateRubricWeight(id, post);

        dispatch({ type: UPDATE_RW, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const deleteRubricWeight = (id) => async (dispatch) => {
    try {
        await await api.deleteRubricWeight(id);

        dispatch({ type: DELETE_RW, payload: id });
    } catch (error) {
        console.log(error);
    }
};