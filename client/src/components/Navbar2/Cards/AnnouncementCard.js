import React, { useEffect, useState } from "react";
import { makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

//import the actions for get and delete
import { getPosts } from "../../../actions/posts";

// import AnnouncementDetails from "./AnnouncementDetails";

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
}));

const headCells = [
    { id: "title", label: "Title", mobileHidden: false },
    { id: "name", label: "From", mobileHidden: false },
    { id: "createdAt", label: "Date", mobileHidden: false },
];

const AnnouncementCard = () => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const posts = useSelector((state) => state.posts); //selector to get all posts using the useEffect

    //Get all announcement posts
    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    return (
        <Paper>
            <Typography variant="h5" style={{ padding: "15px" }}>
                {" "}
                All Announcements
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {headCells.map((headCell) => (
                                <TableCell key={headCell.id} className={headCell.mobileHidden ? classes.tableCell : classes.tableCell}>
                                    {headCell.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {posts
                            .reverse()
                            .slice(0, 3)
                            .map((row) => (
                                <React.Fragment>
                                    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }} key={row._id}>
                                        <TableCell className={classes.tableCell} component="th" scope="row">
                                            {row.title}
                                        </TableCell>
                                        <TableCell className={classes.tableCell}>{row.name}</TableCell>
                                        <TableCell className={classes.tableCell}>{moment(row.createdAt).fromNow()}</TableCell>
                                    </TableRow>
                                </React.Fragment>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default AnnouncementCard;
