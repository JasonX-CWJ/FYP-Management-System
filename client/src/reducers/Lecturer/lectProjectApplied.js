import { APPROVE_LPD_STU, FETCH_ALL_LPD_STU } from "../../constants/actionTypes";

export default (lectProjectApplied = [], action) => {
    switch (action.type) {
        case FETCH_ALL_LPD_STU:
            return action.payload;
        // case CREATE_LPD:
        //     return [...lectProjectDets, action.payload];
        // case UPDATE_LPD:
        case APPROVE_LPD_STU:
            return lectProjectApplied.filter((lectProjectApplied) => lectProjectApplied._id !== action.payload);
        // case DELETE_LPD:
        //     return lectProjectDets.filter((lectProjectDet) => lectProjectDet._id !== action.payload);
        default:
            return lectProjectApplied;
    }
};
