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

// import { getMeetings, deleteMeetings } from "../../../../actions/Student/Meetings";

import Notification from "../../Reusable/Notification";
import ConfirmDialog from "../../Reusable/ConfirmDialog";
import MeetingsDetails from "./MeetingsDetails";
import MeetingsForm from "./MeetingsForm";
import MeetingsPopup from "./MeetingsPopup";

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

const Meetings = () => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const studM = useSelector((state) => state.Meetings);
    const [currentId, setCurrentId] = useState(0);
    const [openPopup, setOpenPopup] = useState(false);

    // useEffect(() => {
    //     dispatch(getMeetings());
    // }, [currentId, dispatch]);

    const [notify, setNotify] = useState({ isOpen: false, message: "", type: "" });
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subtitle: "" });

    const openForm = (item) => {
        setCurrentId(item._id);
        setOpenPopup(true);
    };

    // const confirmDelete = (id) => {
    //     dispatch(deleteMeetings(id));
    //     setNotify({ isOpen: true, message: "Deleted Successfully!", type: "error" });
    //     setConfirmDialog({
    //         ...confirmDialog,
    //         isOpen: false,
    //     });
    // };

    return (
        <Grow in>
            <Container maxWidth={false}>
            <Paper>
            <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
                <Grid justify="space-between" container spacing={24}>
                    <Grid item>
                    <Typography variant="h5"> Meetings </Typography>
                    </Grid>
                    <Grid item>
                    <Button variant="contained" color="primary" onClick={() => setOpenPopup(true)}>
                       Submit New Meeting
                    </Button>
                    </Grid>
                </Grid>
            </Toolbar>
            </Paper>

            <Paper style={{ margin: "16px 0px", padding: 8, }}>

            <Grid   container spacing={2} >
            <Grid item  xs={6}>
            <Typography variant="h6">Upcoming Meetings</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ maxWidth: 650 }} aria-label="simple table" >
                <TableHead >
                    <TableRow>
                        <TableCell className={classes.tableCell}>Meeting Title</TableCell>
                        <TableCell className={classes.tableCell}>Date</TableCell>
                        <TableCell className={classes.tableCell}>Time</TableCell>
                        <TableCell className={classes.tableCell}></TableCell>

                    </TableRow>
                </TableHead>
                <TableBody >
                    {/* {studM.map((row) => (
                        <MeetingsDetails filter={'upcoming'} key={row._id} row={row} setConfirmDialog={setConfirmDialog} confirmDelete={confirmDelete} openForm={openForm} />
                    ))} */}
                </TableBody>
                
                </Table>
            </TableContainer>
            
            </Grid>
            <Grid item  xs={6}>
            <Typography variant="h6">Completed Meetings</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ maxWidth: 650 }} aria-label="simple table" >
                <TableHead >
                    <TableRow>
                        <TableCell className={classes.tableCell}>Meeting Title</TableCell>
                        <TableCell className={classes.tableCell}>Date</TableCell>
                        <TableCell className={classes.tableCell}>Time</TableCell>
                        <TableCell className={classes.tableCell}></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* { studM.map((row) => (
                        <MeetingsDetails filter={'completed'} key={row._id} row={row} setConfirmDialog={setConfirmDialog} confirmDelete={confirmDelete} openForm={openForm} />
                    ))} */}
                </TableBody>
                
                </Table>
            </TableContainer>
            </Grid>
            </Grid>
            </Paper>
            
            <Paper style={{ margin: "16px 0px", padding: 8, }}>

            <Grid   container spacing={2} >
            <Grid item  xs={6}>
            <Typography variant="h6">Applied Meetings</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ maxWidth: 650 }} aria-label="simple table" >
                <TableHead >
                    <TableRow>
                        <TableCell className={classes.tableCell}>Meeting Title</TableCell>
                        <TableCell className={classes.tableCell}>Date</TableCell>
                        <TableCell className={classes.tableCell}>Time</TableCell>
                        <TableCell className={classes.tableCell}></TableCell>

                    </TableRow>
                </TableHead>
                <TableBody >
                    {/* {studM.map((row) => (
                        <MeetingsDetails filter={'pending'} key={row._id} row={row} setConfirmDialog={setConfirmDialog} confirmDelete={confirmDelete} openForm={openForm} />
                    ))} */}
                </TableBody>
                
                </Table>
            </TableContainer>
            
            </Grid>
            <Grid item  xs={6}>
            <Typography variant="h6">Rejected Meetings</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ maxWidth: 650 }} aria-label="simple table" >
                <TableHead >
                    <TableRow>
                        <TableCell className={classes.tableCell}>Meeting Title</TableCell>
                        <TableCell className={classes.tableCell}>Date</TableCell>
                        <TableCell className={classes.tableCell}>Time</TableCell>
                        <TableCell className={classes.tableCell}></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* { studM.map((row) => (
                        <MeetingsDetails filter={'rejected'} key={row._id} row={row} setConfirmDialog={setConfirmDialog} confirmDelete={confirmDelete} openForm={openForm} />
                    ))} */}
                </TableBody>
                
                </Table>
            </TableContainer>
            </Grid>
            </Grid>
            </Paper>

            <MeetingsPopup openPopup={openPopup} setOpenPopup={setOpenPopup} setCurrentId={setCurrentId}>
                <MeetingsForm currentId={currentId} setCurrentId={setCurrentId} setOpenPopup={setOpenPopup} setNotify={setNotify} />
            </MeetingsPopup> 
            <Notification notify={notify} setNotify={setNotify} />
            <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />

            </Container>
        </Grow>
    );
};

export default Meetings;
