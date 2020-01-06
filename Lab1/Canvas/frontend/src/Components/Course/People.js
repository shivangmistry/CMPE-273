import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Header from '../Header/Header';
import Menu from '../Menu/Menu';
import Cookies from 'js-cookie';
import axios from 'axios';
import Person from './Person';

export class People extends Component {
  constructor(props) {
    super(props);
    if (!Cookies.get('id')) {
      alert("Please login first.");
      this.props.history.push("/");
    }
    this.state = {
      cid: this.props.match.params.id,
      people:""
    }
  }

  componentDidMount(){
    axios.get(`http://localhost:3001/course/${this.state.cid}/people`)
    .then((result)=>{
      if(result.data.message==="error"){
        alert("Something went wrong.");
      }
      else if(result.data.message==="success"){
        this.setState({
          people: result.data.people
        })
      }
    });
  }

  render() {
    let people = [];
    Object.assign(people,this.state.people);
    return (
      <div>
        <Navbar/>
        <Header title={this.state.cid} />
        <div className="pageContent">
            <div className="row">
                <div className="col-3 menucolumn"><Menu cid={this.state.cid}/></div>
                <div className="col-9 coursecolumn">
                  <h3>People</h3><br/>
                  {
                    people.map((p,index)=>{
                      return <Person key={index} id={p.id} image={p.image} name={p.name} stat={p.stat} cid={this.state.cid}/>
                    })
                  }
                </div>
            </div>
        </div>
      </div>
    )
  }
}

export default People
