import { FETCH_ALL_PAM, CREATE_PAM, UPDATE_PAM, DELETE_PAM } from "../../constants/actionTypes";

export default (panelAssignMarks = [], action) => {
    switch (action.type) {
        case FETCH_ALL_PAM:
            return action.payload;
        case CREATE_PAM:
            return [...panelAssignMarks, action.payload];
        case UPDATE_PAM:
            return panelAssignMarks.map((panelAssignMark) => (panelAssignMark._id === action.payload._id ? action.payload : panelAssignMark));
        case DELETE_PAM:
            return panelAssignMarks.filter((panelAssignMark) => panelAssignMark._id !== action.payload);
        default:
            return panelAssignMarks;
    }
};