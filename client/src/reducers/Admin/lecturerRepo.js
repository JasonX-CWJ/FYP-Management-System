import { FETCH_ALL_LR, CREATE_LR, UPDATE_LR, DELETE_LR } from "../../constants/actionTypes";

export default (lecturerRepos = [], action) => {
    switch (action.type) {
        case FETCH_ALL_LR:
            return action.payload;
        case CREATE_LR:
            return [...lecturerRepos, action.payload];
        case UPDATE_LR:
            return lecturerRepos.map((lecturerRepo) => (lecturerRepo._id === action.payload._id ? action.payload : lecturerRepo));
        case DELETE_LR:
            return lecturerRepos.filter((lecturerRepo) => lecturerRepo._id !== action.payload);
        default:
            return lecturerRepos;
    }
};