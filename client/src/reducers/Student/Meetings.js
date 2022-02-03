import { FETCH_ALL_M, CREATE_M, UPDATE_M, DELETE_M } from "../../constants/actionTypes";

export default (Meetings = [], action) => {
    switch (action.type) {
        case FETCH_ALL_M:
            return action.payload;
        case CREATE_M:
            return [...Meetings, action.payload];
        case UPDATE_M:
            return Meetings.map((Meeting) => (Meeting._id === action.payload._id ? action.payload : Meeting));
        case DELETE_M:
            return Meetings.filter((Meeting) => Meeting._id !== action.payload);
        default:
            return Meetings;
    }
};