// import { FETCH_ALL_PD, CREATE_PD, UPDATE_PD, DELETE_PD } from "../../constants/actionTypes";
// import * as api from "../../api/index.js";

// export const getProjectDet = () => async (dispatch) => {
//     try {
//         const { data } = await api.fetchProjectDet();

//         dispatch({ type: FETCH_ALL_PD, payload: data });
//     } catch (error) {
//         console.log(error);
//     }
// };

// export const createProjectDet = (post) => async (dispatch) => {
//     try {
//         const { data } = await api.createProjectDet(post);

//         dispatch({ type: CREATE_PD, payload: data });
//     } catch (error) {
//         console.log(error);
//     }
// };

// export const updateProjectDet = (id, post) => async (dispatch) => {
//     try {
//         const { data } = await api.updateProjectDet(id, post);

//         dispatch({ type: UPDATE_PD, payload: data });
//     } catch (error) {
//         console.log(error);
//     }
// };

// export const deleteProjectDet = (id) => async (dispatch) => {
//     try {
//         await await api.deleteProjectDet(id);

//         dispatch({ type: DELETE_PD, payload: id });
//     } catch (error) {
//         console.log(error);
//     }
// };