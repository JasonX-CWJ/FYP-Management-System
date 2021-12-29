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

//admin section