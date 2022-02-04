import { Container, Grow, Grid, makeStyles, Typography, Paper } from "@material-ui/core";
import React from "react";
import AnnouncementCard from "./Cards/AnnouncementCard";
import ProjectDetailCard from "./Cards/ProjectDetailCard";
import CoordinatorCard from "./Cards/CoordinatorCard";
import PanelCard from "./Cards/PanelCard";
import TotalSubmissionsCard from "./Cards/TotalSubmissionsCard";

const LecturerHome = () => {
    // const classes = useStyles();
    return (
        <Grow in>
        <Container maxWidth={false}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <AnnouncementCard />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TotalSubmissionsCard />
                </Grid>
                <Grid item xs={12} md={6}>
                    <CoordinatorCard />
                    {/* basically show the admins, note admins need to have department */}
                </Grid>
                <Grid item xs={12} md={6}>
                    <PanelCard />
                </Grid>
            </Grid>
        </Container>
        </Grow>
    );
};

export default LecturerHome;
