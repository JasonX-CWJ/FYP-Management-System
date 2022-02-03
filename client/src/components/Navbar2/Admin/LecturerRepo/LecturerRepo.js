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

// import { getLecturerRepo, deleteLecturerRepo } from "../../../../actions/Admin/LecturerRepo";

import Notification from "../../Reusable/Notification";
import ConfirmDialog from "../../Reusable/ConfirmDialog";
import LecturerRepoDetails from "./LecturerRepoDetails";
import LecturerRepoForm from "./LecturerRepoForm";
import LecturerRepoPopup from "./LecturerRepoPopup";

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

const LecturerRepo = () => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const adminLR = useSelector((state) => state.lecturerRepo);
    const [currentId, setCurrentId] = useState(0);
    const [openPopup, setOpenPopup] = useState(false);

    // useEffect(() => {
    //     dispatch(getLecturerRepo());
    // }, [currentId, dispatch]);

    const [notify, setNotify] = useState({ isOpen: false, message: "", type: "" });
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subtitle: "" });

    const openForm = (item) => {
        setCurrentId(item._id);
        setOpenPopup(true);
    };

    // const confirmDelete = (id) => {
    //     dispatch(deleteLecturerRepo(id));
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
                    <Typography variant="h5"> Lecturer Repository </Typography>
                    </Grid>
                    <Grid item>
                    <Button variant="contained" color="primary" onClick={() => setOpenPopup(true)}>
                       Testing Repo Backend
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
                        <TableCell className={classes.tableCell}>Department</TableCell>
                        <TableCell className={classes.tableCell}>Lecturer Name</TableCell>
                        <TableCell className={classes.tableCell}>Email</TableCell>
                        <TableCell className={classes.tableCell}>Role(s)</TableCell>
                        <TableCell className={classes.tableCell}></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* { adminLR.map((row) => (
                        <LecturerRepoDetails key={row._id} row={row} setConfirmDialog={setConfirmDialog} confirmDelete={confirmDelete} openForm={openForm} />
                    ))} */}
                </TableBody>
                </Table>
            </TableContainer>
            </Paper>

            <LecturerRepoPopup openPopup={openPopup} setOpenPopup={setOpenPopup} setCurrentId={setCurrentId}>
                <LecturerRepoForm currentId={currentId} setCurrentId={setCurrentId} setOpenPopup={setOpenPopup} setNotify={setNotify} />
            </LecturerRepoPopup> 
            <Notification notify={notify} setNotify={setNotify} />
            <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
            </Container>
        </Grow>
    );
};

export default LecturerRepo;
