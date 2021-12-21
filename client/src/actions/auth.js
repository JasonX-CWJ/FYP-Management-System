import { AUTH, ERROR } from "../constants/actionTypes";
import * as api from "../api/index.js";

export const signin = (formData, router) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);

        dispatch({ type: AUTH, data });

        router.push("/");
        window.location.reload();
    } catch (error) {
        if (error.response) {
            let errorMessage = error.response.data.message;
            dispatch({ type: ERROR, errorMessage });
        }
    }
};

export const signup = (formData, router) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);

        dispatch({ type: AUTH, data });

        router.push("/");
        window.location.reload();
    } catch (error) {
        if (error.response) {
            let errorMessage = error.response.data.message;
            dispatch({ type: ERROR, errorMessage });
        }
    }
};
