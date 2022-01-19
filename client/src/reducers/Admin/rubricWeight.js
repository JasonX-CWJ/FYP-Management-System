import { FETCH_ALL_RW, CREATE_RW, UPDATE_RW, DELETE_RW } from "../../constants/actionTypes";

export default (rubricWeights = [], action) => {
    switch (action.type) {
        case FETCH_ALL_RW:
            return action.payload;
        case CREATE_RW:
            return [...rubricWeights, action.payload];
        case UPDATE_RW:
            return rubricWeights.map((rubricWeight) => (rubricWeight._id === action.payload._id ? action.payload : rubricWeight));
        case DELETE_RW:
            return rubricWeights.filter((rubricWeight) => rubricWeight._id !== action.payload);
        default:
            return rubricWeights;
    }
};