import { Container, Grow, Grid, makeStyles, Typography, Paper } from "@material-ui/core";
import React from "react";
import AnnouncementCard from "./Cards/AnnouncementCard";
import ProjectDetailCard from "./Cards/ProjectDetailCard";
import UpcomingMeetingsCard from "./Cards/UpcomingMeetingsCard";
import UserDetailCard from "./Cards/UserDetailCard";

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
                    <UpcomingMeetingsCard />
                </Grid>
                <Grid item xs={12} md={6}>
                    <UserDetailCard />
                </Grid>
                <Grid item xs={12} md={6}>
                    <ProjectDetailCard />
                </Grid>
            </Grid>
        </Container>
        </Grow>
    );
};

export default LecturerHome;
