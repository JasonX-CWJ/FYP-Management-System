import React from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, makeStyles, IconButton } from "@material-ui/core";
import NotListedLocationIcon from "@material-ui/icons/NotListedLocation";

const useStyles = makeStyles((theme) => ({
    dialog: {
        padding: theme.spacing(2),
        position: "absolute",
        top: theme.spacing(5),
    },
    dialogTitle: {
        textAlign: "center",
    },
    dialogContent: {
        textAlign: "center",
    },
    dialogAction: {
        justifyContent: "center",
    },
}));

const ConfirmDialog = ({ confirmDialog, setConfirmDialog }) => {
    const classes = useStyles();

    return (
        <Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
            <DialogTitle className={classes.dialogTitle}></DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <Typography variant="h6">{confirmDialog.title}</Typography>
                <Typography variant="subtitle2">{confirmDialog.subTitle}</Typography>
            </DialogContent>
            <DialogActions className={classes.dialogAction}>
                <Button variant="contained" size="small" color="default" onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}>
                    No
                </Button>
                <Button variant="contained" size="small" color="secondary" onClick={confirmDialog.onConfirm}>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;
