import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper, Grid, Container, makeStyles, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import { createRubricWeight, updateRubricWeight } from "../../../../actions/Admin/RubricWeight";

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

const RubricWeightForm = ({ currentId, setCurrentId, setNotify, setOpenPopup }) => {
    const [adminRWData, setadminRWData] = useState({ fypSess:"", dimension: "", rubric: "", weight: "" });
    const adminRW = useSelector((state) => (currentId ? state.rubricWeight.find((message) => message._id === currentId) : null));
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem("profile"));

    useEffect(() => {
        if (adminRW) setadminRWData(adminRW);
    }, [adminRW]);

    const clearForm = () => {
        setCurrentId(0);
        setadminRWData({ fypSess:"", dimension: "", rubric: "", weight: "" });
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
            dispatch(createRubricWeight({ ...adminRWData }));
        } else {
            dispatch(updateRubricWeight(currentId, { ...adminRWData }));
        }
        setOpenPopup(false);
        setNotify({ isOpen: true, message: "Successfully Submitted!", type: "success" });
        clearForm();
    };

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to add a new rubric weightage.
                </Typography>
            </Paper>
        );
    }

    return (
        <Container>
            <form autoComplete="off" className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Grid   container spacing={2} >
                    <Grid item  xs={12} >
                    <Typography variant="h6">{currentId ? `Editing "${adminRW.rubric}"` : ""}</Typography>
                    <br></br>
                    </Grid>
                </Grid>
                {/* added */}
                <FormControl  >
                    <FormLabel id="fypSess">FYP Session</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="fypSess"
                        name="fypSess"
                        value={adminRWData.fypSess} onChange={(e) => setadminRWData({ ...adminRWData, fypSess: e.target.value })}
                    >
                        <FormControlLabel value="fyp1" control={<Radio required={true}/>} label="FYP1" />
                        <FormControlLabel value="fyp2" control={<Radio required={true}/>} label="FYP2" />
                    </RadioGroup>
                    </FormControl>
                    
                    <FormControl  >
                    <FormLabel id="dimension">Evaluation Type</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="dimension"
                        name="dimension"
                        value={adminRWData.dimension} onChange={(e) => setadminRWData({ ...adminRWData, dimension: e.target.value })}
                    >
                        <FormControlLabel value="techeval" control={<Radio required={true}/>} label="Technical Evaluation (50%)" />
                        <FormControlLabel value="softskillseval" control={<Radio required={true}/>} label="Soft Skills Evaluation (10%)" />
                    </RadioGroup>
                </FormControl>
                {/* added */}
                <TextField name="dimension" variant="outlined" required autoFocus label="Dimension" fullWidth value={adminRWData.rubric} onChange={(e) => setadminRWData({ ...adminRWData, rubric: e.target.value })} />
                <TextField name="weight" variant="outlined" required label="Weight" fullWidth value={adminRWData.weight} onChange={(e) => setadminRWData({ ...adminRWData, weight: e.target.value })} />
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

export default RubricWeightForm;