import { FETCH_ALL_STUDENT } from "../constants/actionTypes";
import * as api from "../api/index.js";

//TEMPORARY STUFF
export const uploadStudentList = (data) => async (dispatch) => {
    try {
        console.log(data);
        const formData = new FormData();

        formData.append("file", data.file);
        formData.append("userrole", data.userrole);
        const result = await api.uploadStudentList(formData);
    } catch (error) {
        console.log(error);
    }
};

export const getStudents = () => async (dispatch) => {
    try {
        const { data } = await api.fetchStudentList();
        dispatch({ type: FETCH_ALL_STUDENT, payload: data });
        console.log("yes");
    } catch (error) {
        console.log(error);
    }
};
