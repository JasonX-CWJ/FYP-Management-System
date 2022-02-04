import { makeStyles, Box, CardMedia, TableRow, Typography, TableCell, IconButton, Button, Collapse } from "@material-ui/core";
import React, { useState } from "react";
import { Delete as DeleteIcon, Edit as EditIcon, KeyboardArrowUp as KeyboardArrowUpIcon, KeyboardArrowDown as KeyboardArrowDownIcon, Check as CheckIcon, Check } from "@material-ui/icons";
import moment from "moment";
import Base64Downloader from "react-base64-downloader";

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

const LectProjectAppliedDets = ({ row, setConfirmDialog, openApprove }) => {
    const classes = useStyles();
    // had to directly parse the methods and rows from the main component method to save time refactoring. Works the same way.
    // Also the only way to make custom collapsible button work.
    const [openDetail, setOpenDetail] = useState(false);

    const user = JSON.parse(localStorage.getItem("profile")); // get current user

    return (
        <React.Fragment>
            {(user?.result?.googleId === row?.projectID?.creator || user?.result?._id === row?.projectID.creator) && (
                <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => {
                                setOpenDetail(!openDetail);
                            }}
                        >
                            {openDetail ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    {/* <TableCell className={classes.tableCell} component="th" scope="row">
                    {row.department}
                </TableCell> */}
                    <TableCell className={classes.tableCell} component="th" scope="row">
                        {row.projectID.semester}
                    </TableCell>
                    <TableCell className={classes.tableCell} component="th" scope="row">
                        {row.projectID.session}
                    </TableCell>
                    <TableCell className={classes.tableCell} component="th" scope="row">
                        {row.projectID.title}
                    </TableCell>
                    <TableCell className={classes.tableCell} component="th" scope="row">
                        {row.projectID.description}
                    </TableCell>
                    <TableCell className={classes.tableCell} component="th" scope="row">
                        {row.projectID.potStakeholder}
                    </TableCell>
                    <TableCell className={classes.tableCell} component="th" scope="row">
                        {row.projectID.tool}
                    </TableCell>
                    <TableCell className={classes.tableCell} component="th" scope="row">
                        {row.projectID.noOfStud}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                        <Button
                            size="small"
                            color="primary"
                            onClick={() =>
                                setConfirmDialog({
                                    isOpen: true,
                                    title: "Are you sure you want to approve this application?",
                                    subtitle: "",
                                    onConfirm: () => {
                                        openApprove(row);
                                    },
                                })
                            }
                        >
                            <CheckIcon color="success" fontSize="small" />
                        </Button>
                    </TableCell>
                </TableRow>
            )}
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={openDetail} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 12 }}>
                            <Typography variant="h6">Student Team:</Typography>
                            {row.studentID.map((row) => (
                                <Typography variant="body2">{row.name}</Typography>
                            ))}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
};

export default LectProjectAppliedDets;
