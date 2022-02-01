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

import { getSchedPanel, deleteSchedPanel } from "../../../../actions/Admin/SchedPanel";

import Notification from "../../Reusable/Notification";
import ConfirmDialog from "../../Reusable/ConfirmDialog";
import SchedPanelDetails from "./SchedPanelDetails";
import SchedPanelForm from "./SchedPanelForm";
import SchedPanelPopup from "./SchedPanelPopup";

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

const SchedPanel = () => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const adminSP = useSelector((state) => state.schedPanel);
    const [currentId, setCurrentId] = useState(0);
    const [openPopup, setOpenPopup] = useState(false);

    useEffect(() => {
        dispatch(getSchedPanel());
    }, [currentId, dispatch]);

    const [notify, setNotify] = useState({ isOpen: false, message: "", type: "" });
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subtitle: "" });

    const openForm = (item) => {
        setCurrentId(item._id);
        setOpenPopup(true);
    };

    const confirmDelete = (id) => {
        dispatch(deleteSchedPanel(id));
        setNotify({ isOpen: true, message: "Deleted Successfully!", type: "error" });
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false,
        });
    };

    return (
        <Grow in>
            <Container maxWidth={false}>
            <Paper>
            <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
                <Grid justify="space-between" container spacing={24}>
                    <Grid item>
                    <Typography variant="h5"> Schedule Panel </Typography>
                    </Grid>
                    <Grid item>
                    <Button variant="contained" color="primary" onClick={() => setOpenPopup(true)}>
                       Testing Panel Backend
                    </Button>
                    </Grid>
                </Grid>
            </Toolbar>
            </Paper>
            <Paper style={{ margin: "16px 0px", padding: 8, }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.tableCell}>Lecturer Name</TableCell>
                        <TableCell className={classes.tableCell}>Project Title</TableCell>
                        <TableCell className={classes.tableCell}>Student(s)</TableCell>
                        <TableCell className={classes.tableCell}>Date</TableCell>
                        <TableCell className={classes.tableCell}>Time</TableCell>
                        <TableCell className={classes.tableCell}></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { adminSP.map((row) => (
                        <SchedPanelDetails key={row._id} row={row} setConfirmDialog={setConfirmDialog} confirmDelete={confirmDelete} openForm={openForm} />
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
            </Paper>
            <SchedPanelPopup openPopup={openPopup} setOpenPopup={setOpenPopup} setCurrentId={setCurrentId}>
                <SchedPanelForm currentId={currentId} setCurrentId={setCurrentId} setOpenPopup={setOpenPopup} setNotify={setNotify} />
            </SchedPanelPopup> 
            <Notification notify={notify} setNotify={setNotify} />
            <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
            </Container>
        </Grow>
    );
};

export default SchedPanel;