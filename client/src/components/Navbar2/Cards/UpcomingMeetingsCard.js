import React, { useEffect, useState } from "react";
import {
    makeStyles,
    Paper,
    TableBody,
    TableCell,
    TableRow,
    Typography,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
// import { getMeetings } from "../../../actions/Student/Meetings";
// import { getLectMeetings } from "../../../actions/Lecturer/LectMeetings";

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

    // useEffect(() => {
    //     dispatch(getMeetings());
    //     dispatch(getLectMeetings());
    // }, [currentId, dispatch]);

    return (
        <Paper style={{ margin: "16px 0px", padding: 8, }}>
            <Typography variant="h6">Upcoming Meeting</Typography>

            below is for student user, view in code
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

            <br/>below is for lecturer user, view in code, double check the models, might be wrong or nonexistent
            {/* <TableBody>
            {lectM.map((row) => (
                <React.Fragment>
                <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell className={classes.tableCell} component="th" scope="row">
                        {row.title}
                    </TableCell>
                    <TableCell className={classes.tableCellMobile}>{row.projectTitle}</TableCell>
                    <TableCell className={classes.tableCellMobile}>{row.studName}</TableCell>
                    <TableCell className={classes.tableCellMobile}>{row.date}</TableCell>
                    <TableCell className={classes.tableCellMobile}>{row.time}</TableCell>
                </TableRow>
            </React.Fragment>
            ))}
            </TableBody> */}
        </Paper>
    );
};

export default UpcomingMeetingsCard;
