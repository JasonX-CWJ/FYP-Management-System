import { AUTH, ERROR, UPDATE_PASS } from "../constants/actionTypes";
import * as api from "../api/index.js";
import ROLE from "../constants/userRole";

export const signin = (formData, router) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);

        dispatch({ type: AUTH, data });

        if (data.result.isFirstLogin) {
            console.log(true);
            router.push("/reset-password");
        } else {
            // Change the routes here
            switch (data.result.role) {
                case ROLE.STUDENT:
                    router.push("/student");
                    break;
                case ROLE.LECTURER:
                    router.push("/lecturer");
                    break;
                case ROLE.ADMIN:
                    router.push("/admin");
                    break;
            }
            window.location.reload();
        }
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

export const updatePass = (formData, router) => async (dispatch) => {
    try {
        const { data } = await api.updatePass(formData);
        dispatch({ type: UPDATE_PASS, data });
        router.push("/");
        window.location.reload();
    } catch (error) {
        if (error.response) {
            let errorMessage = error.response.data.message;
            dispatch({ type: ERROR, errorMessage });
        }
    }
};
