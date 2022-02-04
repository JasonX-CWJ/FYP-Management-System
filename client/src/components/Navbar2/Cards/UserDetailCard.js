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

const UserDetailCard = () => {
    const user = JSON.parse(localStorage.getItem("profile")); // get current user

    const dispatch = useDispatch();
    const classes = useStyles();

    const [currentId, setCurrentId] = useState(0);

    // useEffect(() => {
    //     dispatch();
    // }, [currentId, dispatch]);

    return (
        <Paper style={{  padding: 8, }}>
            This should only be seen for student, do if role is student
            <Typography variant="h6">Student Details</Typography>
            <TableCell>
                <TableRow>
                <TableCell>
                <Typography variant="body1">Name: {user?.result.name}</Typography>
                </TableCell>
                </TableRow>
                <TableRow>
                <TableCell>
                <Typography variant="body1">Matric Number: take student user matric number</Typography>
                </TableCell>
                </TableRow>
                <TableRow>
                <TableCell>
                <Typography variant="body1">Department: take student user department</Typography>
                </TableCell>
                </TableRow>
                <TableRow>
                <TableCell>
                <Typography variant="body1">Semester: take student user semester</Typography>
                </TableCell>
                </TableRow>
                <TableRow>
                <TableCell>
                <Typography variant="body1">Session: take student user session</Typography>
                </TableCell>
                </TableRow>
            </TableCell>



            This should only be seen for lecturer, do if role is lecturer
            <Typography variant="h6">Lecturer Details</Typography>
            <TableCell>
                <TableRow>
                <TableCell>
                <Typography variant="body1">Name: {user?.result.name}</Typography>
                </TableCell>
                </TableRow>
                <TableRow>
                <TableCell>
                <Typography variant="body1">Department: take lecturer user department</Typography>
                </TableCell>
                </TableRow>
                <TableRow>
                <TableCell>
                <Typography variant="body1">Role(s): should show role of lecturer user, example:<br/>Lecturer, Supervisor  or Lecturer, Panel or Lecturer</Typography>
                </TableCell>
                </TableRow>
                below only applicable if have active projects
                <TableRow>
                <TableCell>
                <Typography variant="body1">Total Projects Under Supervision: take lecturer user total supervision</Typography>
                </TableCell>
                </TableRow>
                below only applicable if user is a panel
                <TableRow>
                <TableCell>
                <Typography variant="body1">Total Projects to Panel: take lecturer user total panel</Typography>
                </TableCell>
                </TableRow>
            </TableCell>
        </Paper>

        
    );
};

export default UserDetailCard;
