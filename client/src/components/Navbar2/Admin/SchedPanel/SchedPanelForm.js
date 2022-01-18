import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper, Container, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import { createSchedPanel, updateSchedPanel } from "../../../../actions/Admin/SchedPanel";

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
const SchedPanelForm = ({ currentId, setCurrentId, setNotify, setOpenPopup }) => {
    const [adminSPData, setadminSPData] = useState({ lectName: "", studTitle: "" });
    const adminSP = useSelector((state) => (currentId ? state.schedPanel.find((message) => message._id === currentId) : null));
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem("profile"));

    useEffect(() => {
        if (adminSP) setadminSPData(adminSP);
    }, [adminSP]);

    const clearForm = () => {
        setCurrentId(0);
        setadminSPData({ lectName: "", studTitle: "" });
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
            dispatch(createSchedPanel({ ...adminSPData }));
        } else {
            dispatch(updateSchedPanel(currentId, { ...adminSPData }));
        }
        setOpenPopup(false);
        setNotify({ isOpen: true, message: "Successfully Submitted!", type: "success" });
        clearForm();
    };

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to add a new schedule detail for panel.
                </Typography>
            </Paper>
        );
    }

    return (
        <Container>
            <form autoComplete="off" className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? `Editing "${adminSP.lectName}"` : ""}</Typography>
                <TextField name="lectName" variant="outlined" required autoFocus label="Lecturer Name" fullWidth value={adminSPData.lectName} onChange={(e) => setadminSPData({ ...adminSPData, lectName: e.target.value })} />
                <TextField name="studTitle" variant="outlined" required label="Project Title" fullWidth value={adminSPData.studTitle} onChange={(e) => setadminSPData({ ...adminSPData, studTitle: e.target.value })} />
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

export default SchedPanelForm;