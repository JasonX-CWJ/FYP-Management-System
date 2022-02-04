import { FETCH_ALL_PR, CREATE_PR, UPDATE_PR, DELETE_PR } from "../../constants/actionTypes";
import * as api from "../../api/index.js";

export const getProjectRepo = () => async (dispatch) => {
    try {
        const { data } = await api.fetchProjectRepo();

        dispatch({ type: FETCH_ALL_PR, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const createProjectRepo = (post) => async (dispatch) => {
    try {
        const { data } = await api.createProjectRepo(post);

        dispatch({ type: CREATE_PR, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const updateProjectRepo = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updateProjectRepo(id, post);

        dispatch({ type: UPDATE_PR, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const deleteProjectRepo = (id) => async (dispatch) => {
    try {
        await await api.deleteProjectRepo(id);

        dispatch({ type: DELETE_PR, payload: id });
    } catch (error) {
        console.log(error);
    }
};