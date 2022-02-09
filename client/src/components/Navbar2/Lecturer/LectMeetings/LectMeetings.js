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
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

import { getLectMeetings, deleteLectMeetings, updateLectMeetings, changeLectMeetingsStatus } from "../../../../actions/Lecturer/LectMeetings";

import Notification from "../../Reusable/Notification";
import ConfirmDialog from "../../Reusable/ConfirmDialog";
import LectMeetingsDetails from "./LectMeetingsDetails";
import LectMeetingsForm from "./LectMeetingsForm";
import LectMeetingsPopup from "./LectMeetingsPopup";

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

const LectMeetings = () => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const lectM = useSelector((state) => state.lectMeetings);
    const [currentId, setCurrentId] = useState(0);
    const [openPopup, setOpenPopup] = useState(false);

    useEffect(() => {
        dispatch(getLectMeetings());
    }, [currentId, dispatch]);

    console.log(lectM);

    const [notify, setNotify] = useState({ isOpen: false, message: "", type: "" });
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subtitle: "" });

    const openForm = (item) => {
        setCurrentId(item._id);
        setOpenPopup(true);
    };

    const confirmDelete = (id) => {
        dispatch(deleteLectMeetings(id));
        setNotify({ isOpen: true, message: "Deleted Successfully!", type: "error" });
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false,
        });
    };

    const openApprove = (item, status) => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false,
        });
        dispatch(changeLectMeetingsStatus(item._id, { status: status }));
    };

    return (
        <Grow in>
            <Container maxWidth={false}>
                <Paper>
                    <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
                        <Grid justify="space-between" container spacing={24}>
                            <Grid item>
                                <Typography variant="h5"> Meetings</Typography>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="primary" onClick={() => setOpenPopup(true)}>
                                    Submit New Meeting
                                </Button>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </Paper>

                <Paper style={{ margin: "16px 0px", padding: 8 }}>
                    <Typography variant="h6">Meetings</Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.tableCell}>Meeting Title</TableCell>
                                    <TableCell className={classes.tableCell}>Project Title</TableCell>
                                    <TableCell className={classes.tableCell}>Student Name</TableCell>
                                    {/* <TableCell className={classes.tableCell}>Link</TableCell> */}
                                    <TableCell className={classes.tableCell}>Date</TableCell>
                                    <TableCell className={classes.tableCell}>Time</TableCell>
                                    <TableCell className={classes.tableCell}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {lectM.map((row) => (
                                    <LectMeetingsDetails
                                        filter={"active"}
                                        key={row._id}
                                        row={row}
                                        setConfirmDialog={setConfirmDialog}
                                        confirmDelete={confirmDelete}
                                        openForm={openForm}
                                        openApprove={openApprove}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>

                <Paper style={{ margin: "16px 0px", padding: 8 }}>
                    <Typography variant="h6">Monitoring/Viva Session</Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.tableCell}>Meeting Title</TableCell>
                                    <TableCell className={classes.tableCell}>Project Title</TableCell>
                                    <TableCell className={classes.tableCell}>Student Name</TableCell>
                                    {/* <TableCell className={classes.tableCell}>Link</TableCell> */}
                                    <TableCell className={classes.tableCell}>Date</TableCell>
                                    <TableCell className={classes.tableCell}>Time</TableCell>
                                    <TableCell className={classes.tableCell}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {lectM.map((row) => (
                                    <LectMeetingsDetails
                                        filter={"session"}
                                        key={row._id}
                                        row={row}
                                        setConfirmDialog={setConfirmDialog}
                                        confirmDelete={confirmDelete}
                                        openForm={openForm}
                                        openApprove={openApprove}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>

                <Paper style={{ margin: "16px 0px", padding: 8 }}>
                    <Typography variant="h6">Completed</Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.tableCell}>Meeting Title</TableCell>
                                    <TableCell className={classes.tableCell}>Project Title</TableCell>
                                    <TableCell className={classes.tableCell}>Student Name</TableCell>
                                    {/* <TableCell className={classes.tableCell}>Link</TableCell> */}
                                    <TableCell className={classes.tableCell}>Date</TableCell>
                                    <TableCell className={classes.tableCell}>Time</TableCell>
                                    <TableCell className={classes.tableCell}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {lectM.map((row) => (
                                    <LectMeetingsDetails
                                        filter={"complete"}
                                        key={row._id}
                                        row={row}
                                        setConfirmDialog={setConfirmDialog}
                                        confirmDelete={confirmDelete}
                                        openForm={openForm}
                                        openApprove={openApprove}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>

                <Paper style={{ margin: "16px 0px", padding: 8 }}>
                    <Typography variant="h6"> Pending Meetings</Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.tableCell}>Meeting Title</TableCell>
                                    <TableCell className={classes.tableCell}>Project Title</TableCell>
                                    <TableCell className={classes.tableCell}>Student Name</TableCell>
                                    {/* <TableCell className={classes.tableCell}>Link</TableCell> */}
                                    <TableCell className={classes.tableCell}>Date</TableCell>
                                    <TableCell className={classes.tableCell}>Time</TableCell>
                                    <TableCell className={classes.tableCell}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {lectM.map((row) => (
                                    <LectMeetingsDetails
                                        filter={"pending"}
                                        key={row._id}
                                        row={row}
                                        setConfirmDialog={setConfirmDialog}
                                        confirmDelete={confirmDelete}
                                        openForm={openForm}
                                        openApprove={openApprove}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>

                <Paper style={{ margin: "16px 0px", padding: 8 }}>
                    <Typography variant="h6">Rejected</Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.tableCell}>Meeting Title</TableCell>
                                    <TableCell className={classes.tableCell}>Project Title</TableCell>
                                    <TableCell className={classes.tableCell}>Student Name</TableCell>
                                    {/* <TableCell className={classes.tableCell}>Link</TableCell> */}
                                    <TableCell className={classes.tableCell}>Date</TableCell>
                                    <TableCell className={classes.tableCell}>Time</TableCell>
                                    <TableCell className={classes.tableCell}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {lectM.map((row) => (
                                    <LectMeetingsDetails
                                        filter={"reject"}
                                        key={row._id}
                                        row={row}
                                        setConfirmDialog={setConfirmDialog}
                                        confirmDelete={confirmDelete}
                                        openForm={openForm}
                                        openApprove={openApprove}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>

                <LectMeetingsPopup openPopup={openPopup} setOpenPopup={setOpenPopup} setCurrentId={setCurrentId}>
                    <LectMeetingsForm currentId={currentId} setCurrentId={setCurrentId} setOpenPopup={setOpenPopup} setNotify={setNotify} />
                </LectMeetingsPopup>
                <Notification notify={notify} setNotify={setNotify} />
                <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
            </Container>
        </Grow>
    );
};

export default LectMeetings;
