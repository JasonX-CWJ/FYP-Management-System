import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper, Container, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import { createLectFileSubmitted, updateLectFileSubmitted } from "../../../../actions/Lecturer/LectFileSubmitted";

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

const LectFileSubmittedForm = ({ currentId, setCurrentId, setNotify, setOpenPopup }) => {
    const [lectFSData, setlectFSData] = useState({ title: "", description: "", studname: "", selectedFile: "" });
    const lectFS = useSelector((state) => (currentId ? state.lectFileSubmitted.find((message) => message._id === currentId) : null));
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem("profile"));

    useEffect(() => {
        if (lectFS) setlectFSData(lectFS);
    }, [lectFS]);

    const clearForm = () => {
        setCurrentId(0);
        setlectFSData({ title: "", description: "", studname: "", selectedFile: "" });
    };

    useEffect(() => {
        if (currentId == null) {
            clearForm();
        } // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e);
        if (currentId === 0) {
            dispatch(createLectFileSubmitted({ ...lectFSData }));
        } else {
            dispatch(updateLectFileSubmitted(currentId, { ...lectFSData }));
        }
        setOpenPopup(false);
        setNotify({ isOpen: true, message: "Successfully Submitted!", type: "success" });
        clearForm();
    };

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to add a file
                </Typography>
            </Paper>
        );
    }

    return (
        <Container>
            <form autoComplete="off" className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? `Editing "${lectFS.title}"` : ""}</Typography>
                <TextField name="title" variant="outlined" required autoFocus label="Title" fullWidth value={lectFSData.title} onChange={(e) => setlectFSData({ ...lectFSData, title: e.target.value })} />
                <TextField name="description" variant="outlined" required label="Description" fullWidth value={lectFSData.description} onChange={(e) => setlectFSData({ ...lectFSData, description: e.target.value })} />
                <TextField name="studname" variant="outlined" required label="Student Name" fullWidth value={lectFSData.studname} onChange={(e) => setlectFSData({ ...lectFSData, studname: e.target.value })} />
                <TextField name="selectedFile" variant="outlined" required label="File" fullWidth value={lectFSData.selectedFile} onChange={(e) => setlectFSData({ ...lectFSData, selectedFile: e.target.value })} />
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

export default LectFileSubmittedForm;