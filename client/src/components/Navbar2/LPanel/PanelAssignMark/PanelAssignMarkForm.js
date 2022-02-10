import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper, Container, makeStyles, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import { createPanelAssignMark, updatePanelAssignMark } from "../../../../actions/LPanel/PanelAssignMark";


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

const PanelAssignMarkForm = ({ currentId, setCurrentId, setNotify, setOpenPopup }) => {
    const [panelAMData, setpanelAMData] = useState({ title: "", studname: "", selectedFile: "", fypSess:"", submSess:"" });
    const panelAM = useSelector((state) => (currentId ? state.panelAssignMark.find((message) => message._id === currentId) : null));
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem("profile"));

    useEffect(() => {
        if (panelAM) setpanelAMData(panelAM);
    }, [panelAM]);

    const clearForm = () => {
        setCurrentId(0);
        setpanelAMData({ title: "", studname: "", selectedFile: "", fypSess:"", submSess:"" });
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
            dispatch(createPanelAssignMark({ ...panelAMData }));
        } else {
            dispatch(updatePanelAssignMark(currentId, { ...panelAMData }));
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
            <Typography variant="h6">{currentId ? `Editing "${panelAM.title}"` : ""}</Typography>
            
            {/* added */}
            {/* <FormControl  >
                <FormLabel id="fypSess">Choose FYP</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="fypSess"
                    name="fypSess"
                    value={panelAMData.fypSess} onChange={(e) => setpanelAMData({ ...panelAMData, fypSess: e.target.value })}
                >
                    <FormControlLabel value="fyp1" control={<Radio required={true}/>} label="FYP1" />
                    <FormControlLabel value="fyp2" control={<Radio required={true}/>} label="FYP2" />
                </RadioGroup>
                </FormControl>
                
                <FormControl  >
                <FormLabel id="submSess">Choose Session</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="submSess"
                    name="submSess"
                    value={panelAMData.submSess} onChange={(e) => setpanelAMData({ ...panelAMData, submSess: e.target.value })}
                >
                    <FormControlLabel value="moni" control={<Radio required={true}/>} label="Monitoring" />
                    <FormControlLabel value="viva" control={<Radio required={true}/>} label="Viva" />
                </RadioGroup>
            </FormControl> */}
            {/* added */}
            <TextField name="title" variant="outlined" required autoFocus label="Title" fullWidth value={panelAMData.title} onChange={(e) => setpanelAMData({ ...panelAMData, title: e.target.value })} />
            <TextField name="studentname" variant="outlined" required label="Student Name" fullWidth value={panelAMData.studname} onChange={(e) => setpanelAMData({ ...panelAMData, studname: e.target.value })} />
            {/* added */}
            {/* <TextField
                name="title"
                variant="outlined"
                required
                label="Link"
                fullWidth
                value={panelAMData.selectedFile}
                onChange={(e) => setpanelAMData({ ...panelAMData, selectedFile: e.target.value })}
            /> */}
            {/* added */}
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

export default PanelAssignMarkForm;