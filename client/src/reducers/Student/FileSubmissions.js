import { FETCH_ALL_F, CREATE_F, UPDATE_F, DELETE_F } from "../../constants/actionTypes";

export default (Files = "", action) => {
    switch (action.type) {
        case FETCH_ALL_F:
            return action.payload;
        case CREATE_F:
            return [...Files, action.payload];
        case UPDATE_F:
            return Files.map((Meeting) => (Meeting._id === action.payload._id ? action.payload : Meeting));
        case DELETE_F:
            return Files.filter((Meeting) => Meeting._id !== action.payload);
        default:
            return Files;
    }
};
