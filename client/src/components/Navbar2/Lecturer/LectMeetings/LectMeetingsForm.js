import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper, Container, makeStyles, FormControl, Select, InputLabel, MenuItem } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import { createLectMeetings, updateLectMeetings } from "../../../../actions/Lecturer/LectMeetings";
import { getLectProjectDet } from "../../../../actions/Lecturer/LectProjectDetails";
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

const LectMeetingsForm = ({ currentId, setCurrentId, setNotify, setOpenPopup }) => {
    const [lectMData, setlectMData] = useState({ title: "", projecttitle: "", studname: "", link: "", date: "", time: "", status: "active" });
    const lectM = useSelector((state) => (currentId ? state.lectMeetings.find((message) => message._id === currentId) : null));
    const dispatch = useDispatch();
    const classes = useStyles();
    
    const lectPD = useSelector((state) => state.lectProjectDetails);

    const user = JSON.parse(localStorage.getItem("profile"));

    useEffect(() => {
        if (lectM) setlectMData(lectM);
    }, [lectM]);

    const clearForm = () => {
        setCurrentId(0);
        setlectMData({ title: "", projecttitle: "", studname: "", link: "", date: "", time: "", status: "", status: "active" });
    };

    useEffect(() => {
        dispatch(getLectProjectDet());
        if (currentId == null) {
            clearForm();
        } // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentId, dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e);
        if (currentId === 0) {
            dispatch(createLectMeetings({ ...lectMData }));
        } else {
            dispatch(updateLectMeetings(currentId, { ...lectMData }));
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
    
    const handleChange = (e) => {
        console.log(e);
        setlectMData({ ...lectMData, studname: e.target.value })
      };

    

    return (
        <Container>
            <form autoComplete="off" className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? `Editing "${lectM.title}"` : ""}</Typography>
                <TextField name="title" variant="outlined" required autoFocus label="Meeting Title" fullWidth value={lectMData.title} onChange={(e) => setlectMData({ ...lectMData, title: e.target.value })} />
                <TextField name="projecttitle" variant="outlined" required label="Project Title" fullWidth value={lectMData.projecttitle} onChange={(e) => setlectMData({ ...lectMData, projecttitle: e.target.value })} />
                
                <FormControl fullWidth>
                <InputLabel id="studName">Student Name</InputLabel>
                {lectPD.map((row) => (
                    <> 
                    {(user?.result?.googleId === row?.creator || user?.result?._id === row?.creator) && row.status === "active" && (
                    <Select
                    labelId="studName"
                    id="studName"
                    value={lectMData.studname}
                    label="studName"
                    onChange={handleChange}                       
                    >
                    {row.studentAssigned.map((row) => (
                    [ 
                    <MenuItem value={row.name}>{row.name}</MenuItem>                        
                    ]
                    ))}
                    </Select>                       
                    )}
                    </>
                ))}           
                </FormControl>     
                <TextField name="date" variant="outlined" required label="Date" fullWidth value={lectMData.date} onChange={(e) => setlectMData({ ...lectMData, date: e.target.value })} />
                <TextField name="time" variant="outlined" required label="Time" fullWidth value={lectMData.time} onChange={(e) => setlectMData({ ...lectMData, time: e.target.value })} />
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

export default LectMeetingsForm;