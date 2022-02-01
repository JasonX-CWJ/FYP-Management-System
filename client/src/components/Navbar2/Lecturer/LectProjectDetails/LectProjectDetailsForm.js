import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper, Container, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import { createLectProjectDet, updateLectProjectDet } from "../../../../actions/Lecturer/LectProjectDetails";

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

const LectProjectDetailsForm = ({ currentId, setCurrentId, setNotify, setOpenPopup }) => {
    const [lectPDData, setlectPDData] = useState({ department: "", semester: "", session: "", title: "", description: "", potStakeholder: "", tool: "", noOfStud: "", status: "pending" });
    const lectPD = useSelector((state) => (currentId ? state.lectProjectDetails.find((message) => message._id === currentId) : null));
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem("profile"));

    useEffect(() => {
        if (lectPD) setlectPDData(lectPD);
    }, [lectPD]);

    const clearForm = () => {
        setCurrentId(0);
        setlectPDData({ department: "", semester: "", session: "", title: "", description: "", potStakeholder: "", tool: "", noOfStud: "" });
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
            dispatch(createLectProjectDet({ ...lectPDData }));
        } else {
            dispatch(updateLectProjectDet(currentId, { ...lectPDData }));
        }
        setOpenPopup(false);
        setNotify({ isOpen: true, message: "Successfully Submitted!", type: "success" });
        clearForm();
    };

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to add a new project detail.
                </Typography>
            </Paper>
        );
    }

    return (
        <Container>
            <form autoComplete="off" className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? `Editing "${lectPD.title}"` : ""}</Typography>
                <TextField name="department" variant="outlined" required autoFocus label="Department" fullWidth value={lectPDData.department} onChange={(e) => setlectPDData({ ...lectPDData, department: e.target.value })} />
                <TextField name="semester" variant="outlined" required label="Semester" fullWidth value={lectPDData.semester} onChange={(e) => setlectPDData({ ...lectPDData, semester: e.target.value })} />
                <TextField name="session" variant="outlined" required label="Session" fullWidth value={lectPDData.session} onChange={(e) => setlectPDData({ ...lectPDData, session: e.target.value })} />
                <TextField name="title" variant="outlined" required label="Title" fullWidth value={lectPDData.title} onChange={(e) => setlectPDData({ ...lectPDData, title: e.target.value })} />
                <TextField name="description" variant="outlined" required label="Description" fullWidth value={lectPDData.description} onChange={(e) => setlectPDData({ ...lectPDData, description: e.target.value })} />
                <TextField name="potStakeholder" variant="outlined" required label="Potential Stakeholder" fullWidth value={lectPDData.potStakeholder} onChange={(e) => setlectPDData({ ...lectPDData, potStakeholder: e.target.value })} />
                <TextField name="tool" variant="outlined" required label="Tool" fullWidth value={lectPDData.tool} onChange={(e) => setlectPDData({ ...lectPDData, tool: e.target.value })} />
                <TextField name="noOfStud" variant="outlined" required label="No. of Student" fullWidth value={lectPDData.noOfStud} onChange={(e) => setlectPDData({ ...lectPDData, noOfStud: e.target.value })} />
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

export default LectProjectDetailsForm;