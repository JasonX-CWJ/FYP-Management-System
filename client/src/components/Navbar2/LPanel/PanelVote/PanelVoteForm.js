import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper, Container, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import { createPanelVote, updatePanelVote } from "../../../../actions/LPanel/PanelVote";

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

const PanelVoteForm = ({ currentId, setCurrentId, setNotify, setOpenPopup }) => {
    const [panelVData, setpanelVData] = useState({ title: "", vote: "" });
    const panelV = useSelector((state) => (currentId ? state.panelVote.find((message) => message._id === currentId) : null));
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem("profile"));

    useEffect(() => {
        if (panelV) setpanelVData(panelV);
    }, [panelV]);

    const clearForm = () => {
        setCurrentId(0);
        setpanelVData({ title: "", vote: "" });
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
            dispatch(createPanelVote({ ...panelVData }));
        } else {
            dispatch(updatePanelVote(currentId, { ...panelVData }));
        }
        setOpenPopup(false);
        setNotify({ isOpen: true, message: "Successfully Submitted!", type: "success" });
        clearForm();
    };

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to add a new vote detail.
                </Typography>
            </Paper>
        );
    }

    return (
    <Container>
        <form autoComplete="off" className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            <Typography variant="h6">{currentId ? `Editing "${panelV.title}"` : ""}</Typography>
            <TextField name="title" variant="outlined" required autoFocus label="Title" fullWidth value={panelVData.title} onChange={(e) => setpanelVData({ ...panelVData, title: e.target.value })} />
            <TextField name="vote" variant="outlined" required label="Vote" fullWidth value={panelVData.vote} onChange={(e) => setpanelVData({ ...panelVData, vote: e.target.value })} />
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

export default PanelVoteForm;