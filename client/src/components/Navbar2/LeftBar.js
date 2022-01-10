import React, { useState, useEffect } from "react";
import { SubjectOutlined } from "@material-ui/icons";
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles, Typography } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import decode from "jwt-decode";
import { useDispatch } from "react-redux";

import * as actionType from "../../constants/actionTypes";

const useStyles = makeStyles((theme) => ({
    drawerDesktop: {
        width: 240,
        [theme.breakpoints.down("md")]: {
            display: "none",
        },
    },
    drawerMobile: {
        width: 240,
        display: "none",
        [theme.breakpoints.down("md")]: {
            display: "flex",
        },
    },
    paper: {
        background: "#333",
        width: 240,
    },
    divider: {
        background: "white",
    },
    active: {
        background: "#f4f4f4",
        color: "black",
    },
    title: {
        padding: theme.spacing(2),
        color: "#bfbfbf",
    },
    icon: {
        color: "#60626e",
    },
    iconFocused: {
        color: "black",
    },
    text: {
        color: "#bfbfbf",
    },
}));

const LeftBar = ({ sideState, setSideState }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const dispatch = useDispatch();

    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    const menuItemsGeneral = [
        {
            text: "Announcements",
            icon: <SubjectOutlined className={classes.icon} />,
            iconFocused: <SubjectOutlined className={classes.iconFocused} />,
            path: "/announcements",
        },
        {
            text: "Info and Guidelines",
            icon: <SubjectOutlined className={classes.icon} />,
            iconFocused: <SubjectOutlined className={classes.iconFocused} />,
            path: "/info-and-guidelines",
        },
        {
            text: "Project Repository",
            icon: <SubjectOutlined className={classes.icon} />,
            iconFocused: <SubjectOutlined className={classes.iconFocused} />,
            path: "/project-repository",
        },
    ];
    const menuItemsStudent = [
        {
            text: "Student Profile",
            icon: <SubjectOutlined className={classes.icon} />,
            iconFocused: <SubjectOutlined className={classes.iconFocused} />,
            path: "/profile",
        },
        {
            text: "Project Details",
            icon: <SubjectOutlined className={classes.icon} />,
            iconFocused: <SubjectOutlined className={classes.iconFocused} />,
            path: "/project-detail",
        },
        {
            text: "Meetings",
            icon: <SubjectOutlined className={classes.icon} />,
            iconFocused: <SubjectOutlined className={classes.iconFocused} />,
            path: "/meetings",
        },
        {
            text: "File Submission",
            icon: <SubjectOutlined className={classes.icon} />,
            iconFocused: <SubjectOutlined className={classes.iconFocused} />,
            path: "/file-submission",
        },
    ];

    const menuItemsLecturer = [
        {
            text: "Lecturer Profile",
            icon: <SubjectOutlined className={classes.icon} />,
            iconFocused: <SubjectOutlined className={classes.iconFocused} />,
            path: "/lectprofile",
        },
        {
            text: "Project Details",
            icon: <SubjectOutlined className={classes.icon} />,
            iconFocused: <SubjectOutlined className={classes.iconFocused} />,
            path: "/lectproject-detail",
        },
        {
            text: "Meetings",
            icon: <SubjectOutlined className={classes.icon} />,
            iconFocused: <SubjectOutlined className={classes.iconFocused} />,
            path: "/lectmeetings",
        },
        {
            text: "File Submitted",
            icon: <SubjectOutlined className={classes.icon} />,
            iconFocused: <SubjectOutlined className={classes.iconFocused} />,
            path: "/lectfile-submitted",
        },
        {
            text: "Assign Mark",
            icon: <SubjectOutlined className={classes.icon} />,
            iconFocused: <SubjectOutlined className={classes.iconFocused} />,
            path: "/lectassign-mark",
        },
    ];

    const menuItemsPanel = [
        {
            text: "Panel Assign Mark",
            icon: <SubjectOutlined className={classes.icon} />,
            iconFocused: <SubjectOutlined className={classes.iconFocused} />,
            path: "/panelassign-mark",
        },
    ];

    const menuItemsAdmin = [
        {
            text: "Lecturer Repository",
            icon: <SubjectOutlined className={classes.icon} />,
            iconFocused: <SubjectOutlined className={classes.iconFocused} />,
        },
        {
            text: "Student Repository",
            icon: <SubjectOutlined className={classes.icon} />,
            iconFocused: <SubjectOutlined className={classes.iconFocused} />,
        },
        {
            text: "Weightage and Rubric",
            icon: <SubjectOutlined className={classes.icon} />,
            iconFocused: <SubjectOutlined className={classes.iconFocused} />,
        },
        {
            text: "Guideline Update",
            icon: <SubjectOutlined className={classes.icon} />,
            iconFocused: <SubjectOutlined className={classes.iconFocused} />,
        },
        {
            text: "Reports",
            icon: <SubjectOutlined className={classes.icon} />,
            iconFocused: <SubjectOutlined className={classes.iconFocused} />,
        },
        {
            text: "Schedule Panel",
            icon: <SubjectOutlined className={classes.icon} />,
            iconFocused: <SubjectOutlined className={classes.iconFocused} />,
        },
    ];

    const logout = () => {
        dispatch({ type: actionType.LOGOUT });

        history.push("/");
        handleDrawerToggle();
        setUser(null);
        history.go(0);
    };
    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem("profile")));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    const handleDrawerToggle = () => {
        setSideState(false);
    };

    const drawer = (
        <div>
            <div>
                <Typography variant="h6" className={classes.title}>
                    FYP Management System
                </Typography>
            </div>

            <List>
                <ListItem
                    button
                    onClick={() => {
                        history.push("/");
                        handleDrawerToggle();
                    }}
                    className={location.pathname === "/" ? classes.active : null}
                >
                    <ListItemIcon>
                        <SubjectOutlined className={location.pathname === "/" ? classes.iconFocused : classes.icon} />
                    </ListItemIcon>
                    <ListItemText primary="Overview" className={location.pathname === "/" ? null : classes.text} />
                </ListItem>
                <ListItem
                    button
                    onClick={() => {
                        history.push("/lecturer");
                        handleDrawerToggle();
                    }}
                    className={location.pathname === "/lecturer" ? classes.active : null}
                >
                    <ListItemIcon>
                        <SubjectOutlined className={location.pathname === "/lecturer" ? classes.iconFocused : classes.icon} />
                    </ListItemIcon>
                    <ListItemText primary="Overview Lecturer" className={location.pathname === "/lecturer" ? null : classes.text} />
                </ListItem>
                <ListItem
                    button
                    onClick={() => {
                        history.push("/admin");
                        handleDrawerToggle();
                    }}
                    className={location.pathname === "/admin" ? classes.active : null}
                >
                    <ListItemIcon>
                        <SubjectOutlined className={location.pathname === "/admin" ? classes.iconFocused : classes.icon} />
                    </ListItemIcon>
                    <ListItemText primary="Overview Admin" className={location.pathname === "/admin" ? null : classes.text} />
                </ListItem>
                <Divider variant="fullWidth" className={classes.divider} />
                {menuItemsGeneral.map((item) => (
                    <ListItem
                        button
                        key={item.text}
                        onClick={() => {
                            history.push(item.path);
                            handleDrawerToggle();
                        }}
                        className={location.pathname === item.path ? classes.active : null}
                    >
                        <ListItemIcon>{location.pathname === item.path ? item.iconFocused : item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} className={location.pathname === item.path ? null : classes.text} />
                    </ListItem>
                ))}
                {user?.result && (
                    <>
                        <Divider variant="fullWidth" className={classes.divider} />
                        {menuItemsStudent.map((item) => (
                            <ListItem
                                button
                                key={item.text}
                                onClick={() => {
                                    history.push(item.path);
                                    handleDrawerToggle();
                                }}
                                className={location.pathname === item.path ? classes.active : null}
                            >
                                <ListItemIcon>{location.pathname === item.path ? item.iconFocused : item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} className={location.pathname === item.path ? null : classes.text} />
                            </ListItem>
                        ))}
                    </>
                )}
                {user?.result && (
                    <div>
                        <Divider variant="fullWidth" className={classes.divider} />
                        {menuItemsLecturer.map((item) => (
                            <ListItem
                                button
                                key={item.text}
                                onClick={() => {
                                    history.push(item.path);
                                    handleDrawerToggle();
                                }}
                                className={location.pathname === item.path ? classes.active : null}
                            >
                                {" "}
                                <ListItemIcon>{location.pathname === item.path ? item.iconFocused : item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} className={location.pathname === item.path ? null : classes.text} />
                            </ListItem>
                        ))}
                    </div>
                )}
                {user?.result && (
                    <div>
                        <Divider variant="fullWidth" className={classes.divider} />
                        {menuItemsPanel.map((item) => (
                            <ListItem
                                button
                                key={item.text}
                                onClick={() => {
                                    history.push(item.path);
                                    handleDrawerToggle();
                                }}
                                className={location.pathname === item.path ? classes.active : null}
                            >
                                {" "}
                                <ListItemIcon>{location.pathname === item.path ? item.iconFocused : item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} className={location.pathname === item.path ? null : classes.text} />
                            </ListItem>
                        ))}
                    </div>
                )}
                {user?.result && (
                    <div>
                        <Divider variant="fullWidth" className={classes.divider} />
                        {menuItemsAdmin.map((item) => (
                            <ListItem
                                button
                                key={item.text}
                                onClick={() => {
                                    history.push(item.path);
                                    handleDrawerToggle();
                                }}
                                className={location.pathname === item.path ? classes.active : null}
                            >
                                {" "}
                                <ListItemIcon>{location.pathname === item.path ? item.iconFocused : item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} className={location.pathname === item.path ? null : classes.text} />
                            </ListItem>
                        ))}
                    </div>
                )}
                {user?.result && (
                    <div>
                        <Divider variant="fullWidth" className={classes.divider} />
                        <ListItem button onClick={logout}>
                            <ListItemIcon>
                                <SubjectOutlined className={classes.icon} />
                            </ListItemIcon>
                            <ListItemText primary="Logout" className={classes.text} />
                        </ListItem>
                    </div>
                )}
            </List>
        </div>
    );

    return (
        <div>
            <Drawer
                className={classes.drawerMobile}
                variant="temporary"
                open={sideState}
                onClose={handleDrawerToggle}
                anchor="left"
                classes={{ paper: classes.paper }}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
            >
                {drawer}
            </Drawer>
            <Drawer className={classes.drawerDesktop} classes={{ paper: classes.paper }} variant="permanent" open>
                {drawer}
            </Drawer>
        </div>
    );
};

export default LeftBar;
