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
import { useSelector, useDispatch } from "react-redux";

import { getPanelAssignMark, deletePanelAssignMark } from "../../../../actions/LPanel/PanelAssignMark";

import Notification from "../../Reusable/Notification";
import ConfirmDialog from "../../Reusable/ConfirmDialog";
import PanelAssignMarkDetails from "./PanelAssignMarkDetails";
import PanelAssignMarkForm from "./PanelAssignMarkForm";
import PanelAssignMarkPopup from "./PanelAssignMarkPopup";
import PanelAssignMarkFInput from "./PanelAssignMarkFInput";

import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';

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
    const [openPopup2, setOpenPopup2] = useState(false);

    useEffect(() => {
        dispatch(getPanelAssignMark());
        console.log(panelAM);
    }, [currentId, dispatch]);

    const [notify, setNotify] = useState({ isOpen: false, message: "", type: "" });
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subtitle: "" });

    const openForm = (item) => {
        setCurrentId(item._id);
        setOpenPopup(true);
    };

    const openFInput = (item) => {
        setCurrentId(item._id);
        setOpenPopup2(true);
    };

    const confirmDelete = (id) => {
        dispatch(deletePanelAssignMark(id));
        setNotify({ isOpen: true, message: "Deleted Successfully!", type: "error" });
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false,
        });
    };

    {/* test */}
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    {/* test */}

    return (
        <Grow in>
            
            <Container maxWidth={false}>
            <Paper>
            <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
                <Grid justify="space-between" container spacing={24}>
                    <Grid item>
                    <Typography variant="h5"> Panel Assign Mark </Typography>
                    </Grid>
                    <Grid item>
                    <Button variant="contained" color="primary" onClick={() => setOpenPopup(true)}>
                       Test backend
                    </Button>
                    </Grid>
                </Grid>
            </Toolbar>
            </Paper>
                {/* test */}
            <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} >
                <Tab label="FYP 1" value="1" />
                <Tab label="FYP 2" value="2" />
                </TabList>
            </Box>


            <TabPanel value="1">
                <Paper style={{ margin: "16px 0px", padding: 8, }}>
                <Typography variant="h6">FYP 1 Monitoring</Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableCell}></TableCell>
                            <TableCell className={classes.tableCell}>Title</TableCell>
                            <TableCell className={classes.tableCell}>Student</TableCell>
                            <TableCell className={classes.tableCell}>Link</TableCell>
                            <TableCell className={classes.tableCell}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { panelAM.map((row) => (
                            <PanelAssignMarkDetails filter={'fyp1'} filter2={'moni'} key={row._id} row={row} setConfirmDialog={setConfirmDialog} confirmDelete={confirmDelete} openForm={openForm} openFInput={openFInput} />
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>
                </Paper>

                <Paper style={{ margin: "16px 0px", padding: 8, }}>
                <Typography variant="h6">FYP 1 Viva</Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableCell}></TableCell>
                            <TableCell className={classes.tableCell}>Title</TableCell>
                            <TableCell className={classes.tableCell}>Student</TableCell>
                            <TableCell className={classes.tableCell}>Link</TableCell>
                            <TableCell className={classes.tableCell}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { panelAM.map((row) => (
                            <PanelAssignMarkDetails filter={'fyp1'} filter2={'viva'} key={row._id} row={row} setConfirmDialog={setConfirmDialog} confirmDelete={confirmDelete} openForm={openForm} openFInput={openFInput}/>
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>
                </Paper>
            </TabPanel>


            <TabPanel value="2">
                <Paper style={{ margin: "16px 0px", padding: 8, }}>
                <Typography variant="h6">FYP 2 Monitoring</Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableCell}></TableCell>
                            <TableCell className={classes.tableCell}>Title</TableCell>
                            <TableCell className={classes.tableCell}>Student</TableCell>
                            <TableCell className={classes.tableCell}>Link</TableCell>
                            <TableCell className={classes.tableCell}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { panelAM.map((row) => (
                            <PanelAssignMarkDetails  filter={'fyp2'} filter2={'moni'} key={row._id} row={row} setConfirmDialog={setConfirmDialog} confirmDelete={confirmDelete} openForm={openForm} openFInput={openFInput}/>
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>
                </Paper>

                <Paper style={{ margin: "16px 0px", padding: 8, }}>
                <Typography variant="h6">FYP 2 Viva</Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableCell}></TableCell>
                            <TableCell className={classes.tableCell}>Title</TableCell>
                            <TableCell className={classes.tableCell}>Student</TableCell>
                            <TableCell className={classes.tableCell}>Link</TableCell>
                            <TableCell className={classes.tableCell}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { panelAM.map((row) => (
                            <PanelAssignMarkDetails  filter={'fyp2'} filter2={'viva'} key={row._id} row={row} setConfirmDialog={setConfirmDialog} confirmDelete={confirmDelete} openForm={openForm} openFInput={openFInput}/>
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>
                </Paper>
            </TabPanel>
            </TabContext>
            {/* test */}
            
            
            <PanelAssignMarkPopup openPopup={openPopup} setOpenPopup={setOpenPopup} setCurrentId={setCurrentId}>
                <PanelAssignMarkForm currentId={currentId} setCurrentId={setCurrentId} setOpenPopup={setOpenPopup} setNotify={setNotify} />
            </PanelAssignMarkPopup> 
            <PanelAssignMarkPopup openPopup={openPopup2} setOpenPopup={setOpenPopup2} setCurrentId={setCurrentId}>
                <PanelAssignMarkFInput currentId={currentId} setCurrentId={setCurrentId} setOpenPopup={setOpenPopup2} setNotify={setNotify} />
            </PanelAssignMarkPopup> 
            <Notification notify={notify} setNotify={setNotify} />
            <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
            </Container>
        </Grow>
    );
};

export default PanelAssignMark;