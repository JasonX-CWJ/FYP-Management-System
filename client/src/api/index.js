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
export const updatePass = (formData) => API.post("/user/updatePass", formData);

export const fetchPosts = () => API.get("/posts");
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const fetchInfoGuide = () => API.get("/info");
export const createInfoGuide = (newInfoGuide) => API.post("/info", newInfoGuide);
export const updateInfoGuide = (id, updatedInfoGuide) => API.patch(`/info/${id}`, updatedInfoGuide);
export const deleteInfoGuide = (id) => API.delete(`/info/${id}`);

// PROJECT REPOSITORY
export const fetchProjectRepo = () => API.get("/projectRepo");
export const createProjectRepo = (newProjectRepo) => API.post("/projectRepo", newProjectRepo);
export const updateProjectRepo = (id, updatedProjectRepo) => API.patch(`/projectRepo/${id}`, updatedProjectRepo);
export const deleteProjectRepo = (id) => API.delete(`/projectRepo/${id}`);
export const applyProject = (projectid, studentid) => API.post(`/projectRepo/apply/${projectid}/${studentid}`);
export const approveLectProjectDet = (id, approvalStatus) => API.patch(`/projectRepo/approve/${id}`, approvalStatus);

// student section
// PROJECT DETAILS
// export const fetchProjectDet = () => API.get("/ProjectDet");
// export const createProjectDet = (newProjectDet) => API.post("/ProjectDet", newProjectDet);
// export const updateProjectDet = (id, updatedProjectDet) => API.patch(`/ProjectDet/${id}`, updatedProjectDet);
// export const deleteProjectDet = (id) => API.delete(`/ProjectDet/${id}`);

//MEETINGS
export const fetchFileSubmissions = (studentid) => API.get(`/FileSubmissions/${studentid}`);
export const createFileSubmissions = (studentid, newFileSubmissions) => API.post(`/FileSubmissions/${studentid}`, newFileSubmissions);
export const updateFileSubmissions = (id, updatedFileSubmissions) => API.patch(`/FileSubmissions/${id}`, updatedFileSubmissions);
export const deleteFileSubmissions = (id) => API.delete(`/FileSubmissions/${id}`);

// lecturer section
export const fetchLectProjectDet = () => API.get("/lectProjectDet");
export const createLectProjectDet = (newLectProjectDet) => API.post("/lectProjectDet", newLectProjectDet);
export const updateLectProjectDet = (id, updatedLectProjectDet) => API.patch(`/lectProjectDet/${id}`, updatedLectProjectDet);
export const deleteLectProjectDet = (id) => API.delete(`/lectProjectDet/${id}`);

export const fetchLectMeetings = () => API.get("/lectMeetings");
export const createLectMeetings = (newLectMeetings) => API.post("/lectMeetings", newLectMeetings);
export const updateLectMeetings = (id, updatedLectMeetings) => API.patch(`/lectMeetings/${id}`, updatedLectMeetings);
export const deleteLectMeetings = (id) => API.delete(`/lectMeetings/${id}`);
export const changeLectMeetingsStatus = (id, status) => API.patch(`/lectMeetings/change/${id}`, status);

export const fetchLectFileSubmitted = (id) => API.get(`/lectFileSubmitted/${id}`);
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

//LECTURER REPO
// export const fetchLecturerRepo = () => API.get("/lecturerRepo");
// export const createLecturerRepo = (newLecturerRepo) => API.post("/lecturerRepo", newLecturerRepo);
// export const updateLecturerRepo = (id, updatedLecturerRepo) => API.patch(`/lecturerRepo/${id}`, updatedLecturerRepo);
// export const deleteLecturerRepo = (id) => API.delete(`/lecturerRepo/${id}`);

//STUDENT REPO
// export const fetchStudentRepo = () => API.get("/studentRepo");
// export const createStudentRepo = (newStudentRepo) => API.post("/studentRepo", newStudentRepo);
// export const updateStudentRepo = (id, updatedStudentRepo) => API.patch(`/studentRepo/${id}`, updatedStudentRepo);
// export const deleteStudentRepo = (id) => API.delete(`/studentRepo/${id}`);

export const fetchLectProjectApplied = () => API.get("/lectProjectDet/mystudents");
export const approveLectProjectApplied = (id) => API.patch(`/lectProjectDet/mystudents/${id}`);

export const getLecturers = () => API.get("/general/getlecturers");
export const getStudents = () => API.get("/general/getstudents");
