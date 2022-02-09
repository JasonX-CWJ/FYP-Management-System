import { FETCH_ALL_LM, CREATE_LM, UPDATE_LM, DELETE_LM, CHANGE_LM_STAT } from "../../constants/actionTypes";
import * as api from "../../api/index.js";

export const getLectMeetings = () => async (dispatch) => {
    try {
        const { data } = await api.fetchLectMeetings();

        dispatch({ type: FETCH_ALL_LM, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const createLectMeetings = (post) => async (dispatch) => {
    try {
        const { data } = await api.createLectMeetings(post);

        dispatch({ type: CREATE_LM, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const updateLectMeetings = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updateLectMeetings(id, post);

        dispatch({ type: UPDATE_LM, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const deleteLectMeetings = (id) => async (dispatch) => {
    try {
        await await api.deleteLectMeetings(id);

        dispatch({ type: DELETE_LM, payload: id });
    } catch (error) {
        console.log(error);
    }
};

export const changeLectMeetingsStatus = (id, status) => async (dispatch) => {
    try {
        const { data } = await api.changeLectMeetingsStatus(id, status);
        // console.log(data);
        dispatch({ type: CHANGE_LM_STAT, payload: data });
    } catch (error) {
        console.log(error);
    }
};
