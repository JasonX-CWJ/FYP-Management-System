import { FETCH_ALL_M, CREATE_M, UPDATE_M, DELETE_M } from "../../constants/actionTypes";
import * as api from "../../api/index.js";

export const getMeetings = () => async (dispatch) => {
    try {
        const { data } = await api.fetchMeetings();

        dispatch({ type: FETCH_ALL_M, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const createMeetings = (post) => async (dispatch) => {
    try {
        const { data } = await api.createMeetings(post);

        dispatch({ type: CREATE_M, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const updateMeetings = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updateMeetings(id, post);

        dispatch({ type: UPDATE_M, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const deleteMeetings = (id) => async (dispatch) => {
    try {
        await await api.deleteMeetings(id);

        dispatch({ type: DELETE_M, payload: id });
    } catch (error) {
        console.log(error);
    }
};
