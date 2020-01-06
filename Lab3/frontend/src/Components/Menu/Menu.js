import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./Menu.css";

export class Menu extends Component {
  render() {
    // console.log(this.props);
    return (
      <div className="menu">
        <ul className="menuul">
          <Link to={`/course/${this.props.cid}/home`} ><li><button type="button" className="btn btn-light">Home</button></li></Link>
          <Link to={`/course/${this.props.cid}/announcement`}><li><button type="button" className="btn btn-light">Announcements</button></li></Link>
          <Link to={`/course/${this.props.cid}/assignment`}><li><button type="button" className="btn btn-light">Assignments</button></li></Link>
          <Link to={`/course/${this.props.cid}/grade`}><li><button type="button" className="btn btn-light">Grades</button></li></Link>
          <Link to={`/course/${this.props.cid}/people`} ><li><button type="button" className="btn btn-light">People</button></li></Link>
          <Link to={`/course/${this.props.cid}/file`}><li><button type="button" className="btn btn-light">Files</button></li></Link>
          <Link to={`/course/${this.props.cid}/quiz`}><li><button type="button" className="btn btn-light">Quiz</button></li></Link>
        </ul>
      </div>
    )
  }
}

export default Menu
