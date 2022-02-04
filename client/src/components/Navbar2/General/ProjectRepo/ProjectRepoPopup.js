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

const ProjectRepoPopup = ({ openPopup, setOpenPopup, setCurrentId, children }) => {
    const classes = useStyles();
    return (
        <Dialog open={openPopup} maxWidth="md" classes={{ paper: classes.dialog }}>
            <DialogTitle>
                <div style={{ display: "flex" }}>
                    <Typography variant="h4" style={{ flexGrow: 1 }}>
                        Assign Panels
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            setOpenPopup(false);
                            setCurrentId(null);
                        }}
                    >
                        <CloseIcon />
                    </Button>
                </div>
            </DialogTitle>
            <DialogContent dividers= {true} >{children}</DialogContent>
        </Dialog>
    );
};

export default ProjectRepoPopup;