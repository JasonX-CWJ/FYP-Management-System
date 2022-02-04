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

// import { getProjectDet, deleteProjectDet } from "../../../../actions/Student/ProjectDetails";
//pls make above file

import Notification from "../../Reusable/Notification";
import ConfirmDialog from "../../Reusable/ConfirmDialog";

import ProjectDetailsDets from "./ProjectDetailsDets";
import ProjectDetailsForm from "./ProjectDetailsForm";
import ProjectDetailsPopup from "./ProjectDetailsPopup";
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

const ProjectDetails = () => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const studPD = useSelector((state) => state.ProjectDetails);
    const [currentId, setCurrentId] = useState(0);
    const [openPopup, setOpenPopup] = useState(false);

    const user = JSON.parse(localStorage.getItem("profile"));

    // useEffect(() => {
    //     dispatch(getProjectDet());
    // }, [currentId, dispatch]);

    const [notify, setNotify] = useState({ isOpen: false, message: "", type: "" });
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subtitle: "" });

    const openForm = (item) => {
        setCurrentId(item._id);
        setOpenPopup(true);
    };

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
                            <Tab label="My Project" value="1" />
                            <Tab label="Application" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <Paper style={{ margin: "16px 0px", padding: 8 }}>
                            <Typography variant="h5">Title: {user?.result?.studentData?.projectActive?.title}</Typography>
                            <Typography variant="h6">Semester: {user?.result?.studentData?.projectActive?.semester} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Session: This is Session</Typography>
                            <Typography variant="h6">Department: {user?.result?.studentData?.projectActive?.department}</Typography>
                            <Typography variant="h6">Supervisor: {user?.result?.studentData?.supervisor?.name} </Typography>
                            <Typography variant="h6">Description: {user?.result?.studentData?.projectActive?.description}</Typography>
                            <Typography variant="h6">Stakeholder: {user?.result?.studentData?.projectActive?.potStakeholder}</Typography>
                            <Typography variant="h6">Tools: {user?.result?.studentData?.projectActive?.tool}</Typography>
                            <Typography variant="h6">Team Member: This is my team member (if any)</Typography>
                            <Typography variant="h6">Team Member Matric Number: This is my team member matric num (if any)</Typography>
                        </Paper>
                    </TabPanel>
                    <TabPanel value="2">
                        <Paper>
                            <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
                                <Grid justify="space-between" container spacing={24}>
                                    <Grid item>
                                        <Typography variant="h5">Project Details</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="contained" color="primary" onClick={() => setOpenPopup(true)}>
                                            Propose a Title
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Toolbar>
                        </Paper>

                        <Paper style={{ margin: "16px 0px", padding: 8 }}>
                            <Typography variant="h6">Applied Title</Typography>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}></TableCell>
                                            {/* <TableCell className={classes.tableCell}>Department</TableCell> */}
                                            <TableCell className={classes.tableCell}>Semester</TableCell>
                                            <TableCell className={classes.tableCell}>Session</TableCell>
                                            <TableCell className={classes.tableCell}>Title</TableCell>
                                            <TableCell className={classes.tableCell}>Description</TableCell>
                                            <TableCell className={classes.tableCell}>Potential Stakeholder</TableCell>
                                            <TableCell className={classes.tableCell}>Tools</TableCell>
                                            <TableCell className={classes.tableCell}>Students</TableCell>
                                            <TableCell className={classes.tableCell}></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {/* { studPD.map((row) => (
                        <ProjectDetailsDets filter={'applied'} key={row._id} row={row} setConfirmDialog={setConfirmDialog} confirmDelete={confirmDelete} openForm={openForm} />
                    ))} */}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>

                        <Paper style={{ margin: "16px 0px", padding: 8 }}>
                            <Typography variant="h6">Apply for Title</Typography>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}></TableCell>
                                            {/* <TableCell className={classes.tableCell}>Department</TableCell> */}
                                            <TableCell className={classes.tableCell}>Semester</TableCell>
                                            <TableCell className={classes.tableCell}>Session</TableCell>
                                            <TableCell className={classes.tableCell}>Title</TableCell>
                                            <TableCell className={classes.tableCell}>Description</TableCell>
                                            <TableCell className={classes.tableCell}>Potential Stakeholder</TableCell>
                                            <TableCell className={classes.tableCell}>Tools</TableCell>
                                            <TableCell className={classes.tableCell}>No. of Students</TableCell>
                                            <TableCell className={classes.tableCell}></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {/* { studPD.map((row) => (
                        <ProjectDetailsDets filter={'active'} key={row._id} row={row} setConfirmDialog={setConfirmDialog} confirmDelete={confirmDelete} openForm={openForm} />
                    ))} */}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>

                        <Paper style={{ margin: "16px 0px", padding: 8 }}>
                            <Typography variant="h6">Proposed Title</Typography>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className={classes.tableCell}></TableCell>
                                            {/* <TableCell className={classes.tableCell}>Department</TableCell> */}
                                            <TableCell className={classes.tableCell}>Semester</TableCell>
                                            <TableCell className={classes.tableCell}>Session</TableCell>
                                            <TableCell className={classes.tableCell}>Title</TableCell>
                                            <TableCell className={classes.tableCell}>Description</TableCell>
                                            <TableCell className={classes.tableCell}>Potential Stakeholder</TableCell>
                                            <TableCell className={classes.tableCell}>Tools</TableCell>
                                            <TableCell className={classes.tableCell}>Students</TableCell>
                                            <TableCell className={classes.tableCell}></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {/* { studPD.map((row) => (
                        <ProjectDetailsDets filter={'proposed'} key={row._id} row={row} setConfirmDialog={setConfirmDialog} confirmDelete={confirmDelete} openForm={openForm} />
                    ))} */}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </TabPanel>
                </TabContext>

                <ProjectDetailsPopup openPopup={openPopup} setOpenPopup={setOpenPopup} setCurrentId={setCurrentId}>
                    <ProjectDetailsForm currentId={currentId} setCurrentId={setCurrentId} setOpenPopup={setOpenPopup} setNotify={setNotify} />
                </ProjectDetailsPopup>
                <Notification notify={notify} setNotify={setNotify} />
                <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
            </Container>
        </Grow>
    );
};

export default ProjectDetails;
