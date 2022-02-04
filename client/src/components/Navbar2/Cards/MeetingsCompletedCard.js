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

const MeetingsCompletedCard = () => {
    return (
        <Paper align="center" style={{ margin: "16px 0px", padding: 8, }}>
                <Typography variant="h6">Meetings Completed</Typography>
                <Typography variant="h3">5</Typography>
                change the 5 above into the number of meetings actually completed
        </Paper>
    );
};

export default MeetingsCompletedCard;
