import { makeStyles, Box, CardMedia, TableRow, Typography, TableCell, IconButton, Button, Collapse } from "@material-ui/core";
import React, { useState } from "react";
import { Delete as DeleteIcon, Edit as EditIcon, KeyboardArrowUp as KeyboardArrowUpIcon, KeyboardArrowDown as KeyboardArrowDownIcon } from "@material-ui/icons";
import moment from "moment";
import ROLE from "../../../../constants/userRole";
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

const FileSubmissionDetails = ({ title, type, session, row, content, setConfirmDialog, confirmDelete, openForm, currentSubmission, setCurrentSubmission }) => {
    const classes = useStyles();

    // had to directly parse the methods and rows from the main component method to save time refactoring. Works the same way.

    // Also the only way to make custom collapsible button work.

    const [openDetail, setOpenDetail] = useState(false);

    const user = JSON.parse(localStorage.getItem("profile")); // get current user

    // const filename = "download." + row.filetype;
    return (
        <React.Fragment>
            <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell className={classes.tableCell} component="th" scope="row">
                    {title}
                </TableCell>
                {content != "" && (
                    <TableCell className={classes.tableCell}>
                        {type == "monitoring" || type == "viva" ? (
                            <a href={"https://" + content} target="_blank">
                                Open link
                            </a>
                        ) : (
                            <a href={content} download="">
                                Download
                            </a>
                        )}
                    </TableCell>
                )}
                {content === "" && <TableCell className={classes.tableCell}>None</TableCell>}

                {content != "" && (
                    <TableCell className={classes.tableCell}>
                        <Button
                            size="small"
                            color="primary"
                            onClick={() => {
                                setCurrentSubmission({ ...currentSubmission, type: type, session: session, content: content });
                                openForm(row);
                            }}
                        >
                            <EditIcon fontSize="small" /> Edit Submission
                        </Button>
                    </TableCell>
                )}

                {content === "" && (
                    <TableCell className={classes.tableCell}>
                        <Button
                            size="small"
                            color="primary"
                            onClick={() => {
                                setCurrentSubmission({ ...currentSubmission, type: type, session: session, content: "" });
                                openForm(row);
                            }}
                        >
                            Add File/Link
                        </Button>
                    </TableCell>
                )}
                {/* {user?.result != null && user?.result?.role === ROLE.ADMIN && ( */}

                {/* )} */}
            </TableRow>
        </React.Fragment>
    );
};

export default FileSubmissionDetails;
