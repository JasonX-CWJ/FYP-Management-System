import { makeStyles, Box, CardMedia, TableRow, Typography, TableCell, IconButton, Button, Collapse } from "@material-ui/core";
import React, { useState } from "react";
import { Delete as DeleteIcon, Edit as EditIcon, Check as CheckIcon, Close as CloseIcon, KeyboardArrowUp as KeyboardArrowUpIcon, KeyboardArrowDown as KeyboardArrowDownIcon } from "@material-ui/icons";
import MEETING from "../../../../constants/meetingStatus";

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

const LectMeetingsDetails = ({ filter, row, setConfirmDialog, confirmDelete, openForm, openApprove }) => {
    const classes = useStyles();
    // had to directly parse the methods and rows from the main component method to save time refactoring. Works the same way.
    // Also the only way to make custom collapsible button work.
    const [openDetail, setOpenDetail] = useState(false);

    const user = JSON.parse(localStorage.getItem("profile")); // get current user

    return (
        <React.Fragment>
            {user?.result?.lecturerData._id === row?.supervisorID?._id && row.status === filter && (
                <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell className={classes.tableCell} component="th" scope="row">
                        {row.title}
                    </TableCell>
                    <TableCell className={classes.tableCell} component="th" scope="row">
                        {row?.studentID?.projectActive?.title}
                    </TableCell>
                    <TableCell className={classes.tableCell} component="th" scope="row">
                        {row?.studentID?.name}
                    </TableCell>
                    {/* <TableCell className={classes.tableCell} component="th" scope="row">
                    {row.link}
                </TableCell> */}
                    <TableCell className={classes.tableCell} component="th" scope="row">
                        {row.date}
                    </TableCell>
                    <TableCell className={classes.tableCell} component="th" scope="row">
                        {row.time}
                    </TableCell>
                    {row.status === "pending" && (
                        <TableCell className={classes.tableCell}>
                            <Button
                                size="small"
                                color="primary"
                                onClick={() =>
                                    setConfirmDialog({
                                        isOpen: true,
                                        title: "Are you sure you want to approve this?",
                                        subtitle: "You cannot undo this operation!",
                                        onConfirm: () => {
                                            openApprove(row, MEETING.ACTIVE);
                                        },
                                    })
                                }
                            >
                                <CheckIcon fontSize="small" /> Accept
                            </Button>
                            <Button
                                size="small"
                                color="secondary"
                                onClick={() =>
                                    setConfirmDialog({
                                        isOpen: true,
                                        title: "Are you sure you want to reject this?",
                                        subtitle: "You cannot undo this operation!",
                                        onConfirm: () => {
                                            openApprove(row, MEETING.REJECT);
                                        },
                                    })
                                }
                            >
                                <CloseIcon fontSize="small" /> Reject
                            </Button>
                        </TableCell>
                    )}
                    {row.status === "active" && (
                        <TableCell className={classes.tableCell}>
                            <Button
                                size="small"
                                color="primary"
                                onClick={() =>
                                    setConfirmDialog({
                                        isOpen: true,
                                        title: "Are you sure you want to delete this?",
                                        subtitle: "You cannot undo this operation!",
                                        onConfirm: () => {
                                            confirmDelete(row._id);
                                        },
                                    })
                                }
                            >
                                <DeleteIcon fontSize="small" />
                            </Button>
                            <Button size="small" color="secondary" onClick={() => openForm(row)}>
                                <EditIcon fontSize="small" />
                            </Button>
                            <Button
                                size="small"
                                color="primary"
                                onClick={() =>
                                    setConfirmDialog({
                                        isOpen: true,
                                        title: "Are you sure you want to approve this?",
                                        subtitle: "You cannot undo this operation!",
                                        onConfirm: () => {
                                            openApprove(row, MEETING.COMPLETE);
                                        },
                                    })
                                }
                            >
                                <CheckIcon fontSize="small" /> Completed
                            </Button>
                        </TableCell>
                    )}
                </TableRow>
            )}
        </React.Fragment>
    );
};

export default LectMeetingsDetails;
