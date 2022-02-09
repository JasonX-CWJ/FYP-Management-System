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

import { getLectFileSubmitted, deleteLectFileSubmitted } from "../../../../actions/Lecturer/LectFileSubmitted";

import Notification from "../../Reusable/Notification";
import ConfirmDialog from "../../Reusable/ConfirmDialog";
import LectFileSubmittedDetails from "./LectFileSubmittedDetails";
import LectFileSubmittedForm from "./LectFileSubmittedForm";
import LectFileSubmittedPopup from "./LectFileSubmittedPopup";

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

const LectFileSubmitted = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem("profile"));

    const lectFS = useSelector((state) => state.lectFileSubmitted);
    const [currentId, setCurrentId] = useState(0);
    const [openPopup, setOpenPopup] = useState(false);

    useEffect(() => {
        dispatch(getLectFileSubmitted(user?.result?.lecturerData?._id));
    }, [currentId, dispatch]);

    console.log(lectFS);

    const [notify, setNotify] = useState({ isOpen: false, message: "", type: "" });
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subtitle: "" });

    const openForm = (item) => {
        setCurrentId(item._id);
        setOpenPopup(true);
    };

    const confirmDelete = (id) => {
        dispatch(deleteLectFileSubmitted(id));
        setNotify({ isOpen: true, message: "Deleted Successfully!", type: "error" });
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false,
        });
    };
    const [value, setValue] = React.useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Grow in>
            <Container maxWidth={false}>
                <Paper>
                    <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
                        <Grid justify="space-between" container spacing={24}>
                            <Grid item>
                                <Typography variant="h5"> Submission from Students</Typography>
                            </Grid>
                            <Grid item>
                                {/* <Button variant="contained" color="primary" onClick={() => setOpenPopup(true)}>
                                    Submit New File Testing
                                </Button> */}
                            </Grid>
                        </Grid>
                    </Toolbar>
                </Paper>
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
                                            <TableCell className={classes.tableCell}>Student Name</TableCell>
                                            <TableCell className={classes.tableCell}>File</TableCell>
                                            <TableCell className={classes.tableCell}></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {lectFS.map((row) => (
                                            <LectFileSubmittedDetails
                                                key={row._id}
                                                row={row}
                                                content={row.fileSubmission.reportSubmissionFYP1}
                                                setConfirmDialog={setConfirmDialog}
                                                confirmDelete={confirmDelete}
                                                openForm={openForm}
                                            />
                                        ))}
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
                                            <TableCell className={classes.tableCell}>Student Name</TableCell>
                                            <TableCell className={classes.tableCell}>File</TableCell>
                                            <TableCell className={classes.tableCell}></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {lectFS.map((row) => (
                                            <LectFileSubmittedDetails
                                                key={row._id}
                                                row={row}
                                                content={row.fileSubmission.reportSubmissionFYP2}
                                                setConfirmDialog={setConfirmDialog}
                                                confirmDelete={confirmDelete}
                                                openForm={openForm}
                                            />
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </TabPanel>
                </TabContext>

                <LectFileSubmittedPopup openPopup={openPopup} setOpenPopup={setOpenPopup} setCurrentId={setCurrentId}>
                    <LectFileSubmittedForm currentId={currentId} setCurrentId={setCurrentId} setOpenPopup={setOpenPopup} setNotify={setNotify} />
                </LectFileSubmittedPopup>
                <Notification notify={notify} setNotify={setNotify} />
                <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
            </Container>
        </Grow>
    );
};

export default LectFileSubmitted;
