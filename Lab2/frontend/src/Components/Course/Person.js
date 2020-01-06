import React, { Component } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Person.css';
import { rooturl } from '../../config/settings';

export class Person extends Component {
    constructor(props){
        super(props);
        this.state = {
            id:"",
            cid: "",
            action:""
        }
        this.removeClick = this.removeClick.bind(this);
        this.enrollClick = this.enrollClick.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    enrollClick = (e)=>{
        this.setState({
            id: this.props.id,
            cid: this.props.cid,
            action: "enroll"
        });
    }
    removeClick = (e)=>{
        this.setState({
            id: this.props.id,
            cid: this.props.cid,
            action: "remove"
        });
    }

    submitHandler = (e)=>{
        e.preventDefault();
        const data = {
            sid: this.state.id,
            cid: this.state.cid,
            action: this.state.action
        };
        axios.post(rooturl+`/course/${this.props.cid}/people`,data)
        .then((result)=>{
            console.log(result.data);
            if(result.data.data.message==="error"){
                alert("Something went wrong.")
            }
            else if(result.data.data.message==="success"){
                if(result.data.data.code){
                    alert("Permission Code: "+ result.data.data.code);
                }
                else{
                    alert("Action Performed.");
                }
                window.location.reload();
            }
        });
    }

  render() {
    return (
      <div className="persontab">
        <div className="row">
            <div className="col-2 imagecol">
                <Link to={`/profile/${this.props.id}`}>
                {(this.props.image===null || this.props.image === "")
                ?<img src="https://photos.gograph.com/thumbs/CSP/CSP992/male-profile-picture-vector-stock_k14386009.jpg" alt="profilepicture" className="personimage" />
                :<img src={this.props.image} alt="profilepicture" className="personimage"/>}</Link>
            </div>
            <div className="col-8 namecol">
                <Link to={`/profile/${this.props.id}`}>
                <h6>{this.props.name}</h6></Link>
            </div>
            <div className="col-2 statcol">
                {(Cookies.get('role')==="faculty")
                ?(this.props.stat==="enroll")
                    ?<form onSubmit={this.submitHandler}><button className="btn btn-danger" onClick={this.removeClick}>REMOVE</button></form>
                    :<form onSubmit={this.submitHandler}><button className="btn btn-primary" onClick={this.enrollClick}>ENROLL</button></form>
                :<span></span>
                }
            </div>
        </div>
      </div>
    )
  }
}

export default Person
