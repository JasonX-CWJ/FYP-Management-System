import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper, Container, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";

import { createInfoGuide, updateInfoGuide } from "../../../../actions/infoGuideline";
import { createFileSubmissions } from "../../../../actions/Student/FileSubmission";

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
        },
    },
    paper: {
        padding: theme.spacing(2),
    },
    form: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    fileInput: {
        width: "97%",
        margin: "10px 0",
    },
}));

const FileSubmissionForm = ({ currentId, setCurrentId, setNotify, setOpenPopup, currentSubmission, setCurrentSubmission }) => {
    const [infoGuideData, setInfoGuideData] = useState({ title: "", selectedFile: "" });
    const infoGuide = useSelector((state) => (currentId ? state.infoGuideline.find((message) => message._id === currentId) : null));
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem("profile"));

    useEffect(() => {
        if (infoGuide) setInfoGuideData(infoGuide);
    }, [infoGuide]);

    const clearForm = () => {
        // setCurrentId(0);
        setCurrentSubmission({ ...currentSubmission, content: "" });
    };

    // useEffect(() => {
    //     if (currentId == null) {
    //         clearForm();
    //     } // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [currentId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setOpenPopup(false);
        setNotify({ isOpen: true, message: "Successfully Submitted!", type: "success" });
        dispatch(createFileSubmissions(user?.result?.studentData?._id, currentSubmission));
        clearForm();
        // if (infoGuideData.selectedFile === "") {
        //     setNotify({ isOpen: true, message: "No file attached!", type: "error" });
        // } else {
        //     // if (currentId === 0) {
        //     //     dispatch(createInfoGuide({ ...infoGuideData }));
        //     // } else {
        //     //     dispatch(updateInfoGuide(currentId, { ...infoGuideData }));
        //     // }
        //     setOpenPopup(false);
        //     setNotify({ isOpen: true, message: "Successfully Submitted!", type: "success" });
        //     clearForm();
        // }
    };

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to add submission.
                </Typography>
            </Paper>
        );
    }

    return (
        <Container>
            <form autoComplete="off" className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                {/* <Typography variant="h6">{currentId ? `Editing "${infoGuide.title}"` : ""}</Typography> */}
                {currentSubmission.type === "monitoring" || currentSubmission.type === "viva" ? (
                    <TextField
                        name="title"
                        variant="outlined"
                        required
                        autoFocus
                        label="Link"
                        fullWidth
                        value={currentSubmission.content}
                        onChange={(e) => setCurrentSubmission({ ...currentSubmission, content: e.target.value })}
                    />
                ) : (
                    <div className={classes.fileInput}>
                        <FileBase type="file" multiple={false} onDone={({ base64 }) => setCurrentSubmission({ ...currentSubmission, content: base64 })} />
                    </div>
                )}

                <div style={{ display: "flex" }}>
                    <Button type="submit" className={classes.buttonSubmit} variant="contained" color="primary" size="large" fullWidth>
                        Submit
                    </Button>
                    <Button variant="contained" color="secondary" size="large" onClick={clearForm} fullWidth>
                        Clear
                    </Button>
                </div>
            </form>
        </Container>
    );
};

export default FileSubmissionForm;
