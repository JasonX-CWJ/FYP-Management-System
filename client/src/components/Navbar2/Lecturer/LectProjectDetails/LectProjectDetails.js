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

import { getLectProjectDet, deleteLectProjectDet } from "../../../../actions/Lecturer/LectProjectDetails";
import { approveLectProjectDet } from "../../../../actions/Admin/AdmProjectDetails";

import Notification from "../../Reusable/Notification";
import ConfirmDialog from "../../Reusable/ConfirmDialog";
import LectProjectAppliedDets from "./LectProjectAppliedDets";
import LectProjectDetailsDets from "./LectProjectDetailsDets";
import LectProjectDetailsForm from "./LectProjectDetailsForm";
import LectProjectDetailsPopup from "./LectProjectDetailsPopup";
import { getLectProjectApplied, approveLectProjectApplied } from "../../../../actions/Lecturer/LectProjectApplied";

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

const LectProjectDetails = () => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const lectPD = useSelector((state) => state.lectProjectDetails);
    const lectPDStudent = useSelector((state) => state.lectProjectApplied);
    const [currentId, setCurrentId] = useState(0);
    const [approveData, setApproveData] = useState({ department: "", semester: "", session: "", title: "", description: "", potStakeholder: "", tool: "", noOfStud: "", status: "" });
    const [openPopup, setOpenPopup] = useState(false);

    useEffect(() => {
        dispatch(getLectProjectApplied());
        dispatch(getLectProjectDet());
    }, [currentId, dispatch]);

    const [notify, setNotify] = useState({ isOpen: false, message: "", type: "" });
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subtitle: "" });

    const openForm = (item) => {
        setCurrentId(item._id);
        setOpenPopup(true);
    };

    // const openApprove = (item) => {
    //     setConfirmDialog({
    //         ...confirmDialog,
    //         isOpen: false,
    //     });
    //     // setCurrentId(item._id);
    //     console.log(item._id);
    //     dispatch(approveLectProjectDet(item._id));
    //     // setOpenPopup(true);
    // };

    const openApprove = (item) => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false,
        });
        dispatch(approveLectProjectApplied(item._id));
    };

    const confirmDelete = (id) => {
        dispatch(deleteLectProjectDet(id));
        setNotify({ isOpen: true, message: "Deleted Successfully!", type: "error" });
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false,
        });
    };

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
                <Paper>
                    <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
                        <Grid justify="space-between" container spacing={24}>
                            <Grid item>
                                <Typography variant="h5"> Project Details</Typography>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="primary" onClick={() => setOpenPopup(true)}>
                                    Submit New Title
                                </Button>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </Paper>

                <Paper style={{ margin: "16px 0px", padding: 8 }}>
                    <Typography variant="h6"> Active FYP Titles</Typography>
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
                                {lectPD.map((row) => (
                                    <LectProjectDetailsDets
                                        filter={"active"}
                                        key={row._id}
                                        row={row}
                                        setConfirmDialog={setConfirmDialog}
                                        confirmDelete={confirmDelete}
                                        openForm={openForm}
                                        isPending={false}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>

                {/* test */}
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList onChange={handleChange}>
                            <Tab label="Mine" value="1" />
                            <Tab label="Student" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <Paper style={{ margin: "16px 0px", padding: 8 }}>
                            <Typography variant="h6"> Accepted Titles</Typography>
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
                                        {lectPD.map((row) => (
                                            <LectProjectDetailsDets
                                                filter={"accept"}
                                                key={row._id}
                                                row={row}
                                                setConfirmDialog={setConfirmDialog}
                                                confirmDelete={confirmDelete}
                                                openForm={openForm}
                                                isPending={false}
                                            />
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>

                        <Paper style={{ margin: "16px 0px", padding: 8 }}>
                            <Typography variant="h6"> Pending Titles</Typography>
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
                                        {lectPD.map((row) => (
                                            <LectProjectDetailsDets
                                                filter={"pending"}
                                                key={row._id}
                                                row={row}
                                                setConfirmDialog={setConfirmDialog}
                                                confirmDelete={confirmDelete}
                                                openForm={openForm}
                                                isPending={true}
                                                openApprove={openApprove}
                                            />
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>

                        <Paper style={{ margin: "16px 0px", padding: 8 }}>
                            <Typography variant="h6"> Rejected Titles</Typography>
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
                                        {lectPD.map((row) => (
                                            <LectProjectDetailsDets
                                                filter={"reject"}
                                                key={row._id}
                                                row={row}
                                                setConfirmDialog={setConfirmDialog}
                                                confirmDelete={confirmDelete}
                                                openForm={openForm}
                                                isPending={false}
                                            />
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </TabPanel>

                    <TabPanel value="2">
                        <Paper style={{ margin: "16px 0px", padding: 8 }}>
                            <Typography variant="h6"> Student Applied Titles</Typography>
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
                                        {lectPDStudent.map((row) => (
                                            <LectProjectAppliedDets key={row._id} row={row} setConfirmDialog={setConfirmDialog} openApprove={openApprove} />
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>

                        <Paper style={{ margin: "16px 0px", padding: 8 }}>
                            <Typography variant="h6"> Student Proposed Titles</Typography>
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
                                        {lectPD.map((row) => (
                                            <LectProjectDetailsDets filter={"proposed"} key={row._id} row={row} setConfirmDialog={setConfirmDialog} confirmDelete={confirmDelete} openForm={openForm} />
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </TabPanel>
                </TabContext>
                {/* test */}

                <LectProjectDetailsPopup openPopup={openPopup} setOpenPopup={setOpenPopup} setCurrentId={setCurrentId}>
                    <LectProjectDetailsForm currentId={currentId} setCurrentId={setCurrentId} setOpenPopup={setOpenPopup} setNotify={setNotify} />
                </LectProjectDetailsPopup>
                <Notification notify={notify} setNotify={setNotify} />
                <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
            </Container>
        </Grow>
    );
};

export default LectProjectDetails;
