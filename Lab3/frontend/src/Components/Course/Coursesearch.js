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
            nav: "",
            courses: "",
            page: 0,
            limit: 4
        }
        this.serachtermHandler = this.serachtermHandler.bind(this);
        this.nxtHandler = this.nxtHandler.bind(this);
        this.prvHandler = this.prvHandler.bind(this);
    }

    serachtermHandler = (e) => {
        this.setState({
            searchterm: e.target.value
        })
    }

    nxtHandler = (e) => {
      this.paginate(1);
      let t = this.state.page + 1
      axios.get(`http://localhost:3001/course/search?page=${t}&limit=${this.state.limit}`)
        .then((response) => {
          if (response.data.message === "error") {
            alert("Something went wrong!")
            this.props.history.push("/course")
          }
          else if (response.data.message === "success") {
            if (!response.data.data[0]) {
              this.paginate(-1)
            }
            else {
              this.setState({ courses: response.data.data })
            }
          }
        })
    }
    
    prvHandler = (e) => {
      let t = this.state.page - 1
      if (t < 0 || this.state.page === 0) {
        t = 0;
      }
      else {
        this.paginate(-1);
      }
      axios.get(`http://localhost:3001/course/search?page=${t}&limit=${this.state.limit}`)
        .then((response) => {
          if (response.data.message === "error") {
            alert("Something went wrong!")
            this.props.history.push("/course")
          }
          else if (response.data.message === "success") {
            this.setState({ courses: response.data.data })
          }
        })
    }

    paginate(n){
        this.setState({ page: this.state.page + n})
    }

    componentDidMount(){
      axios.get(`http://localhost:3001/course/search?page=0&limit=${this.state.limit}`)
        .then((response)=>{
          // console.log(response.data.data);
            this.setState({
                courses: response.data.data
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
          <div className="coursesearch">
            <input type="text" name="searchterm" className="searchinput" placeholder="Search course by id,name or term" onChange={this.serachtermHandler}/>          </div><hr/>
          <div className="row coursesearch">
            {courses.map((course,index)=>{
                return (course.info.cname.toLowerCase().includes(this.state.searchterm.toLowerCase())) || (course.info._id.toLowerCase().includes(this.state.searchterm.toLowerCase()) || (course.info.cterm.toLowerCase().includes(this.state.searchterm.toLowerCase())))
                ?<Coursecard key={index} num={index} id={course.info._id} name={course.info.cname} term={course.info.cterm} />:<span key={index}/>
            })}
          </div>
          <hr/>
          <div className="navbuttons">
            <button className="btn btn-primary nxt" onClick={this.prvHandler}>&lt;</button>&nbsp;
            <button className="btn btn-primary prv" onClick={this.nxtHandler}>&gt;</button>&nbsp;&nbsp;&nbsp;
          </div>
        </div>
      </div>
    )
  }
}

export default Coursesearch
