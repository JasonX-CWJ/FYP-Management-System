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
import { getLectMeetings } from "../../../actions/Lecturer/LectMeetings";
import MEETING from "../../../constants/meetingStatus";
import ROLE from "../../../constants/userRole";

const MeetingsCompletedCard = () => {
    const dispatch = useDispatch();
    const studM = useSelector((state) => state.lectMeetings);
    const user = JSON.parse(localStorage.getItem("profile")); // get current user
    const [currentId, setCurrentId] = useState(0);

    useEffect(() => {
        // dispatch(getMeetings());
        dispatch(getLectMeetings());
    }, [currentId, dispatch]);
    var newArray = studM.filter(function (row) {
        return row?.studentID?._id === user?.result?.studentData?._id && row?.status === MEETING.COMPLETE;
    });

    return (
        <Paper align="center" style={{ margin: "16px 0px", padding: 8 }}>
            <Typography variant="h6">Meetings Completed</Typography>
            <Typography variant="h3">{newArray.length}</Typography>
        </Paper>
    );
};

export default MeetingsCompletedCard;
