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

import { getRubricWeight, deleteRubricWeight } from "../../../../actions/Admin/RubricWeight";

import Notification from "../../Reusable/Notification";
import ConfirmDialog from "../../Reusable/ConfirmDialog";
import RubricWeightDetails from "./RubricWeightDetails";
import RubricWeightForm from "./RubricWeightForm";
import RubricWeightPopup from "./RubricWeightPopup";

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

const RubricWeight = () => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const adminRW = useSelector((state) => state.rubricWeight);
    const [currentId, setCurrentId] = useState(0);
    const [openPopup, setOpenPopup] = useState(false);

    useEffect(() => {
        dispatch(getRubricWeight());
    }, [currentId, dispatch]);

    const [notify, setNotify] = useState({ isOpen: false, message: "", type: "" });
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subtitle: "" });

    const openForm = (item) => {
        setCurrentId(item._id);
        setOpenPopup(true);
    };

    const confirmDelete = (id) => {
        dispatch(deleteRubricWeight(id));
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
                    <Typography variant="h5"> Rubric and Weightage </Typography>
                    </Grid>
                    <Grid item>
                    <Button variant="contained" color="primary" onClick={() => setOpenPopup(true)}>
                       Insert New
                    </Button>
                    </Grid>
                </Grid>
            </Toolbar>
            </Paper>
            
            {/* added */}
            <Paper style={{ margin: "16px 0px", padding: 8, }}>
            <Grid   container spacing={2} >
                <Grid item  xs={6} >
                    <Typography variant="h5"> FYP1 </Typography>
                </Grid>
                <Grid item  xs={6}>
                    <Typography variant="h5"> FYP2 </Typography>
                </Grid>
            </Grid>
            <Grid   container spacing={2} >
            
            <Grid item  xs={6}>
            <Typography variant="h6"> Technical Evaluation (50%)</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ maxWidth: 650 }} aria-label="simple table" >
                <TableHead >
                    <TableRow>
                        <TableCell className={classes.tableCell}>Dimension</TableCell>
                        <TableCell className={classes.tableCell}>Weightage (%)</TableCell>
                        <TableCell className={classes.tableCell}></TableCell>

                    </TableRow>
                </TableHead>
                <TableBody >
                    {adminRW.map((row) => (
                        <RubricWeightDetails filter={'fyp1'} filter2={'techeval'} key={row._id} row={row} setConfirmDialog={setConfirmDialog} confirmDelete={confirmDelete} openForm={openForm} />
                    ))}
                </TableBody>
                
                </Table>
            </TableContainer>
            <Typography variant="h6"> <br/> Soft Skills Evaluation (10%)</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ maxWidth: 650 }} aria-label="simple table" >
                <TableHead >
                    <TableRow>
                        <TableCell className={classes.tableCell}>Dimension</TableCell>
                        <TableCell className={classes.tableCell}>Weightage (%)</TableCell>
                        <TableCell className={classes.tableCell}></TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    { adminRW.map((row) => (
                        <RubricWeightDetails filter={'fyp1'} filter2={'softskillseval'} key={row._id} row={row} setConfirmDialog={setConfirmDialog} confirmDelete={confirmDelete} openForm={openForm} />
                    ))}
                </TableBody>
                
                </Table>
            </TableContainer>
            
            </Grid>
            <Grid item  xs={6}>
            <Typography variant="h6"> Technical Evaluation (50%)</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ maxWidth: 650 }} aria-label="simple table" >
                <TableHead >
                    <TableRow>
                        <TableCell className={classes.tableCell}>Dimension</TableCell>
                        <TableCell className={classes.tableCell}>Weightage (%)</TableCell>
                        <TableCell className={classes.tableCell}></TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    { adminRW.map((row) => (
                        <RubricWeightDetails filter={'fyp2'} filter2={'techeval'} key={row._id} row={row} setConfirmDialog={setConfirmDialog} confirmDelete={confirmDelete} openForm={openForm} />
                    ))}
                </TableBody>
                
                </Table>
            </TableContainer>
            <Typography variant="h6"><br/> Soft Skills Evaluation (10%)</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ maxWidth: 650 }} aria-label="simple table" >
                <TableHead >
                    <TableRow>
                        <TableCell className={classes.tableCell}>Dimension</TableCell>
                        <TableCell className={classes.tableCell}>Weightage (%)</TableCell>
                        <TableCell className={classes.tableCell}></TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    { adminRW.map((row) => (
                        <RubricWeightDetails filter={'fyp2'} filter2={'softskillseval'} key={row._id} row={row} setConfirmDialog={setConfirmDialog} confirmDelete={confirmDelete} openForm={openForm} />
                    ))}
                </TableBody>
                
                </Table>
            </TableContainer>
            </Grid>
            </Grid>
            </Paper>
            {/* added */}

            <RubricWeightPopup openPopup={openPopup} setOpenPopup={setOpenPopup} setCurrentId={setCurrentId}>
                <RubricWeightForm currentId={currentId} setCurrentId={setCurrentId} setOpenPopup={setOpenPopup} setNotify={setNotify} />
            </RubricWeightPopup> 
            <Notification notify={notify} setNotify={setNotify} />
            <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
            </Container>
        </Grow>
    );
};

export default RubricWeight;