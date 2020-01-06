import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Header from '../Header/Header';
import Coursecard from '../Coursecard/Coursecard';
import axios from 'axios';
import Cookies from 'js-cookie';
import './Coursesearch.css';

export class Coursesearch extends Component {
    constructor(props){
        super(props);
        if (!Cookies.get('id')) {
          alert("Please login first.");
          this.props.history.push("/");
        }
        this.state = {
            searchterm: "",
            courses: {}
        }
        this.serachtermHandler = this.serachtermHandler.bind(this);
    }

    serachtermHandler = (e) => {
        this.setState({
            searchterm: e.target.value
        })
    }

    componentDidMount(){
        axios.get("http://localhost:3001/course/search")
        .then((response)=>{
            this.setState({
                courses: response.data.courses
            });
        });
    }

  render() {
    let courses = [];
    Object.assign(courses, this.state.courses);

    return (
      <div>
        <Navbar/>
        <Header title="Course Catalog" />
        <div className="pageContent">
          <div className="row coursesearch">
            <input type="text" name="searchterm" className="searchinput" placeholder="Search course by id,name or term" onChange={this.serachtermHandler}/>
            <br></br>
            {courses.map((course,index)=>{
                return (course.cname.toLowerCase().includes(this.state.searchterm.toLowerCase())) || (course.cid.toLowerCase().includes(this.state.searchterm.toLowerCase()) || (course.cterm.toLowerCase().includes(this.state.searchterm.toLowerCase())))
                ?<Coursecard key={index} num={index} id={course.cid} name={course.cname} term={course.cterm} />:<span key={index}/>
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default Coursesearch
