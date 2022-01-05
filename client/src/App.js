import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

import { Announcements, InfoGuideline, ProjectRepo } from "./components/Navbar2/General";
import { FileSubmission, Meetings, ProjectDetails, StudentProfile } from "./components/Navbar2/Student";
import { LecturerProfile, LectProjectDetails, lectMeetings, lectFileSubmitted, lectAssignMark } from "./components/Navbar2/Lecturer";
import { panelAssignMark } from "./components/Navbar2/LPanel";
// import useStyles from "./styles";
import Layout from "./components/Layout";

const App = () => {
    // const classes = useStyles();
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
                    {/* General */}
                    <Route path="/announcements" exact component={Announcements} />
                    <Route path="/info-and-guidelines" exact component={InfoGuideline} />
                    <Route path="/project-repository" exact component={ProjectRepo} />
                    {/* Student Section */}
                    <Route path="/profile" exact component={StudentProfile} />
                    <Route path="/project-detail" exact component={ProjectDetails} />
                    <Route path="/meetings" exact component={Meetings} />
                    <Route path="/file-submission" exact component={FileSubmission} />
                    {/* Lecturer Section */} 
                    <Route path="/lectprofile" exact component={LecturerProfile} />
                    <Route path="/lectproject-detail" exact component={LectProjectDetails} />
                    <Route path="/lectmeetings" exact component={lectMeetings} />
                    <Route path="/lectfile-submitted" exact component={lectFileSubmitted} />
                    <Route path="/lectassign-mark" exact component={lectAssignMark} />
                    {/* Panel Section */} 
                    <Route path="/panelassign-mark" exact component={panelAssignMark} />
                    {/* Admin Section */} 
                </Switch>
            </Layout>
            {/* </Container> */}
        </BrowserRouter>
    );
};

export default App;
