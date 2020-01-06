import React, { Component } from 'react'
import Header from '../Header/Header';
import axios from 'axios';
import { rooturl } from '../../config/settings';

export class Calculator extends Component {
  constructor(props){
      super(props);
      this.state = {
          op1 : "",
          op2 : "",
          operation:"",
          output: ""
      };
      this.op1ChangeHandler = this.op1ChangeHandler.bind(this);
      this.op2ChangeHandler = this.op2ChangeHandler.bind(this);
      this.addSubmitHandler = this.addSubmitHandler.bind(this);
      this.subSubmitHandler = this.subSubmitHandler.bind(this);
      this.mulSubmitHandler = this.mulSubmitHandler.bind(this);
      this.divSubmitHandler = this.divSubmitHandler.bind(this);
      this.submitHandler = this.submitHandler.bind(this);
  }

  op1ChangeHandler = (e) => {
      this.setState({
          op1 : e.target.value
      });
  }

  op2ChangeHandler = (e) => {
      this.setState({
          op2: e.target.value
      });
  }
  
  addSubmitHandler = (e) =>{
    this.setState({
      operation: "add"
    });
  }
  
  subSubmitHandler = (e) =>{
    this.setState({
      operation:"sub"
    });
  }
  
  mulSubmitHandler = (e) =>{
    this.setState({
      operation: "mul"
    });
  }
  
  divSubmitHandler = (e) =>{
    this.setState({
      operation: "div"
    });
  }

  submitHandler = (e) => {
    e.preventDefault();

    const data = {
      op1: this.state.op1,
      op2: this.state.op2,
      operation: this.state.operation
    }

    axios.post(rooturl ,data)
    .then(response =>{
      this.setState({
        output:response.data.output
      })
    });
  }

  render() {
    return (
      <div>
        <Header/>
        <form onSubmit={this.submitHandler}>
          <input type="text" placeholder="first operand" name="op1" onChange={this.op1ChangeHandler} pattern="-?\d*\.?\d+" title="Enter a valid number." required/><br/>
          <input type="text" placeholder="second operand" name="op2" onChange={this.op2ChangeHandler} pattern="-?\d*\.?\d+" title="Enter a valid number." required /><br/>
          <input type="submit" name="add" value="Add" className="btn btn-secondary" onClick={this.addSubmitHandler} /><br/>
          <input type="submit" name="sub" value="Subtract" className="btn btn-secondary" onClick={this.subSubmitHandler} /><br/>
          <input type="submit" name="mul" value="Multiply" className="btn btn-secondary" onClick={this.mulSubmitHandler} /><br/>
          <input type="submit" name="div" value="Divide" className="btn btn-secondary" onClick={this.divSubmitHandler} /><br/>
          <h4>Output : {this.state.output}</h4>
        </form>
      </div>
    )
  }
}

export default Calculator
