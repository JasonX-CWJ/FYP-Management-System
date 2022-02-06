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
    IconButton,
    Collapse,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import ROLE from "../../../constants/userRole";

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
        <Paper style={{ padding: 8 }}>
            {user?.result?.role === ROLE.STUDENT && (
                <>
                    <Typography variant="h6">Student Details</Typography>
                    <TableCell>
                        <TableRow>
                            <TableCell>
                                <Typography variant="body1">Name: {user?.result.name}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography variant="body1">Matric Number: {user?.result?.studentData.matricNo}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography variant="body1">Department: {user?.result?.studentData.department}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography variant="body1">Semester: {user?.result?.studentData.semester}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography variant="body1">Session: {user?.result?.studentData.session}</Typography>
                            </TableCell>
                        </TableRow>
                    </TableCell>
                </>
            )}
            {(user?.result?.role === ROLE.LECTURER || user?.result?.role === ROLE.PANEL || user?.result?.role === ROLE.ADMIN) && (
                <>
                    <Typography variant="h6">Lecturer Details</Typography>
                    <TableCell>
                        <TableRow>
                            <TableCell>
                                <Typography variant="body1">Name: {user?.result.name}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography variant="body1">Department: {user?.result?.lecturerData.department}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                {user?.result?.role === ROLE.LECTURER && <Typography variant="body1">Role(s): Supervisor</Typography>}
                                {user?.result?.role === ROLE.PANEL && <Typography variant="body1">Role(s): Supervisor and Panel</Typography>}
                                {user?.result?.role === ROLE.ADMIN && <Typography variant="body1">Role(s): Admin</Typography>}
                            </TableCell>
                        </TableRow>
                        {/* <TableRow>
                            <TableCell>
                                <Typography variant="body1">Total Projects Under Supervision: take lecturer user total supervision</Typography>
                            </TableCell>
                        </TableRow> */}
                        {/* below only applicable if user is a panel
                        <TableRow>
                            <TableCell>
                                <Typography variant="body1">Total Projects to Panel: take lecturer user total panel</Typography>
                            </TableCell>
                        </TableRow> */}
                    </TableCell>
                </>
            )}
        </Paper>
    );
};

export default UserDetailCard;
