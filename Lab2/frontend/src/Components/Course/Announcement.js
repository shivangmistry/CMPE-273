import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Header from '../Header/Header';
import Cookies from 'js-cookie';
import Menu from '../Menu/Menu';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Announcement.css';
import { rooturl } from '../../config/settings';

export class Announcement extends Component {
  constructor(props) {
    super(props);
    if (!Cookies.get('id')) {
      alert("Please login first.");
      this.props.history.push("/");
    }
    this.state = {
      cid: this.props.match.params.id,
      anns:""
    }
  }

  componentDidMount(){
    axios.get(rooturl+`/course/${this.state.cid}/announcement`)
    .then((response)=>{
      console.log(response.data);
      if(response.data.data.message==="success"){
        this.setState({
          anns: response.data.data.data
        })
      }
      else if(response.data.data.message==="error") alert("Something went wrong.")
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
              <h3>Announcements</h3><br />
              <div>
              {anns.map((ann,index)=>{
                return <div key={index} className="allanns">
                <Link to={`/course/${this.state.cid}/announcement/${ann.aname}`}><span className="anntitle">{ann.aname}</span></Link><span className="anntime">{ann.adate}</span><br/>
                {ann.adesc.substring(0,100)+"..."}
                </div>
              })}
              </div>
              {(Cookies.get('role')==="faculty")
              ?<Link to={`/course/${this.state.cid}/announcement/new`}><button className="btn btn-primary">New Announcement</button></Link>
              :null}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Announcement
