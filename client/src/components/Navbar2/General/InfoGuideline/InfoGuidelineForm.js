import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper, Container, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";

import { createInfoGuide, updateInfoGuide } from "../../../../actions/infoGuideline";

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

const InfoGuidelineForm = ({ currentId, setCurrentId, setNotify, setOpenPopup }) => {
    const [infoGuideData, setInfoGuideData] = useState({ title: "", selectedFile: "" });
    const infoGuide = useSelector((state) => (currentId ? state.infoGuideline.find((message) => message._id === currentId) : null));
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem("profile"));

    useEffect(() => {
        if (infoGuide) setInfoGuideData(infoGuide);
    }, [infoGuide]);

    const clearForm = () => {
        setCurrentId(0);
        setInfoGuideData({ title: "", selectedFile: "" });
    };

    useEffect(() => {
        if (currentId == null) {
            clearForm();
        } // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e);
        if (infoGuideData.selectedFile === ""){
            setNotify({ isOpen:true, message: "No file attached!", type: "error"});
        }else{
            if (currentId === 0) {
                dispatch(createInfoGuide({ ...infoGuideData }));
            } else {
                dispatch(updateInfoGuide(currentId, { ...infoGuideData }));
            }
            setOpenPopup(false);
            setNotify({ isOpen: true, message: "Successfully Submitted!", type: "success" });
            clearForm();
        }
    };

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to add info guideline.
                </Typography>
            </Paper>
        );
    }

    return (
        <Container>
            <form autoComplete="off" className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? `Editing "${infoGuide.title}"` : ""}</Typography>
                <TextField name="title" variant="outlined" required autoFocus label="Title" fullWidth value={infoGuideData.title} onChange={(e) => setInfoGuideData({ ...infoGuideData, title: e.target.value })} />
                <div className={classes.fileInput}>
                    <FileBase type="file" multiple={false} onDone={({ base64 }) => setInfoGuideData({ ...infoGuideData, selectedFile: base64 })} />
                </div>
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

export default InfoGuidelineForm;
