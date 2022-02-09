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

import { getProjectRepo, deleteProjectRepo, approveLectProjectDet } from "../../../../actions/ProjectRepo";

import Notification from "../../Reusable/Notification";
import ConfirmDialog from "../../Reusable/ConfirmDialog";
import ProjectRepoDetails from "./ProjectRepoDetails";
import ROLE from "../../../../constants/userRole";
import STATUS from "../../../../constants/projectStatus";
// import ProjectRepoPopup from "./ProjectRepoPopup";
// import ProjectRepoForm from "./ProjectRepoForm";

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

const ProjectRepo = () => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const user = JSON.parse(localStorage.getItem("profile")); // get current user

    const projectRepo = useSelector((state) => state.projectRepo);
    const [currentId, setCurrentId] = useState(0);
    const [openPopup, setOpenPopup] = useState(false);

    useEffect(() => {
        dispatch(getProjectRepo());
    }, [currentId, dispatch]);

    const [notify, setNotify] = useState({ isOpen: false, message: "", type: "" });
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subtitle: "" });

    const openForm = (item, status) => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false,
        });
        dispatch(approveLectProjectDet(item._id, { status: status }));
    };

    const confirmDelete = (id) => {
        dispatch(deleteProjectRepo(id));
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
                                <Typography variant="h5"> Project Repository </Typography>
                            </Grid>
                            {/* <Grid item>
                    <Button variant="contained" color="primary" onClick={() => setOpenPopup(true)}>
                       Testing Only, will remove
                    </Button>
                    </Grid> */}
                        </Grid>
                    </Toolbar>
                </Paper>

                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList onChange={handleChange}>
                            <Tab label="Computer System & Network" value="1" />
                            <Tab label="Software Engineering" value="2" />
                            <Tab label="Artificial Intelligence" value="3" />
                            <Tab label="Information System" value="4" />
                            <Tab label="Multimedia" value="5" />
                        </TabList>
                    </Box>
                    {/* CSN */}
                    <TabPanel value="1">
                        <Paper style={{ margin: "16px 0px", padding: 8 }}>
                            <Typography variant="h6">Active Computer System & Network Title</Typography>
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
                                            <TableCell className={classes.tableCell}>Student(s)</TableCell>
                                            <TableCell className={classes.tableCell}></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {projectRepo.map((row) => (
                                            <ProjectRepoDetails
                                                filter={"CSN"}
                                                filter2={"active"}
                                                key={row._id}
                                                row={row}
                                                setConfirmDialog={setConfirmDialog}
                                                confirmDelete={confirmDelete}
                                                openForm={openForm}
                                            />
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                        <Paper style={{ margin: "16px 0px", padding: 8 }}>
                            <Typography variant="h6">Available Computer System & Network Title</Typography>
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
                                        {projectRepo.map((row) => (
                                            <ProjectRepoDetails
                                                filter={"CSN"}
                                                filter2={"accept"}
                                                key={row._id}
                                                row={row}
                                                setConfirmDialog={setConfirmDialog}
                                                confirmDelete={confirmDelete}
                                                openForm={openForm}
                                            />
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                        {user?.result?.role === ROLE.ADMIN && (
                            <Paper style={{ margin: "16px 0px", padding: 8 }}>
                                <Typography variant="h6">Admin Pending Computer System & Network Title</Typography>
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
                                            {projectRepo.map((row) => (
                                                <ProjectRepoDetails
                                                    filter={"CSN"}
                                                    filter2={"pending"}
                                                    key={row._id}
                                                    row={row}
                                                    setConfirmDialog={setConfirmDialog}
                                                    confirmDelete={confirmDelete}
                                                    openForm={openForm}
                                                />
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        )}
                    </TabPanel>

                    {/* SE */}
                    <TabPanel value="2">
                        <Paper style={{ margin: "16px 0px", padding: 8 }}>
                            <Typography variant="h6">Active Software Engineering Title</Typography>
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
                                            <TableCell className={classes.tableCell}>Student(s)</TableCell>
                                            <TableCell className={classes.tableCell}></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {projectRepo.map((row) => (
                                            <ProjectRepoDetails
                                                filter={"SE"}
                                                filter2={"active"}
                                                key={row._id}
                                                row={row}
                                                setConfirmDialog={setConfirmDialog}
                                                confirmDelete={confirmDelete}
                                                openForm={openForm}
                                            />
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                        <Paper style={{ margin: "16px 0px", padding: 8 }}>
                            <Typography variant="h6">Available Software Engineering Title</Typography>
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
                                        {projectRepo.map((row) => (
                                            <ProjectRepoDetails
                                                filter={"SE"}
                                                filter2={"accept"}
                                                key={row._id}
                                                row={row}
                                                setConfirmDialog={setConfirmDialog}
                                                confirmDelete={confirmDelete}
                                                openForm={openForm}
                                            />
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                        {user?.result?.role === ROLE.ADMIN && (
                            <Paper style={{ margin: "16px 0px", padding: 8 }}>
                                <Typography variant="h6">Admin Pending Software Engineering Title</Typography>
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
                                            {projectRepo.map((row) => (
                                                <ProjectRepoDetails
                                                    filter={"SE"}
                                                    filter2={"pending"}
                                                    key={row._id}
                                                    row={row}
                                                    setConfirmDialog={setConfirmDialog}
                                                    confirmDelete={confirmDelete}
                                                    openForm={openForm}
                                                />
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        )}
                    </TabPanel>

                    {/* AI */}
                    <TabPanel value="3">
                        <Paper style={{ margin: "16px 0px", padding: 8 }}>
                            <Typography variant="h6">Active Artificial Intelligence Title</Typography>
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
                                            <TableCell className={classes.tableCell}>Student(s)</TableCell>
                                            <TableCell className={classes.tableCell}></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {projectRepo.map((row) => (
                                            <ProjectRepoDetails
                                                filter={"AI"}
                                                filter2={"active"}
                                                key={row._id}
                                                row={row}
                                                setConfirmDialog={setConfirmDialog}
                                                confirmDelete={confirmDelete}
                                                openForm={openForm}
                                            />
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                        <Paper style={{ margin: "16px 0px", padding: 8 }}>
                            <Typography variant="h6">Available Artificial Intelligence Title</Typography>
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
                                        {projectRepo.map((row) => (
                                            <ProjectRepoDetails
                                                filter={"AI"}
                                                filter2={"accept"}
                                                key={row._id}
                                                row={row}
                                                setConfirmDialog={setConfirmDialog}
                                                confirmDelete={confirmDelete}
                                                openForm={openForm}
                                            />
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                        {user?.result?.role === ROLE.ADMIN && (
                            <Paper style={{ margin: "16px 0px", padding: 8 }}>
                                <Typography variant="h6">Admin Pending Artifical Intelligence Title</Typography>
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
                                            {projectRepo.map((row) => (
                                                <ProjectRepoDetails
                                                    filter={"AI"}
                                                    filter2={"pending"}
                                                    key={row._id}
                                                    row={row}
                                                    setConfirmDialog={setConfirmDialog}
                                                    confirmDelete={confirmDelete}
                                                    openForm={openForm}
                                                />
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        )}
                    </TabPanel>

                    {/* IS */}
                    <TabPanel value="4">
                        <Paper style={{ margin: "16px 0px", padding: 8 }}>
                            <Typography variant="h6">Active Information System Title</Typography>
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
                                            <TableCell className={classes.tableCell}>Student(s)</TableCell>
                                            <TableCell className={classes.tableCell}></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {projectRepo.map((row) => (
                                            <ProjectRepoDetails
                                                filter={"IS"}
                                                filter2={"active"}
                                                key={row._id}
                                                row={row}
                                                setConfirmDialog={setConfirmDialog}
                                                confirmDelete={confirmDelete}
                                                openForm={openForm}
                                            />
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                        <Paper style={{ margin: "16px 0px", padding: 8 }}>
                            <Typography variant="h6">Available Information System Title</Typography>
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
                                        {projectRepo.map((row) => (
                                            <ProjectRepoDetails
                                                filter={"IS"}
                                                filter2={"accept"}
                                                key={row._id}
                                                row={row}
                                                setConfirmDialog={setConfirmDialog}
                                                confirmDelete={confirmDelete}
                                                openForm={openForm}
                                            />
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                        {user?.result?.role === ROLE.ADMIN && (
                            <Paper style={{ margin: "16px 0px", padding: 8 }}>
                                <Typography variant="h6">Admin Pending Information System Title</Typography>
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
                                            {projectRepo.map((row) => (
                                                <ProjectRepoDetails
                                                    filter={"IS"}
                                                    filter2={"pending"}
                                                    key={row._id}
                                                    row={row}
                                                    setConfirmDialog={setConfirmDialog}
                                                    confirmDelete={confirmDelete}
                                                    openForm={openForm}
                                                />
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        )}
                    </TabPanel>

                    {/* MU */}
                    <TabPanel value="5">
                        <Paper style={{ margin: "16px 0px", padding: 8 }}>
                            <Typography variant="h6">Active Multimedia Title</Typography>
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
                                            <TableCell className={classes.tableCell}>Student(s)</TableCell>
                                            <TableCell className={classes.tableCell}></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {projectRepo.map((row) => (
                                            <ProjectRepoDetails
                                                filter={"MU"}
                                                filter2={"active"}
                                                key={row._id}
                                                row={row}
                                                setConfirmDialog={setConfirmDialog}
                                                confirmDelete={confirmDelete}
                                                openForm={openForm}
                                            />
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                        <Paper style={{ margin: "16px 0px", padding: 8 }}>
                            <Typography variant="h6">Available Multimedia Title</Typography>
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
                                        {projectRepo.map((row) => (
                                            <ProjectRepoDetails
                                                filter={"MU"}
                                                filter2={"accept"}
                                                key={row._id}
                                                row={row}
                                                setConfirmDialog={setConfirmDialog}
                                                confirmDelete={confirmDelete}
                                                openForm={openForm}
                                            />
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                        {user?.result?.role === ROLE.ADMIN && (
                            <Paper style={{ margin: "16px 0px", padding: 8 }}>
                                <Typography variant="h6">Admin Pending Multimedia Title</Typography>
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
                                            {projectRepo.map((row) => (
                                                <ProjectRepoDetails
                                                    filter={"MU"}
                                                    filter2={"pending"}
                                                    key={row._id}
                                                    row={row}
                                                    setConfirmDialog={setConfirmDialog}
                                                    confirmDelete={confirmDelete}
                                                    openForm={openForm}
                                                />
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        )}
                    </TabPanel>
                </TabContext>

                {/* <ProjectRepoPopup openPopup={openPopup} setOpenPopup={setOpenPopup} setCurrentId={setCurrentId}>
                <ProjectRepoForm currentId={currentId} setCurrentId={setCurrentId} setOpenPopup={setOpenPopup} setNotify={setNotify} />
            </ProjectRepoPopup> */}
                <Notification notify={notify} setNotify={setNotify} />
                <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
            </Container>
        </Grow>
    );
};

export default ProjectRepo;
