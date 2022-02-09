import { FETCH_ALL_LM, CREATE_LM, UPDATE_LM, DELETE_LM, CHANGE_LM_STAT } from "../../constants/actionTypes";

export default (lectMeetings = [], action) => {
    switch (action.type) {
        case FETCH_ALL_LM:
            return action.payload;
        case CREATE_LM:
            return [...lectMeetings, action.payload];
        case UPDATE_LM:
        case CHANGE_LM_STAT:
            return lectMeetings.map((lectMeeting) => (lectMeeting._id === action.payload._id ? action.payload : lectMeeting));
        case DELETE_LM:
            return lectMeetings.filter((lectMeeting) => lectMeeting._id !== action.payload);
        default:
            return lectMeetings;
    }
};
