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
    Box,
    IconButton, Collapse
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
// import { getProjectDet } from "../../../actions/Student/ProjectDetails";
// import { getLectProjectDet } from "../../../actions/Lecturer/LectProjectDetails";
// import { getProjectRepo } from "../../../actions/ProjectRepo";

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

const ProjectDetailCard = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [openDetail, setOpenDetail] = useState(false);

    const studPD = useSelector((state) => state.ProjectDetails);
    const lectPD = useSelector((state) => state.lectProjectDetails);
    const projectRepo = useSelector((state) => state.projectRepo);
    
    const [currentId, setCurrentId] = useState(0);

    // useEffect(() => {
    //     dispatch(getProjectDet());
    //     dispatch(getLectProjectDet());
    //     dispatch(getProjectRepo());
    // }, [currentId, dispatch]);

    return (
        <Paper style={{ margin: "16px 0px", padding: 8, }}>

        below is for student user, view in code
        <Typography variant="h6">Project Details</Typography>

        <TableCell>
            <TableRow>
            <TableCell>
            <Typography variant="body1">Title: take student user active title</Typography>
            </TableCell>
            </TableRow>
            <TableRow>
            <TableCell>
            <Typography variant="body1">Supervisor: take student user supervisor</Typography>
            </TableCell>
            </TableRow>
            <TableRow>
            <TableCell>
            <Typography variant="body1">Panel(s): take student user panel</Typography>
            </TableCell>
            </TableRow>
            <TableRow>
            <TableCell>
            <Typography variant="body1">Stakeholder: take student user supervisor</Typography>
            </TableCell>
            </TableRow>
            <TableRow>
            <TableCell>
            <Typography variant="body1">Team Member: take student user team member</Typography>
            </TableCell>
            </TableRow>
            <TableRow>
            <TableCell>
            <Typography variant="body1">Team Member Matric Number: take student user team member matric number</Typography>
            </TableCell>
            </TableRow>
        </TableCell>

        <br/>below is for lecturer user who has active projects, view in code
        <Typography variant="h6">Projects Under Supervision</Typography>
        
        {/* <TableBody>
        {lectPD.map((row) => (
            <React.Fragment>
            {(row.status === 'active') && (
                <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>
                <Typography variant="body1">Title: take active title</Typography>
                <Typography variant="body1">Student(s): take students in active title</Typography>
                <Typography variant="body1">Stakeholder: take stakeholder in active title</Typography>
                <Typography variant="body1">Panel(s): take panel in active title</Typography>
                
                <Typography variant="body1">Meeting(s) Completed: take meetings completed for in active title</Typography>
                </TableCell>
                </TableRow>
            )}
            
        </React.Fragment>
        ))}
        </TableBody> */}

        <br/>below is for lecturer user who is panel, view in code, not yet done please wait
        <Typography variant="h6">Projects to Panel</Typography>

        {/* <TableBody>
        {projectRepo.map((row) => (
            <React.Fragment>
            {(row.status === 'active') && (
                <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>
                <Typography variant="body1">Title: take active title</Typography>
                <Typography variant="body1">Student(s): take students in active title</Typography>
                <Typography variant="body1">Supervisor: take supervisor in active title</Typography>
                
                <Typography variant="body1">Monitoring Marking: completed or not?</Typography>
                <Typography variant="body1">Viva Marking: completed or not?</Typography>
                </TableCell>
                </TableRow>
            )}
            
        </React.Fragment>
        ))}
        </TableBody> */}
    </Paper>
    );
};

export default ProjectDetailCard;
