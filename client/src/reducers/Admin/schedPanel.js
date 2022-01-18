import { FETCH_ALL_SP, CREATE_SP, UPDATE_SP, DELETE_SP } from "../../constants/actionTypes";

export default (schedPanels = [], action) => {
    switch (action.type) {
        case FETCH_ALL_SP:
            return action.payload;
        case CREATE_SP:
            return [...schedPanels, action.payload];
        case UPDATE_SP:
            return schedPanels.map((schedPanel) => (schedPanel._id === action.payload._id ? action.payload : schedPanel));
        case DELETE_SP:
            return schedPanels.filter((schedPanel) => schedPanel._id !== action.payload);
        default:
            return schedPanels;
    }
};