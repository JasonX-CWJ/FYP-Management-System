import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper, Container, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import { createProjectDet, updateProjectDet } from "../../../../actions/Student/ProjectDetails";
//pls make above file

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

const ProjectDetailsForm = ({ currentId, setCurrentId, setNotify, setOpenPopup }) => {
    const [studPDData, setstudPDData] = useState({
        department: "",
        semester: "",
        session: "",
        supervisor: "",
        title: "",
        description: "",
        potStakeholder: "",
        tool: "",
        team: "",
        teamMN: "",
        status: "pending",
    });
    const studPD = useSelector((state) => (currentId ? state.ProjectDetails.find((message) => message._id === currentId) : null));
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem("profile"));

    useEffect(() => {
        if (studPD) setstudPDData(studPD);
    }, [studPD]);

    const clearForm = () => {
        setCurrentId(0);
        setstudPDData({ department: "", semester: "", session: "", supervisor: "", title: "", description: "", potStakeholder: "", tool: "", team: "", teamMN: "", status: "pending" });
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
            dispatch(createProjectDet({ ...studPDData }));
        } else {
            dispatch(updateProjectDet(currentId, { ...studPDData }));
        }
        setOpenPopup(false);
        setNotify({ isOpen: true, message: "Successfully Submitted!", type: "success" });
        clearForm();
    };

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to propose a title.
                </Typography>
            </Paper>
        );
    }

    return (
        <Container>
            <form autoComplete="off" className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? `Editing "${studPD.title}"` : ""}</Typography>
                <TextField
                    name="department"
                    variant="outlined"
                    required
                    autoFocus
                    label="Department"
                    fullWidth
                    value={studPDData.department}
                    onChange={(e) => setstudPDData({ ...studPDData, department: e.target.value })}
                />
                <TextField
                    name="semester"
                    variant="outlined"
                    required
                    label="Semester"
                    fullWidth
                    value={studPDData.semester}
                    onChange={(e) => setstudPDData({ ...studPDData, semester: e.target.value })}
                />
                <TextField
                    name="session"
                    variant="outlined"
                    required
                    label="Session"
                    fullWidth
                    value={studPDData.session}
                    onChange={(e) => setstudPDData({ ...studPDData, session: e.target.value })}
                />
                <TextField
                    name="supervisor"
                    variant="outlined"
                    required
                    label="Supervisor"
                    fullWidth
                    value={studPDData.supervisor}
                    onChange={(e) => setstudPDData({ ...studPDData, supervisor: e.target.value })}
                />
                <TextField name="title" variant="outlined" required label="Title" fullWidth value={studPDData.title} onChange={(e) => setstudPDData({ ...studPDData, title: e.target.value })} />
                <TextField
                    name="description"
                    variant="outlined"
                    required
                    label="Description"
                    fullWidth
                    value={studPDData.description}
                    onChange={(e) => setstudPDData({ ...studPDData, description: e.target.value })}
                />
                <TextField
                    name="potStakeholder"
                    variant="outlined"
                    required
                    label="Potential Stakeholder"
                    fullWidth
                    value={studPDData.potStakeholder}
                    onChange={(e) => setstudPDData({ ...studPDData, potStakeholder: e.target.value })}
                />
                <TextField name="tool" variant="outlined" required label="Tool" fullWidth value={studPDData.tool} onChange={(e) => setstudPDData({ ...studPDData, tool: e.target.value })} />
                <TextField name="team" variant="outlined" required label="Team Member" fullWidth value={studPDData.team} onChange={(e) => setstudPDData({ ...studPDData, team: e.target.value })} />
                <TextField
                    name="teamMN"
                    variant="outlined"
                    required
                    label="Team Member Matric Number"
                    fullWidth
                    value={studPDData.teamMN}
                    onChange={(e) => setstudPDData({ ...studPDData, teamMN: e.target.value })}
                />
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

export default ProjectDetailsForm;
