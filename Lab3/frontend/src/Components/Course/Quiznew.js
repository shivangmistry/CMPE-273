import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Header from '../Header/Header';
import Cookies from 'js-cookie';
import Menu from '../Menu/Menu';
import axios from 'axios';
import './Quiznew.css'

export class Quiznew extends Component {
  constructor(props) {
    super(props);
    if (!Cookies.get('id')) {
      alert("Please login first.");
      this.props.history.push("/");
    }
    this.state = {
      cid: this.props.match.params.id,
      qname:"",
      q1: "",
      op11: "",
      op12: "",
      op13: "",
      op14: "",
      cor1: "",
      q2: "",
      op21: "",
      op22: "",
      op23: "",
      op24: "",
      cor2: "",
      d1: "",
      d2: ""
    }
    this.qnameHandler = this.qnameHandler.bind(this);
    this.q1Handler = this.q1Handler.bind(this);
    this.op11Handler = this.op11Handler.bind(this);
    this.op12Handler = this.op12Handler.bind(this);
    this.op13Handler = this.op13Handler.bind(this);
    this.op14Handler = this.op14Handler.bind(this);
    this.cor1Handler = this.cor1Handler.bind(this);
    this.q2Handler = this.q2Handler.bind(this);
    this.op21Handler = this.op21Handler.bind(this);
    this.op22Handler = this.op22Handler.bind(this);
    this.op23Handler = this.op23Handler.bind(this);
    this.op24Handler = this.op24Handler.bind(this);
    this.cor2Handler = this.cor2Handler.bind(this);
    this.d1Handler = this.d1Handler.bind(this);
    this.d2Handler = this.d2Handler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  qnameHandler = (e)=>{
    this.setState({
        qname: e.target.value
    })
  }
  q1Handler = (e)=>{
      this.setState({
          q1: e.target.value
      })
  }
  op11Handler = (e)=>{
      this.setState({
          op11: e.target.value
      })
  }
  op12Handler = (e)=>{
      this.setState({
          op12: e.target.value
      })
  }
  op13Handler = (e)=>{
      this.setState({
          op13: e.target.value
      })
  }
  op14Handler = (e)=>{
      this.setState({
          op14: e.target.value
      })
  }
  cor1Handler = (e)=>{
      this.setState({
          cor1: e.target.value
      })
  }
  q2Handler = (e)=>{
      this.setState({
          q2: e.target.value
      })
  }
  op21Handler = (e)=>{
      this.setState({
          op21: e.target.value
      })
  }
  op22Handler = (e)=>{
      this.setState({
          op22: e.target.value
      })
  }
  op23Handler = (e)=>{
      this.setState({
          op23: e.target.value
      })
  }
  op24Handler = (e)=>{
      this.setState({
          op24: e.target.value
      })
  }
  cor2Handler = (e)=>{
      this.setState({
          cor2: e.target.value
      })
  }
  d1Handler = (e)=>{
      this.setState({
          d1: e.target.value
      })
  }
  d2Handler = (e)=>{
      this.setState({
          d2: e.target.value
      })
  }

  submitHandler = (e)=>{
      e.preventDefault();
      const data = {
          qname : this.state.qname,
          q1 : this.state.q1,
          op11 : this.state.op11,
          op12 : this.state.op12,
          op13 : this.state.op13,
          op14 : this.state.op14,
          cor1 : this.state.cor1,
          q2 : this.state.q2,
          op21 : this.state.op21,
          op22 : this.state.op22,
          op23 : this.state.op23,
          op24 : this.state.op24,
          cor2 : this.state.cor2,
          d1 : this.state.d1,
          d2 : this.state.d2,
      }
      axios.post(`http://localhost:3001/course/${this.state.cid}/quiz/new`,data)
      .then((response)=>{
          console.log(response.data);
          if(response.data.message==="error"){
              alert("Something went wrong.")
              this.props.history.push(`/course/${this.state.cid}/quiz`);
          }
          else if(response.data.message==="success"){
              alert("Quiz published.")
              this.props.history.push(`/course/${this.state.cid}/quiz`);
          }
      });
  }

  render() {
    return (
      <div>
        <Navbar />
        <Header title={this.state.cid} />
        <div className="pageContent">
          <div className="row">
            <div className="col-3 menucolumn"><Menu cid={this.state.cid} /></div>
            <div className="col-9 coursecolumn">
              <h3>Create Quiz</h3><br />
              <p>Enter details and choose correct option for each question.</p>
              <div>
                  <form onSubmit={this.submitHandler}>
                    <table>
                        <tbody>
                            <tr>
                                <td>Quiz Name</td>
                                <td>: <input type="text" name="qname" onChange={this.qnameHandler} required/></td>
                            </tr><tr><td><br/></td></tr>
                            <tr>
                                <td>Question 1</td>
                                <td>: <input type="text" name="q1" className="quizquestion" onChange={this.q1Handler} required /></td>
                            </tr>
                            <tr>
                                <td><label>Option A&nbsp;<input type="radio" name="ans1" value="a" onChange={this.cor1Handler} checked={this.state.cor1==="a"} required /></label></td>
                                <td>: <input type="text" name="op11" onChange={this.op11Handler} required /></td>
                                <td><label>Option B&nbsp;<input type="radio" name="ans1" value="b" onChange={this.cor1Handler} checked={this.state.cor1==="b"} /></label></td>
                                <td>: <input type="text" name="op12" onChange={this.op12Handler} required /></td>
                            </tr>
                            <tr>
                                <td><label>Option C&nbsp;<input type="radio" name="ans1" value="c" onChange={this.cor1Handler} checked={this.state.cor1==="c"} /></label></td>
                                <td>: <input type="text" name="op13" onChange={this.op13Handler} required /></td>
                                <td><label>Option D&nbsp;<input type="radio" name="ans1" value="d" onChange={this.cor1Handler} checked={this.state.cor1==="d"} /></label></td>
                                <td>: <input type="text" name="op14" onChange={this.op14Handler} required /></td>
                            </tr>
                            <tr>
                                <td>Question 2</td>
                                <td>: <input type="text" name="q2" className="quizquestion" onChange={this.q2Handler} required /></td>
                            </tr>
                            <tr>
                                <td><label>Option A&nbsp;<input type="radio" name="ans2" value="a" onChange={this.cor2Handler} checked={this.state.cor2==="a"} required /></label></td>
                                <td>: <input type="text" name="op21" onChange={this.op21Handler} required /></td>
                                <td><label>Option B&nbsp;<input type="radio" name="ans2" value="b" onChange={this.cor2Handler} checked={this.state.cor2==="b"} /></label></td>
                                <td>: <input type="text" name="op22" onChange={this.op22Handler} required /></td>
                            </tr>
                            <tr>
                                <td><label>Option C&nbsp;<input type="radio" name="ans2" value="c" onChange={this.cor2Handler} checked={this.state.cor2==="c"} /></label></td>
                                <td>: <input type="text" name="op23" onChange={this.op23Handler} required /></td>
                                <td><label>Option D&nbsp;<input type="radio" name="ans2" value="d" onChange={this.cor2Handler} checked={this.state.cor2==="d"} /></label></td>
                                <td>: <input type="text" name="op24" onChange={this.op24Handler} required /></td>
                            </tr><tr><td><br/></td></tr>
                            <tr>
                                <td>Available from</td>
                                <td>: <input type="date" name="d1" onChange={this.d1Handler} required /></td>
                                <td>Available till</td>
                                <td>: <input type="date" name="d2" onChange={this.d2Handler} required /></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>&nbsp;&nbsp;<button type="submit" name="publish" className="btn btn-primary" >Publish</button></td>
                            </tr>
                        </tbody>
                    </table>
                  </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Quiznew
