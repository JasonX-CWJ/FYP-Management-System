import { makeStyles, Paper, TableRow, Container, Typography, TableCell, IconButton, Button, Collapse } from "@material-ui/core";
import React, { useState } from "react";
import { Delete as DeleteIcon, Edit as EditIcon, KeyboardArrowUp as KeyboardArrowUpIcon, KeyboardArrowDown as KeyboardArrowDownIcon } from "@material-ui/icons";
import moment from "moment";

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

const AnnouncementDetails = ({ row, setConfirmDialog, confirmDelete, openForm }) => {
    const classes = useStyles();
    // had to directly parse the methods and rows from the main component method to save time refactoring. Works the same way.
    // Also the only way to make custom collapsible button work.
    const [openDetail, setOpenDetail] = useState(false);

    const user = JSON.parse(localStorage.getItem("profile")); // get current user

    return (
        <React.Fragment>
            <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell style={{ maxWidth: 10 }}>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpenDetail(!openDetail)}>
                        {openDetail ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell className={classes.tableCell} component="th" scope="row">
                    {row.title}
                </TableCell>
                <TableCell className={classes.tableCellMobile}>
                    {slicedMessage(row.message).map((item, idx) => {
                        return (
                            <React.Fragment key={idx}>
                                {item}
                                <br />
                            </React.Fragment>
                        );
                    })}
                </TableCell>
                <TableCell className={classes.tableCell}>{row.name}</TableCell>
                <TableCell className={classes.tableCellMobile}>{row.department}</TableCell>
                <TableCell className={classes.tableCellMobile}>{moment(row.createdAt).fromNow()}</TableCell>
                <TableCell className={classes.tableCellMobile}>
                    {user?.result?._id === row?.creator && (
                        <>
                            <Button
                                size="small"
                                color="secondary"
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
                                <DeleteIcon fontSize="small" /> Delete
                            </Button>
                            <Button size="small" color="primary" onClick={() => openForm(row)}>
                                <EditIcon fontSize="small" /> Edit
                            </Button>
                        </>
                    )}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={20}>
                    <Collapse in={openDetail} timeout="auto" unmountOnExit>
                        <Paper style={{ margin: "10px 0px" }}>
                            <Container style={{ padding: "10px 20px" }}>
                                {user?.result?._id === row?.creator && (
                                    <>
                                        <Button
                                            size="small"
                                            color="secondary"
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
                                            <DeleteIcon fontSize="small" /> Delete
                                        </Button>
                                        <Button size="small" color="primary" onClick={() => openForm(row)}>
                                            <EditIcon fontSize="small" /> Edit
                                        </Button>
                                    </>
                                )}
                                <Typography variant="h5">{row.title}</Typography>
                                <Typography variant="subtitle2">
                                    By {row.name}, {moment(row.createdAt).fromNow()}
                                </Typography>
                                <br></br>
                                <Typography variant="body2">
                                    {row.message.split("\n").map((item, idx) => {
                                        return (
                                            <React.Fragment key={idx}>
                                                {item}
                                                <br />
                                            </React.Fragment>
                                        );
                                    })}
                                </Typography>
                            </Container>
                        </Paper>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
};

function slicedMessage(message) {
    var slicedMessage = message.split("\n");
    if (slicedMessage.length > 3) {
        slicedMessage = slicedMessage.slice(0, 2);
        slicedMessage.push("...");
        return slicedMessage;
    } else {
        return slicedMessage.slice(0, 3);
    }
}

export default AnnouncementDetails;
