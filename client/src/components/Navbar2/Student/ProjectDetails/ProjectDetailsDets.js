import { makeStyles, Box, CardMedia, TableRow, Typography, TableCell, IconButton, Button, Collapse } from "@material-ui/core";
import React, { useState } from "react";
import { Delete as DeleteIcon, Edit as EditIcon, KeyboardArrowUp as KeyboardArrowUpIcon, KeyboardArrowDown as KeyboardArrowDownIcon, Check as CheckIcon } from "@material-ui/icons";
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

const ProjectDetailsDets = ({ filter, row, setConfirmDialog, confirmDelete, apply }) => {
    const classes = useStyles();
    // had to directly parse the methods and rows from the main component method to save time refactoring. Works the same way.
    // Also the only way to make custom collapsible button work.
    const [openDetail, setOpenDetail] = useState(false);

    // console.log(row);
    const user = JSON.parse(localStorage.getItem("profile")); // get current user

    return (
        <React.Fragment>
            {row.status === filter && (
                <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell>
                        <IconButton aria-label="expand row" size="small" onClick={() => setOpenDetail(!openDetail)}>
                            {openDetail ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    {/* <TableCell className={classes.tableCell} component="th" scope="row">
                    {row.department}
                </TableCell> */}
                    <TableCell className={classes.tableCell} component="th" scope="row">
                        {row.semester}
                    </TableCell>
                    <TableCell className={classes.tableCell} component="th" scope="row">
                        {row.session}
                    </TableCell>
                    <TableCell className={classes.tableCell} component="th" scope="row">
                        {row.title}
                    </TableCell>
                    <TableCell className={classes.tableCell} component="th" scope="row">
                        {row.description}
                    </TableCell>
                    <TableCell className={classes.tableCell} component="th" scope="row">
                        {row.potStakeholder}
                    </TableCell>
                    <TableCell className={classes.tableCell} component="th" scope="row">
                        {row.tool}
                    </TableCell>
                    {row.status === "accept" && (
                        <>
                            <TableCell className={classes.tableCell} component="th" scope="row">
                                {row.noOfStud}
                            </TableCell>
                            <TableCell>
                                <Button
                                    size="small"
                                    color="primary"
                                    onClick={() =>
                                        setConfirmDialog({
                                            isOpen: true,
                                            title: "Are you sure you want to apply for this project?",
                                            onConfirm: () => {
                                                apply(row);
                                            },
                                        })
                                    }
                                >
                                    <CheckIcon fontSize="small" />
                                </Button>
                            </TableCell>
                        </>
                    )}
                    {row.status === "accept" && (
                        <TableCell className={classes.tableCell} component="th" scope="row">
                            {row.studName}
                        </TableCell>
                    )}
                    {row.status === "pending" && (
                        <TableCell className={classes.tableCell}>
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
                                <DeleteIcon fontSize="small" />
                            </Button>
                            <Button size="small" color="primary" onClick={() => apply(row)}>
                                <EditIcon fontSize="small" />
                            </Button>
                        </TableCell>
                    )}
                </TableRow>
            )}
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={openDetail} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 12 }}>
                            <Typography variant="h6">{row.title}</Typography>
                            <Typography variant="body1">
                                {row.description.split("\n").map((item, idx) => {
                                    return (
                                        <React.Fragment key={idx}>
                                            {item}
                                            <br />
                                        </React.Fragment>
                                    );
                                })}
                            </Typography>
                            <Typography variant="body2">Potential Stakeholder: {row.potStakeholder}</Typography>
                            <Typography variant="body2">Tools: {row.tool}</Typography>
                            {row.status === "accept" && <Typography variant="body2">No. of Students: {row.noOfStud}</Typography>}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
};

export default ProjectDetailsDets;
