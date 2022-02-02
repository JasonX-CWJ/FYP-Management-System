import { FETCH_ALL_STUDENT, CREATE_STUDENT, UPDATE_STUDENT, DELETE_STUDENT } from "../constants/actionTypes";

export default (students = [], action) => {
    switch (action.type) {
        case FETCH_ALL_STUDENT:
            return action.payload;
        case CREATE_STUDENT:
            return [...students, action.payload];
        case UPDATE_STUDENT:
            return students.map((student) => (student._id === action.payload._id ? action.payload : student));
        case DELETE_STUDENT:
            return students.filter((student) => student._id !== action.payload);
        default:
            return students;
    }
};
