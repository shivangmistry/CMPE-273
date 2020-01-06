import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Header from '../Header/Header';
import Cookies from 'js-cookie';
import Menu from '../Menu/Menu';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Quiz.css';

export class Quiz extends Component {
  constructor(props) {
    super(props);
    if (!Cookies.get('id')) {
      alert("Please login first.");
      this.props.history.push("/");
    }
    this.state = {
      cid: this.props.match.params.id,
      quizzes:""
    }
  }

  componentDidMount(){
    axios.get(`http://localhost:3001/course/${this.state.cid}/quiz`)
    .then((response)=>{
      // console.log(response.data)
      if(response.data.message==="error"){
        alert("Something went wrong.");
        this.props.history.push(`http://localhost:3001/course/${this.state.cid}`);
      }
      else if(response.data.message==="success"){
        this.setState({
          quizzes: response.data.data
        })
      }
    })
  }

  render() {
    let quizzes = [];
    Object.assign(quizzes, this.state.quizzes);
    return (
      <div>
        <Navbar />
        <Header title={this.state.cid} />
        <div className="pageContent">
          <div className="row">
            <div className="col-3 menucolumn"><Menu cid={this.state.cid} /></div>
            <div className="col-9 coursecolumn">
              <h3>Quiz</h3><br/>
              <div>
                {quizzes.map((quiz,index)=>{
                  return <div className="quiztab" key={index}><Link to={`/course/${this.state.cid}/quiz/${quiz.qname}`}>{quiz.qname}</Link>
                  <span className="anntime">{quiz.d1} - {quiz.d2}</span></div>
                })}
              </div>
              {(Cookies.get("role")==="faculty")
              ?<Link to={`/course/${this.state.cid}/quiz/new`}><button className="btn btn-primary">New Quiz</button></Link>
              :null}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Quiz
