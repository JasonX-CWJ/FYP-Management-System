import { APPROVE_LPD_STU, FETCH_ALL_LPD_STU } from "../../constants/actionTypes";
import * as api from "../../api/index.js";

export const getLectProjectApplied = () => async (dispatch) => {
    try {
        const { data } = await api.fetchLectProjectApplied();
        dispatch({ type: FETCH_ALL_LPD_STU, payload: data });
    } catch (error) {
        console.log(error);
    }
};

// export const createLectProjectDet = (post) => async (dispatch) => {
//     try {
//         const { data } = await api.createLectProjectDet(post);

//         dispatch({ type: CREATE_LPD, payload: data });
//     } catch (error) {
//         console.log(error);
//     }
// };

// export const updateLectProjectDet = (id, post) => async (dispatch) => {
//     try {
//         const { data } = await api.updateLectProjectDet(id, post);

//         dispatch({ type: UPDATE_LPD, payload: data });
//     } catch (error) {
//         console.log(error);
//     }
// };

export const approveLectProjectApplied = (id) => async (dispatch) => {
    try {
        await api.approveLectProjectApplied(id);
        dispatch({ type: APPROVE_LPD_STU, payload: id });
    } catch (error) {
        console.log(error);
    }
};
