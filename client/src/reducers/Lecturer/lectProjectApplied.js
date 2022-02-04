import { APPROVE_LPD_STU, FETCH_ALL_LPD_STU } from "../../constants/actionTypes";

export default (lectProjectApplied = [], action) => {
    switch (action.type) {
        case FETCH_ALL_LPD_STU:
            return action.payload;
        // case CREATE_LPD:
        //     return [...lectProjectDets, action.payload];
        // case UPDATE_LPD:
        case APPROVE_LPD_STU:
            console.log(action.payload);
            return lectProjectApplied.map((lectProjectApplied) => (lectProjectApplied._id === action.payload._id ? action.payload : lectProjectApplied));
        // case DELETE_LPD:
        //     return lectProjectDets.filter((lectProjectDet) => lectProjectDet._id !== action.payload);
        default:
            return lectProjectApplied;
    }
};
