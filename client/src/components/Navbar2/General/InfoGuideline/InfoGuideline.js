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
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

import { getInfoGuide, deleteInfoGuide } from "../../../../actions/infoGuideline";

import Notification from "../../Reusable/Notification";
import ConfirmDialog from "../../Reusable/ConfirmDialog";
import InfoGuidelineDetails from "./InfoGuidelineDetails";
import InfoGuidelineForm from "./InfoGuidelineForm";
import AddInfoGuidelinePopup from "./AddInfoGuidelinePopup";

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

const InfoGuideline = () => {
    
    const dispatch = useDispatch();
    const classes = useStyles();

    const infoGuides = useSelector((state) => state.infoGuideline); //selector to get all posts using the useEffect
    const [currentId, setCurrentId] = useState(0); //state to fetch the correct announcement post
    const [openPopup, setOpenPopup] = useState(false); //state for the popup dialog to add annoucement

    //Get all announcement posts
    useEffect(() => {
        dispatch(getInfoGuide());
    }, [currentId, dispatch]);

    // Popup dialog and Notification states
    const [notify, setNotify] = useState({ isOpen: false, message: "", type: "" });
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subtitle: "" });

    const openForm = (item) => {
        setCurrentId(item._id);
        setOpenPopup(true);
    };

    const confirmDelete = (id) => {
        dispatch(deleteInfoGuide(id));
        setNotify({ isOpen: true, message: "Deleted Successfully!", type: "error" });
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false,
        });
    };

    return (
        <Grow in>
            <Container maxWidth={false}>
            <Typography variant="h5"> All Info and Guidelines</Typography>
            <div></div>
            <Paper>
            <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="contained" color="primary" onClick={() => setOpenPopup(true)}>
                    New
                </Button>
            </Toolbar>
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
                        { infoGuides.map((row) => (
                            <InfoGuidelineDetails key={row._id} row={row} setConfirmDialog={setConfirmDialog} confirmDelete={confirmDelete} openForm={openForm} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </Paper>
            <AddInfoGuidelinePopup openPopup={openPopup} setOpenPopup={setOpenPopup} setCurrentId={setCurrentId}>
                <InfoGuidelineForm currentId={currentId} setCurrentId={setCurrentId} setOpenPopup={setOpenPopup} setNotify={setNotify} />
            </AddInfoGuidelinePopup>
            <Notification notify={notify} setNotify={setNotify} />
            <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
            </Container>
        </Grow>
    );
};

export default InfoGuideline;
