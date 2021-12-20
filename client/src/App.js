import React from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";

import Navbar2 from "./components/Navbar2/Navbar2";
import LeftBar from "./components/Navbar2/LeftBar";
import Home2 from "./components/Navbar2/Home2";
import { Announcement, InfoGuideline, ProjectRepo } from "./components/Navbar2/General";
import { FileSubmission, Meetings, ProjectDetails, StudentProfile } from "./components/Navbar2/Student";
import useStyles from "./styles";
import Layout from "./components/Layout";

const App = () => {
    const classes = useStyles();
    return (
        <BrowserRouter>
            {/* <Container maxWidth="lg"> */}
            {/* <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/auth" exact component={Auth} />
      </Switch> */}
            {/* <Navbar2 /> */}
            {/* <Navbar2 />
                <LeftBar /> */}
            <Layout>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/auth" exact component={Auth} />
                    <Route path="/announcements" exact component={Announcement} />
                    <Route path="/info-and-guidelines" exact component={InfoGuideline} />
                    <Route path="/project-repository" exact component={ProjectRepo} />
                    <Route path="/file-submission" exact component={FileSubmission} />
                    <Route path="/meetings" exact component={Meetings} />
                    <Route path="/project-detail" exact component={ProjectDetails} />
                    <Route path="/profile" exact component={StudentProfile} />
                </Switch>
            </Layout>
            {/* </Container> */}
        </BrowserRouter>
    );
};

export default App;
