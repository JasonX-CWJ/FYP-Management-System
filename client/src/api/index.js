import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
    }

    return req;
});

// general section

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);

export const fetchPosts = () => API.get("/posts");
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const fetchInfoGuide = () => API.get("/info");
export const createInfoGuide = (newInfoGuide) => API.post("/info", newInfoGuide);
export const updateInfoGuide = (id, updatedInfoGuide) => API.patch(`/info/${id}`, updatedInfoGuide);
export const deleteInfoGuide = (id) => API.delete(`/info/${id}`);

// student section

// lecturer section
export const fetchLectProjectDet = () => API.get("/lectProjectDet");
export const createLectProjectDet = (newLectProjectDet) => API.post("/lectProjectDet", newLectProjectDet);
export const updateLectProjectDet = (id, updatedLectProjectDet) => API.patch(`/lectProjectDet/${id}`, updatedLectProjectDet);
export const deleteLectProjectDet = (id) => API.delete(`/lectProjectDet/${id}`);

export const fetchLectMeetings = () => API.get("/lectMeetings");
export const createLectMeetings = (newLectMeetings) => API.post("/lectMeetings", newLectMeetings);
export const updateLectMeetings = (id, updatedLectMeetings) => API.patch(`/lectMeetings/${id}`, updatedLectMeetings);
export const deleteLectMeetings = (id) => API.delete(`/lectMeetings/${id}`);

export const fetchLectFileSubmitted = () => API.get("/lectFileSubmitted");
export const createLectFileSubmitted = (newLectFileSubmitted) => API.post("/lectFileSubmitted", newLectFileSubmitted);
export const updateLectFileSubmitted = (id, updatedLectFileSubmitted) => API.patch(`/lectFileSubmitted/${id}`, updatedLectFileSubmitted);
export const deleteLectFileSubmitted = (id) => API.delete(`/lectFileSubmitted/${id}`);

//panel section
export const fetchPanelAssignMark = () => API.get("/panelAssignMark");
export const createPanelAssignMark = (newPanelAssignMark) => API.post("/panelAssignMark", newPanelAssignMark);
export const updatePanelAssignMark = (id, updatedPanelAssignMark) => API.patch(`/panelAssignMark/${id}`, updatedPanelAssignMark);
export const deletePanelAssignMark = (id) => API.delete(`/panelAssignMark/${id}`);

export const fetchPanelVote = () => API.get("/panelVote");
export const createPanelVote = (newPanelVote) => API.post("/panelVote", newPanelVote);
export const updatePanelVote = (id, updatedPanelVote) => API.patch(`/panelVote/${id}`, updatedPanelVote);
export const deletePanelVote = (id) => API.delete(`/panelVote/${id}`);


//admin section
export const fetchSchedPanel = () => API.get("/schedPanel");
export const createSchedPanel = (newSchedPanel) => API.post("/schedPanel", newSchedPanel);
export const updateSchedPanel = (id, updatedSchedPanel) => API.patch(`/schedPanel/${id}`, updatedSchedPanel);
export const deleteSchedPanel = (id) => API.delete(`/schedPanel/${id}`);

export const fetchRubricWeight = () => API.get("/rubricWeight");
export const createRubricWeight = (newRubricWeight) => API.post("/rubricWeight", newRubricWeight);
export const updateRubricWeight = (id, updatedRubricWeight) => API.patch(`/rubricWeight/${id}`, updatedRubricWeight);
export const deleteRubricWeight = (id) => API.delete(`/rubricWeight/${id}`);