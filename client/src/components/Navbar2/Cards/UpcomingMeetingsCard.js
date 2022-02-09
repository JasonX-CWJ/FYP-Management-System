import React, { useEffect, useState } from "react";
import { makeStyles, Paper, TableBody, TableCell, Table, TableHead, TableRow, Typography } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
// import { getMeetings } from "../../../actions/Student/Meetings";
import { getLectMeetings } from "../../../actions/Lecturer/LectMeetings";
import MEETING from "../../../constants/meetingStatus";
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

const UpcomingMeetingsCard = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [openDetail, setOpenDetail] = useState(false);

    const studM = useSelector((state) => state.Meetings);
    const lectM = useSelector((state) => state.lectMeetings);

    const [currentId, setCurrentId] = useState(0);
    const user = JSON.parse(localStorage.getItem("profile")); // get current user

    useEffect(() => {
        // dispatch(getMeetings());
        dispatch(getLectMeetings());
    }, [currentId, dispatch]);

    return (
        <Paper style={{ margin: "16px 0px", padding: 8 }}>
            <Typography variant="h6">Upcoming Meeting</Typography>
            {/* <TableBody>
            {studM.map((row) => (
                <React.Fragment>
                <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell className={classes.tableCell} component="th" scope="row">
                        {row.title}
                    </TableCell>
                    <TableCell className={classes.tableCellMobile}>{row.date}</TableCell>
                    <TableCell className={classes.tableCellMobile}>{row.time}</TableCell>
                </TableRow>
            </React.Fragment>
            ))}
            </TableBody> */}
            {/* <br/>below is for lecturer user, view in code, double check the models, might be wrong or nonexistent */}

            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.tableCell}>Title</TableCell>
                        <TableCell className={classes.tableCell}>Date</TableCell>
                        <TableCell className={classes.tableCell}>Time</TableCell>
                    </TableRow>
                </TableHead>
                {user?.result?.role === ROLE.STUDENT && (
                    <TableBody>
                        {lectM.map(
                            (row) =>
                                user?.result?.studentData?._id === row?.studentID?._id &&
                                row?.status === MEETING.ACTIVE && (
                                    <React.Fragment>
                                        <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                            <TableCell className={classes.tableCell} component="th" scope="row">
                                                {row.title}
                                            </TableCell>
                                            <TableCell className={classes.tableCell}>{row.date}</TableCell>
                                            <TableCell className={classes.tableCell}>{row.time}</TableCell>
                                        </TableRow>
                                    </React.Fragment>
                                )
                        )}
                    </TableBody>
                )}
                {user?.result?.role === ROLE.LECTURER && (
                    <TableBody>
                        {lectM.map(
                            (row) =>
                                user?.result?.lecturerData?._id === row?.supervisorID?._id &&
                                row?.status === MEETING.ACTIVE && (
                                    <React.Fragment>
                                        <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                            <TableCell className={classes.tableCell} component="th" scope="row">
                                                {row.title}
                                            </TableCell>
                                            <TableCell className={classes.tableCell}>{row.date}</TableCell>
                                            <TableCell className={classes.tableCell}>{row.time}</TableCell>
                                        </TableRow>
                                    </React.Fragment>
                                )
                        )}
                    </TableBody>
                )}
            </Table>
        </Paper>
    );
};

export default UpcomingMeetingsCard;
