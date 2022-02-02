import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper, Container } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";

import { uploadStudentList } from "../../../../actions/posts";
import useStyles from "../../../Form/styles";

const FileSubmission = () => {
    const [postData, setPostData] = useState({ file: "" });
    const [fileUpload, setFileUpload] = useState(Date.now());
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem("profile"));

    // useEffect(() => {
    //     if (post) setPostData(post);
    // }, [post]);

    const clearForm = () => {
        // setCurrentId(0);
        setPostData({ file: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(uploadStudentList({ ...postData, userrole: user?.result?.role }));
        // e.target.files = null;
        setFileUpload(Date.now());
        // setOpenPopup(false);
        // setNotify({ isOpen: true, message: "Successfully Submitted!", type: "success" });
        clearForm();
    };

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to add announcement.
                </Typography>
            </Paper>
        );
    }

    return (
        <Container>
            <form autoComplete="off" className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit} encType="multipart/form-data">
                <div className={classes.fileInput}>
                    <input key={fileUpload} id="contained-button-file" type="file" filename="studentList" accept=".csv" onChange={(e) => setPostData({ ...postData, file: e.target.files[0] })} />
                </div>
                <div style={{ display: "flex" }}>
                    <Button type="submit" className={classes.buttonSubmit} variant="contained" color="primary" size="large" fullWidth>
                        Submit
                    </Button>
                </div>
            </form>
        </Container>
    );
};

export default FileSubmission;
