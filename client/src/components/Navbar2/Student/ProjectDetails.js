import React, { useEffect, useState } from "react";
import { Container, Paper, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useDispatch, useSelector } from "react-redux";

import { getStudents } from "../../../actions/student";

const ProjectDetails = () => {
    const handleOnChange = ({ target }) => console.log(target.value);
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("profile")); // get current user

    const [postData, setPostData] = useState("");
    const userList = useSelector((state) => state.students); //selector to get all posts using the useEffect
    const [currentId, setCurrentId] = useState(0); //state to fetch the correct announcement post
    const [openPopup, setOpenPopup] = useState(false); //state for the popup dialog to add annoucement

    //Get all announcement posts
    useEffect(() => {
        dispatch(getStudents());
    }, [dispatch]);

    const onSelectChoice = (e, newValue) => {
        if (newValue === null) {
            setPostData({ ...postData, matricNo: "", department: "" });
        } else {
            setPostData(newValue);
        }
    };
    return (
        <Paper>
            <Autocomplete
                options={userList}
                getOptionLabel={(option) => option.name}
                style={{ width: 300 }}
                onChange={onSelectChoice}
                renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" fullWidth />}
            />

            <TextField
                required
                name="matricNo"
                variant="outlined"
                label="Matric No"
                fullWidth
                multiline
                rows={4}
                value={postData.matricNo || ""}
                onChange={(e) => setPostData({ ...postData, matricNo: e.target.value })}
            />
            <TextField
                name="department"
                required
                variant="outlined"
                label="Department"
                fullWidth
                multiline
                value={postData.department || ""}
                onChange={(e) => setPostData({ ...postData, department: e.target.value })}
            />
        </Paper>
    );
};

export default ProjectDetails;
