import { FETCH_ALL_PR, CREATE_PR, UPDATE_PR, DELETE_PR } from "../../constants/actionTypes";

export default (projectRepos = [], action) => {
    switch (action.type) {
        case FETCH_ALL_PR:
            return action.payload;
        case CREATE_PR:
            return [...projectRepos, action.payload];
        case UPDATE_PR:
            return projectRepos.map((projectRepo) => (projectRepo._id === action.payload._id ? action.payload : projectRepo));
        case DELETE_PR:
            return projectRepos.filter((projectRepo) => projectRepo._id !== action.payload);
        default:
            return projectRepos;
    }
};