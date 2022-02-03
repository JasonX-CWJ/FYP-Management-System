import { FETCH_ALL_PD, CREATE_PD, UPDATE_PD, DELETE_PD } from "../../constants/actionTypes";

export default (ProjectDets = [], action) => {
    switch (action.type) {
        case FETCH_ALL_PD:
            return action.payload;
        case CREATE_PD:
            return [...ProjectDets, action.payload];
        case UPDATE_PD:
            return ProjectDets.map((ProjectDet) => (ProjectDet._id === action.payload._id ? action.payload : ProjectDet));
        case DELETE_PD:
            return ProjectDets.filter((ProjectDet) => ProjectDet._id !== action.payload);
        default:
            return ProjectDets;
    }
};