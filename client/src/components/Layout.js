import React from "react";
import { makeStyles } from "@material-ui/core";
import { useState } from "react";
import LeftBar from "./Navbar2/LeftBar";
import Navbar2 from "./Navbar2/Navbar2";

const useStyles = makeStyles((theme) => ({
    page: {
        width: "100%",
    },
    root: {
        display: "flex",
    },
    toolbar: theme.mixins.toolbar,
}));
const Layout = ({ children }) => {
    const classes = useStyles();

    const [sideState, setSideState] = useState(false);

    return (
        <div className={classes.root}>
            <Navbar2 setSideState={setSideState} />
            <LeftBar sideState={sideState} setSideState={setSideState} />
            <div className={classes.page}>
                <div className={classes.toolbar}></div>
                {children}
            </div>
        </div>
    );
};

export default Layout;
