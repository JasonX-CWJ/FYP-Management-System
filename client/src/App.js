import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// import Student from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import StudentHome from "./components/Navbar2/Home2";
import LecturerHome from "./components/Navbar2/LecturerHome";
import AdminHome from "./components/Navbar2/AdminHome";

import { Announcements, InfoGuideline, ProjectRepo } from "./components/Navbar2/General";
import { FileSubmission, Meetings, ProjectDetails } from "./components/Navbar2/Student";
import { LectProjectDetails, LectMeetings, LectFileSubmitted } from "./components/Navbar2/Lecturer";
import { PanelAssignMark, PanelVote } from "./components/Navbar2/LPanel";
import { SchedPanel, RubricWeight, LecturerRepo, StudentRepo } from "./components/Navbar2/Admin";
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
                    <Route path="/" exact component={StudentHome} />
                    <Route path="/lecturer" exact component={LecturerHome} />\
                    <Route path="/admin" exact component={AdminHome} />
                    <Route path="/auth" exact component={Auth} />

                    {/* General */}
                    <Route path="/announcements" exact component={Announcements} />
                    <Route path="/info-and-guidelines" exact component={InfoGuideline} />
                    <Route path="/project-repository" exact component={ProjectRepo} />

                    {/* Student Section */}
                    <Route path="/project-detail" exact component={ProjectDetails} />
                    <Route path="/meetings" exact component={Meetings} />
                    <Route path="/file-submission" exact component={FileSubmission} />

                    {/* Lecturer Section */} 
                    <Route path="/lectproject-detail" exact component={LectProjectDetails} />
                    <Route path="/lectmeetings" exact component={LectMeetings} />
                    <Route path="/lectfile-submitted" exact component={LectFileSubmitted} />

                    {/* Panel Section */} 
                    <Route path="/panelassign-mark" exact component={PanelAssignMark} />
                    <Route path="/panel-vote" exact component={PanelVote} />

                    {/* Admin Section */}
                    <Route path="/lecturer-repo" exact component={LecturerRepo} />
                    <Route path="/student-repo" exact component={StudentRepo} />
                    <Route path="/rubric" exact component={RubricWeight} />
                    {/* <Route path="/reports" exact component={Reports} /> */}
                    <Route path="/sched-panel" exact component={SchedPanel} />
                </Switch>
            </Layout>
            {/* </Container> */}
        </BrowserRouter>
    );
};

export default App;
