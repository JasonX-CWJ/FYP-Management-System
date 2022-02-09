import React, { useEffect, useState } from "react";
import {
    InputAdornment,
    makeStyles,
    Grow,
    Container,
    Paper,
    TableSortLabel,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Button,
    TablePagination,
    Toolbar,
    Grid,
    Card,
    Box,
    Tab,
} from "@material-ui/core";

import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";

import { useSelector, useDispatch } from "react-redux";
import FileSubmissionDetails from "./FileSubmissionDetails";

// import { getProjectDet, deleteProjectDet } from "../../../../actions/Student/ProjectDetails";
// import { getProjectRepo, applyProject } from "../../../../actions/ProjectRepo";
import { getFileSubmissions } from "../../../../actions/Student/FileSubmission";

//pls make above file

import Notification from "../../Reusable/Notification";
import ConfirmDialog from "../../Reusable/ConfirmDialog";
import FileSubmissionPopup from "./FileSubmissionPopup";
import FileSubmissionForm from "./FileSubmissionForm";

// import ProjectDetailsDets from "./ProjectDetailsDets";
// import ProjectDetailsForm from "./ProjectDetailsForm";
// import ProjectDetailsPopup from "./ProjectDetailsPopup";
// import ProjectDetailsApplied from "./ProjectDetailsApplied";
//make 3 above files

const useStyles = makeStyles((theme) => ({
    tableRow: {
        border: 0,
        height: 50,
        maxHeight: 10,
        whiteSpace: "pre-wrap",
    },
    tableCell: {
        maxWidth: 200, // percentage also works
        maxHeight: 100,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },

    tableCellMobile: {
        maxWidth: 200, // percentage also works
        maxHeight: 100,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        [theme.breakpoints.down("md")]: {
            display: "none",
        },
    },
}));

const FileSubmission = () => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const user = JSON.parse(localStorage.getItem("profile"));

    const fileSubmission = useSelector((state) => state.fileSubmissions);
    const files = useSelector((state) => state.File);
    const [currentId, setCurrentId] = useState(0);
    const [openPopup, setOpenPopup] = useState(false);

    const [currentSubmission, setCurrentSubmission] = useState({ type: "", session: "", content: "" });

    useEffect(() => {
        const id = user?.result?.studentData?._id;
        dispatch(getFileSubmissions(id));
    }, [currentId, dispatch]);

    const [notify, setNotify] = useState({ isOpen: false, message: "", type: "" });
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subtitle: "" });

    const openForm = (item) => {
        // setCurrentId(item._id);
        setOpenPopup(true);
    };

    // const apply = (item) => {
    //     const studentid = user.result.studentData._id;
    //     dispatch(applyProject(item._id, studentid));
    // };

    // const confirmDelete = (id) => {
    //     dispatch(deleteProjectDet(id));
    //     setNotify({ isOpen: true, message: "Deleted Successfully!", type: "error" });
    //     setConfirmDialog({
    //         ...confirmDialog,
    //         isOpen: false,
    //     });
    // };

    {
        /* test */
    }
    const [value, setValue] = React.useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    {
        /* test */
    }

    return (
        <Grow in>
            <Container maxWidth={false}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList onChange={handleChange}>
                            <Tab label="FYP1" value="1" />
                            <Tab label="FYP2" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <Paper style={{ margin: "16px 0px", padding: 8 }}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}>Title</TableCell>
                                            <TableCell className={classes.tableCell}>Description</TableCell>
                                            <TableCell className={classes.tableCell}></TableCell>
                                            <TableCell className={classes.tableCell}></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <FileSubmissionDetails
                                            title="Monitoring Session"
                                            type="monitoring"
                                            session="fyp1"
                                            content={fileSubmission.monitoringLinkFYP1}
                                            openForm={openForm}
                                            currentSubmission={currentSubmission}
                                            setCurrentSubmission={setCurrentSubmission}
                                        />
                                        <FileSubmissionDetails
                                            title="Viva Session"
                                            type="viva"
                                            session="fyp1"
                                            content={fileSubmission.vivaLinkFYP1}
                                            openForm={openForm}
                                            currentSubmission={currentSubmission}
                                            setCurrentSubmission={setCurrentSubmission}
                                        />
                                        <FileSubmissionDetails
                                            title="Report"
                                            type="report"
                                            session="fyp1"
                                            content={fileSubmission.reportSubmissionFYP1}
                                            openForm={openForm}
                                            currentSubmission={currentSubmission}
                                            setCurrentSubmission={setCurrentSubmission}
                                        />
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </TabPanel>
                    <TabPanel value="2">
                        <Paper style={{ margin: "16px 0px", padding: 8 }}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}>Title</TableCell>
                                            <TableCell className={classes.tableCell}>Description</TableCell>
                                            <TableCell className={classes.tableCell}></TableCell>
                                            <TableCell className={classes.tableCell}></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <FileSubmissionDetails
                                            title="Monitoring Session"
                                            type="monitoring"
                                            session="fyp2"
                                            content={fileSubmission.monitoringLinkFYP2}
                                            openForm={openForm}
                                            currentSubmission={currentSubmission}
                                            setCurrentSubmission={setCurrentSubmission}
                                        />
                                        <FileSubmissionDetails
                                            title="Viva Session"
                                            type="viva"
                                            session="fyp2"
                                            content={fileSubmission.vivaLinkFYP2}
                                            openForm={openForm}
                                            currentSubmission={currentSubmission}
                                            setCurrentSubmission={setCurrentSubmission}
                                        />
                                        <FileSubmissionDetails
                                            title="Report"
                                            type="report"
                                            session="fyp2"
                                            content={fileSubmission.reportSubmissionFYP2}
                                            openForm={openForm}
                                            currentSubmission={currentSubmission}
                                            setCurrentSubmission={setCurrentSubmission}
                                        />
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </TabPanel>
                </TabContext>

                <FileSubmissionPopup openPopup={openPopup} setOpenPopup={setOpenPopup}>
                    <FileSubmissionForm setOpenPopup={setOpenPopup} setNotify={setNotify} setCurrentSubmission={setCurrentSubmission} currentSubmission={currentSubmission} />
                </FileSubmissionPopup>
                <Notification notify={notify} setNotify={setNotify} />
                <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
            </Container>
        </Grow>
    );
};

export default FileSubmission;
