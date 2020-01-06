import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import Login from './Login/Login';
import Signup from './Login/Signup';
import Profile from './Profile/Profile';
import Editprofile from './Profile/Editprofile';
import Course from './Course/Course';
import Coursecreate from './Course/Coursecreate';
import Coursesearch from './Course/Coursesearch';
import Courseinfo from './Course/Courseinfo';
import People from './Course/People';
import Grade from './Course/Grade';
import File from './Course/File';
import Quiz from './Course/Quiz';
import Quizinfo from './Course/Quizinfo';
import Quiznew from './Course/Quiznew';
import Assignment from './Course/Assignment';
import Announcement from './Course/Announcement';
import Newannouncement from './Course/Newannouncement';
import Anninfo from './Course/Anninfo';
import Assignmentnew from './Course/Assignmentnew';
import Submission from './Course/Submission';

export class Main extends Component {
  render() {
    return (
      <div>
        <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/course" component={Course} />
        <Route exact path="/course/new" component={Coursecreate} />
        <Route exact path="/course/search" component={Coursesearch} />
        <Route path="/course/:id/home" component={Courseinfo} />
        <Route path="/course/:id/people" component={People} />
        <Route path="/course/:id/grade" component={Grade} />
        <Route path="/course/:id/quiz/new" component={Quiznew} />
        <Route path="/course/:id/quiz/:qid" component={Quizinfo} />
        <Route path="/course/:id/quiz" component={Quiz} />
        <Route path="/course/:id/file" component={File} />
        <Route path="/course/:id/assignment/new" component={Assignmentnew} />
        <Route path="/course/:id/assignment/:asname" component={Submission} />
        <Route path="/course/:id/assignment" component={Assignment} />
        <Route path="/course/:id/announcement/new" component={Newannouncement} />
        <Route path="/course/:id/announcement/:aname" component={Anninfo} />
        <Route path="/course/:id/announcement" component={Announcement} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/profile/edit" component={Editprofile} />
        <Route component={Login} />
        </Switch>
      </div>
    )
  }
}

export default Main
