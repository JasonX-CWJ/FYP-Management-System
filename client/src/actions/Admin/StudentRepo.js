import { FETCH_ALL_SR, CREATE_SR, UPDATE_SR, DELETE_SR } from "../../constants/actionTypes";
import * as api from "../../api/index.js";

export const getStudentRepo = () => async (dispatch) => {
    try {
        const { data } = await api.fetchStudentRepo();

        dispatch({ type: FETCH_ALL_SR, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const createStudentRepo = (post) => async (dispatch) => {
    try {
        const { data } = await api.createStudentRepo(post);

        dispatch({ type: CREATE_SR, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const updateStudentRepo = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updateStudentRepo(id, post);

        dispatch({ type: UPDATE_SR, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const deleteStudentRepo = (id) => async (dispatch) => {
    try {
        await await api.deleteStudentRepo(id);

        dispatch({ type: DELETE_SR, payload: id });
    } catch (error) {
        console.log(error);
    }
};