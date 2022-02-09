import { makeStyles, TableRow, TableCell, Button } from "@material-ui/core";
import React from "react";
import { Delete as DeleteIcon, Edit as EditIcon } from "@material-ui/icons";

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

const RubricWeightDetails = ({ row, setConfirmDialog, confirmDelete, openForm , filter, filter2 }) => {
    const classes = useStyles();
    // had to directly parse the methods and rows from the main component method to save time refactoring. Works the same way.
    // Also the only way to make custom collapsible button work.
    
    const user = JSON.parse(localStorage.getItem("profile")); // get current user

    return (
        <React.Fragment>
            {( row.fypSess === filter && row.dimension === filter2) && (      
            <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell className={classes.tableCell} component="th" scope="row">
                    {row.rubric}
                </TableCell>
                <TableCell className={classes.tableCell} component="th" scope="row">
                    {row.weight}
                </TableCell>
                <TableCell className={classes.tableCell}>
                    {(user?.result?.googleId === row?.creator || user?.result?._id === row?.creator) &&(
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
                    )}
                    {(user?.result?.googleId === row?.creator || user?.result?._id === row?.creator) &&(
                        <Button size="small" color="primary" onClick={() => openForm(row)}>
                            <EditIcon fontSize="small" /> Edit
                        </Button>
                    )}
                </TableCell>
            </TableRow>
            )}  
        </React.Fragment>
    );
};

export default RubricWeightDetails;
