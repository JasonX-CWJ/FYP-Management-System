import { Button, Dialog, DialogContent, DialogTitle, makeStyles, Typography } from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles((theme) => ({
    dialog: {
        padding: theme.spacing(2),
        position: "absolute",
        top: theme.spacing(5),
    },
}));

const AddAnnouncementPopup = ({ openPopup, setOpenPopup, setCurrentId, children }) => {
    const classes = useStyles();
    return (
        <Dialog open={openPopup} maxWidth="md" classes={{ paper: classes.dialog }}>
            <DialogTitle>
                <div style={{ display: "flex" }}>
                    <Typography variant="h4" style={{ flexGrow: 1 }}>
                        New Announcement
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        style={{ height: "4vh", width: "4vw" }}
                        onClick={() => {
                            setOpenPopup(false);
                            setCurrentId(null);
                        }}
                    >
                        <CloseIcon />
                    </Button>
                </div>
            </DialogTitle>
            <DialogContent dividers>{children}</DialogContent>
        </Dialog>
    );
};

export default AddAnnouncementPopup;
