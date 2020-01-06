import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import Coursecard from '../Coursecard/Coursecard';
import './Course.css';
import { rooturl } from '../../config/settings';

export class Course extends Component {
    constructor(props){
        super(props);
        if (!Cookies.get('id')) {
          alert("Please login first.");
          this.props.history.push("/");
        }
        this.state = {
            id: Cookies.get('id'),
            role: Cookies.get('role'),
            courses:""
        }
    }

    componentDidMount(){
      axios.get(rooturl+"/course")
      .then((response)=>{
        console.log(response.data)
        if(response.data.data.message==="success"){
          this.setState({
            courses: response.data.data.data
          })
        }
        else{
          // this.props.history.push("/");
          alert("Error occurred.")
        }
      });
    }

  render() {  
    let courses = [];
    Object.assign(courses, this.state.courses);
    const isStudent = Cookies.get("role")==="student";
    
    return (
      <div>
          <Navbar/>
          <Header title="My Courses" />
          <div className="pageContent">
          <div className="row mycourses"> 
            {courses.map((course, index) => {
              return <Coursecard key={index} num={index} id={course.info._id} name={course.info.cname} term={course.info.cterm} />
            })}
          </div>
          <hr/>
          {isStudent 
          ? <Link to="/course/search"><button className="btn btn-primary">Search Course</button> </Link>
          : <Link to="/course/new"><button className="btn btn-primary">Add Course</button></Link>}
          </div>
      </div>
    )
  }
}

export default Course
