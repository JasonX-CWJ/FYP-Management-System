import { APPROVE_LPD } from "../../constants/actionTypes";
import * as api from "../../api/index.js";

export const approveLectProjectDet = (id) => async (dispatch) => {
    try {
        await api.approveLectProjectDet(id);
        dispatch({ type: APPROVE_LPD, payload: id });
    } catch (error) {
        console.log(error);
    }
};
