import { FETCH_ALL_SR, CREATE_SR, UPDATE_SR, DELETE_SR } from "../../constants/actionTypes";

export default (studentRepos = [], action) => {
    switch (action.type) {
        case FETCH_ALL_SR:
            return action.payload;
        case CREATE_SR:
            return [...studentRepos, action.payload];
        case UPDATE_SR:
            return studentRepos.map((studentRepo) => (studentRepo._id === action.payload._id ? action.payload : studentRepo));
        case DELETE_SR:
            return studentRepos.filter((studentRepo) => studentRepo._id !== action.payload);
        default:
            return studentRepos;
    }
};