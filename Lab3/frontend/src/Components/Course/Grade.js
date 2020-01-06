import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Header from '../Header/Header';
import Cookies from 'js-cookie';
import Menu from '../Menu/Menu';
import axios from 'axios';
import './Grade.css';

export class Grade extends Component {
  constructor(props) {
    super(props);
    if (!Cookies.get('id')) {
      alert("Please login first.");
      this.props.history.push("/");
    }
    this.state = {
      cid: this.props.match.params.id,
      grades:""
    }
  }

  componentDidMount(){
    axios.get(`http://localhost:3001/course/${this.state.cid}/grade`)
    .then((response)=>{
      // console.log(response.data.data)
      if(response.data.message==="error"){
        alert("Something went wrong.");
        this.props.history.push(`http://localhost:3001/course/${this.state.cid}/home`)
      }
      else if(response.data.message==="success"){
        this.setState({
          grades: response.data.data
        })
      }
    });
  }

  render() {
    let grades = [];
    Object.assign(grades, this.state.grades);
    const isStudent = Cookies.get("role")==="student";
    return (
      <div>
        <Navbar />
        <Header title={this.state.cid} />
        <div className="pageContent">
          <div className="row">
            <div className="col-3 menucolumn"><Menu cid={this.state.cid} /></div>
            <div className="col-9 coursecolumn">
              <h3>Grades</h3><br/>
              <h5>Quiz</h5>
              {grades.map((q, index)=>{
                return <table key={index} className="quizgradetable"><tbody>
                    {(q.typeof==="quiz")
                    ? <tr>
                      {(!isStudent) ? <td className="quizgradetable1">{q.sid}-{q.sname}</td> : null}
                      <td className="quizgradetable2">{q.typename}</td>
                      <td className="quizgradetable4">{q.grade}</td>
                    </tr>
                    :null}</tbody></table>
              })}<br/>
              <h5>Assignments</h5>
              {grades.map((q, index)=>{
                return <table key={index} className="quizgradetable"><tbody>
                    {(q.typeof==="ass")
                    ? <tr>
                      {(!isStudent) ? <td className="quizgradetable1">{q.sid} - {q.sname}</td> : null}
                      <td className="quizgradetable2">{q.typename}</td>
                      <td className="quizgradetable4">{q.grade}</td>
                    </tr>
                    :null}</tbody></table>
              })}<br/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Grade
