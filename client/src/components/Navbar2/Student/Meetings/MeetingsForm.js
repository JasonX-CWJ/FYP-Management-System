import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper, Container, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import { createLectMeetings, updateLectMeetings } from "../../../../actions/Lecturer/LectMeetings";

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

const MeetingsForm = ({ currentId, setCurrentId, setNotify, setOpenPopup }) => {
    const user = JSON.parse(localStorage.getItem("profile"));

    const studentID = user?.result?.studentData._id;
    const supervisorID = user?.result?.studentData.supervisor._id;

    const [studMData, setstudMData] = useState({ title: "", projecttitle: "", studentID: studentID, supervisorID: supervisorID, link: "", date: "", time: "", status: "pending" });
    const studM = useSelector((state) => (currentId ? state.Meetings.find((message) => message._id === currentId) : null));
    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        if (studM) setstudMData(studM);
    }, [studM]);

    const clearForm = () => {
        setCurrentId(0);
        setstudMData({ title: "", projecttitle: "", studentID: studentID, supervisorID: supervisorID, link: "", date: "", time: "", status: "pending" });
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
            dispatch(createLectMeetings({ ...studMData }));
        } else {
            dispatch(updateLectMeetings(currentId, { ...studMData }));
        }
        setOpenPopup(false);
        setNotify({ isOpen: true, message: "Successfully Submitted!", type: "success" });
        clearForm();
    };

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to add a new meeting.
                </Typography>
            </Paper>
        );
    }

    return (
        <Container>
            <form autoComplete="off" className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? `Editing "${studM.title}"` : ""}</Typography>
                <TextField
                    name="title"
                    variant="outlined"
                    required
                    autoFocus
                    label="Meeting Title"
                    fullWidth
                    value={studMData.title}
                    onChange={(e) => setstudMData({ ...studMData, title: e.target.value })}
                />

                <TextField name="date" variant="outlined" required label="Date" fullWidth value={studMData.date} onChange={(e) => setstudMData({ ...studMData, date: e.target.value })} />
                <TextField name="time" variant="outlined" required label="Time" fullWidth value={studMData.time} onChange={(e) => setstudMData({ ...studMData, time: e.target.value })} />
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

export default MeetingsForm;
