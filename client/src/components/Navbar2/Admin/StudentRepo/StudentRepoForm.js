import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper, Container, makeStyles, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

// import { createStudentRepo, updateStudentRepo } from "../../../../actions/Admin/StudentRepo";

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
const StudentRepoForm = ({ currentId, setCurrentId, setNotify, setOpenPopup }) => {
    const [adminSRData, setadminSRData] = useState({ department: "", studName: "", matricNum: "", semester: "", session: "", email: ""});
    const adminSR = useSelector((state) => (currentId ? state.studentRepo.find((message) => message._id === currentId) : null));
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem("profile"));

    useEffect(() => {
        if (adminSR) setadminSRData(adminSR);
    }, [adminSR]);

    const clearForm = () => {
        setCurrentId(0);
        setadminSRData({ department: "", studName: "", matricNum: "", semester: "", session: "", email: "" });
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
    //         dispatch(createStudentRepo({ ...adminSRData }));
    //     } else {
    //         dispatch(updateStudentRepo(currentId, { ...adminSRData }));
    //     }
    //     setOpenPopup(false);
    //     setNotify({ isOpen: true, message: "Successfully Submitted!", type: "success" });
    //     clearForm();
    // };

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to add a student.
                </Typography>
            </Paper>
        );
    }

    return (
        <Container>
            {/* <form autoComplete="off" className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? `Editing "${adminSR.studName}"` : ""}</Typography>
                <TextField name="department" variant="outlined" required autoFocus label="Department" fullWidth value={adminSRData.department} onChange={(e) => setadminSRData({ ...adminSRData, department: e.target.value })} />
                <TextField name="studName" variant="outlined" required label="Student Name" fullWidth value={adminSRData.studName} onChange={(e) => setadminSRData({ ...adminSRData, studName: e.target.value })} />
                <TextField name="matricNum" variant="outlined" required label="Matric Number" fullWidth value={adminSRData.matricNum} onChange={(e) => setadminSRData({ ...adminSRData, matricNum: e.target.value })} />
                <TextField name="semester" variant="outlined" required label="Semester" fullWidth value={adminSRData.semester} onChange={(e) => setadminSRData({ ...adminSRData, semester: e.target.value })} />
                <TextField name="session" variant="outlined" required label="Session" fullWidth value={adminSRData.session} onChange={(e) => setadminSRData({ ...adminSRData, session: e.target.value })} />
                <TextField name="email" variant="outlined" required label="Email" fullWidth value={adminSRData.email} onChange={(e) => setadminSRData({ ...adminSRData, email: e.target.value })} />
                <div style={{ display: "flex" }}>
                    <Button type="submit" className={classes.buttonSubmit} variant="contained" color="primary" size="large" fullWidth>
                        Submit
                    </Button>
                    <Button variant="contained" color="secondary" size="large" onClick={clearForm} fullWidth>
                        Clear
                    </Button>
                </div>
            </form> */}
        </Container>
        );
};

export default StudentRepoForm;