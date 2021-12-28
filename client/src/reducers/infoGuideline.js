import { FETCH_ALL_INFO, CREATE_INFO, UPDATE_INFO, DELETE_INFO } from "../constants/actionTypes";

export default (infoGuides = [], action) => {
    switch (action.type) {
        case FETCH_ALL_INFO:
            return action.payload;
        case CREATE_INFO:
            return [...infoGuides, action.payload];
        case UPDATE_INFO:
            return infoGuides.map((infoGuide) => (infoGuide._id === action.payload._id ? action.payload : infoGuide));
        case DELETE_INFO:
            return infoGuides.filter((infoGuide) => infoGuide._id !== action.payload);
        default:
            return infoGuides;
    }
};