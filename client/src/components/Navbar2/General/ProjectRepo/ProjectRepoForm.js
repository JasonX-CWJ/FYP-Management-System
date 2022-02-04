import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper, Container, makeStyles, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

// import { createProjectRepo, updateProjectRepo } from "../../../../actions/ProjectRepo";

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
const ProjectRepoForm = ({ currentId, setCurrentId, setNotify, setOpenPopup }) => {
    const [projectRepoData, setprojectRepoData] = useState({ panel1: "", panel2: "" });
    const projectRepo = useSelector((state) => (currentId ? state.projectRepo.find((message) => message._id === currentId) : null));
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem("profile"));

    useEffect(() => {
        if (projectRepo) setprojectRepoData(projectRepo);
    }, [projectRepo]);

    const clearForm = () => {
        setCurrentId(0);
        setprojectRepoData({ panel1: "", panel2: "" });
    };

    useEffect(() => {
        if (currentId == null) {
            clearForm();
        } // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentId]);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     console.log(e);
    //     if (currentId === 0) {
    //         dispatch(createProjectRepo({ ...projectRepoData }));
    //     } else {
    //         dispatch(updateProjectRepo(currentId, { ...projectRepoData }));
    //     }
    //     setOpenPopup(false);
    //     setNotify({ isOpen: true, message: "Successfully Submitted!", type: "success" });
    //     clearForm();
    // };

    // if (!user?.result?.name) {
    //     return (
    //         <Paper className={classes.paper}>
    //             <Typography variant="h6" align="center">
    //                 Please Sign In to add a project.
    //             </Typography>
    //         </Paper>
    //     );
    // }

    return (
        <Container>
            <form autoComplete="off" className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <TextField name="panel1" variant="outlined" required autoFocus label="Panel 1" fullWidth value={projectRepoData.panel1} onChange={(e) => setprojectRepoData({ ...projectRepoData, panel1: e.target.value })} />
                <TextField name="panel2" variant="outlined" required label="Panel 2" fullWidth value={projectRepoData.panel2} onChange={(e) => setprojectRepoData({ ...projectRepoData, panel2: e.target.value })} />
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

export default ProjectRepoForm;