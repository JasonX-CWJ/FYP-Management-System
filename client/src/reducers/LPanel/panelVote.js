import { FETCH_ALL_PV, CREATE_PV, UPDATE_PV, DELETE_PV } from "../../constants/actionTypes";

export default (panelVotes = [], action) => {
    switch (action.type) {
        case FETCH_ALL_PV:
            return action.payload;
        case CREATE_PV:
            return [...panelVotes, action.payload];
        case UPDATE_PV:
            return panelVotes.map((panelVote) => (panelVote._id === action.payload._id ? action.payload : panelVote));
        case DELETE_PV:
            return panelVotes.filter((panelVote) => panelVote._id !== action.payload);
        default:
            return panelVotes;
    }
};