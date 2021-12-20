import React, { useState, useEffect } from "react";
import { AppBar, makeStyles, Button, Toolbar, Typography, Avatar, IconButton } from "@material-ui/core";
import { Link, useHistory, useLocation, Router } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Menu } from "@material-ui/icons";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
    },
    rightButtons: {
        display: "flex",
        alignItems: "center",
    },
    appbar: {
        width: `calc(100% - ${drawerWidth}px)`,
        [theme.breakpoints.down("md")]: {
            width: "100%",
        },
    },
    userName: {
        [theme.breakpoints.down("md")]: {
            display: "none",
        },
    },
    sideToggle: {
        display: "none",
        [theme.breakpoints.down("md")]: {
            display: "block",
        },
    },
    head: {
        marginRight: "10px",
    },
}));

const Navbar2 = ({ setSideState }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const classes = useStyles();

    const toggle = () => {
        setSideState((prevState) => !prevState);
    };

    return (
        <AppBar className={classes.appbar}>
            <Toolbar className={classes.toolbar}>
                <IconButton className={classes.sideToggle} size="medium" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={toggle}>
                    <Menu />
                </IconButton>
                <Typography variant="h6">FYP Management System</Typography>
                {user?.result ? (
                    <div className={classes.rightButtons}>
                        <Avatar className={classes.head} alt={user?.result.name} src={user?.result.imageUrl}>
                            {user?.result.name.charAt(0)}
                        </Avatar>
                        <Typography className={classes.userName} variant="h6">
                            {user?.result.name}
                        </Typography>
                        {/* <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>
                            Logout
                        </Button> */}
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">
                        Sign In
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar2;
