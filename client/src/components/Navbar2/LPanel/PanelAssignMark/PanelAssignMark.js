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

import { getPanelAssignMark, deletePanelAssignMark } from "../../../../actions/LPanel/PanelAssignMark";

import Notification from "../../Reusable/Notification";
import ConfirmDialog from "../../Reusable/ConfirmDialog";
// import PanelAssignMarkDetails from "./PanelAssignMarkDetails";
// import PanelAssignMarkForm from "./PanelAssignMarkForm";
// import PanelAssignMarkPopup from "./PanelAssignMarkPopup";

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

const PanelAssignMark = () => {

    const dispatch = useDispatch();
    const classes = useStyles();

    const panelAM = useSelector((state) => state.panelAssignMark);
    const [currentId, setCurrentId] = useState(0);
    const [openPopup, setOpenPopup] = useState(false);

    useEffect(() => {
        dispatch(getPanelAssignMark());
    }, [currentId, dispatch]);

    const [notify, setNotify] = useState({ isOpen: false, message: "", type: "" });
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subtitle: "" });

    const openForm = (item) => {
        setCurrentId(item._id);
        setOpenPopup(true);
    };

    const confirmDelete = (id) => {
        dispatch(deletePanelAssignMark(id));
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
                    <Typography variant="h5"> Panel Assign Mark </Typography>
                    </Grid>
                </Grid>
            </Toolbar>
            </Paper>
            </Container>
        </Grow>
    );
};

export default PanelAssignMark;