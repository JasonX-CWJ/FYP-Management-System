import { FETCH_ALL_LFS, CREATE_LFS, UPDATE_LFS, DELETE_LFS } from "../../constants/actionTypes";

export default (lectFileSubmitteds = [], action) => {
    switch (action.type) {
        case FETCH_ALL_LFS:
            return action.payload;
        case CREATE_LFS:
            return [...lectFileSubmitteds, action.payload];
        case UPDATE_LFS:
            return lectFileSubmitteds.map((lectFileSubmitted) => (lectFileSubmitted._id === action.payload._id ? action.payload : lectFileSubmitted));
        case DELETE_LFS:
            return lectFileSubmitteds.filter((lectFileSubmitted) => lectFileSubmitted._id !== action.payload);
        default:
            return lectFileSubmitteds;
    }
};