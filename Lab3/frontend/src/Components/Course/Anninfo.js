import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Header from '../Header/Header';
import Cookies from 'js-cookie';
import Menu from '../Menu/Menu';
import axios from 'axios';
import './Announcement.css';

export class Anninfo extends Component {
  constructor(props) {
    super(props);
    if (!Cookies.get('id')) {
      alert("Please login first.");
      this.props.history.push("/");
    }
    this.state = {
      cid: this.props.match.params.id,
      aname: this.props.match.params.aname,
      adesc:"",
      atime:""
    }
  }

  componentDidMount(){
    axios.get(`http://localhost:3001/course/${this.state.cid}/announcement/${this.state.aname}`)
    .then((result)=>{
      // console.log(result.data);
      this.setState({
        adesc: result.data.data.adesc,
        atime: result.data.data.adate,
      })
    });
  }

  render() {
    let anns = [];
    Object.assign(anns,this.state.anns);
    return (
      <div>
        <Navbar />
        <Header title={this.state.cid} />
        <div className="pageContent">
          <div className="row">
            <div className="col-3 menucolumn"><Menu cid={this.state.cid} /></div>
            <div className="col-9 coursecolumn">
              <h3>{this.state.aname}</h3><br />
              <p>{this.state.atime}</p>
              <p>{this.state.adesc}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Anninfo
