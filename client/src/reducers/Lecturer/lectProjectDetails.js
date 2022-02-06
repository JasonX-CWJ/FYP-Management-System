import { FETCH_ALL_LPD, CREATE_LPD, UPDATE_LPD, DELETE_LPD, APPROVE_LPD } from "../../constants/actionTypes";

export default (lectProjectDets = [], action) => {
    switch (action.type) {
        case FETCH_ALL_LPD:
            return action.payload;
        case CREATE_LPD:
            return [...lectProjectDets, action.payload];
        case UPDATE_LPD:
        case APPROVE_LPD:
            return lectProjectDets.map((lectProjectDet) => (lectProjectDet._id === action.payload._id ? action.payload : lectProjectDet));
        case DELETE_LPD:
            return lectProjectDets.filter((lectProjectDet) => lectProjectDet._id !== action.payload);
        default:
            return lectProjectDets;
    }
};
