import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Header from '../Header/Header';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { rooturl } from '../../config/settings';

export class Coursecreate extends Component {
    constructor(props){
        super(props);
        if (!Cookies.get('id')) {
            alert("Please login first.");
            this.props.history.push("/");
        }
        this.state = {
            cid:"",
            cname:"",
            cdept:"",
            cdesc:"",
            croom:"",
            ccap:"",
            cwait:"",
            cterm:""
        }
        this.cidHandler = this.cidHandler.bind(this);
        this.cnameHandler = this.cnameHandler.bind(this);
        this.cdeptHandler = this.cdeptHandler.bind(this);
        this.cdescHandler = this.cdescHandler.bind(this);
        this.croomHandler = this.croomHandler.bind(this);
        this.ccapHandler = this.ccapHandler.bind(this);
        this.cwaitHandler = this.cwaitHandler.bind(this);
        this.ctermHandler = this.ctermHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    cidHandler = (e) =>{
        this.setState({
            cid:e.target.value
        });
    }
    cnameHandler = (e) =>{
        this.setState({
            cname:e.target.value
        });
    }
    cdeptHandler = (e) =>{
        this.setState({
            cdept:e.target.value
        });
    }
    cdescHandler = (e) =>{
        this.setState({
            cdesc:e.target.value
        });
    }
    croomHandler = (e) =>{
        this.setState({
            croom:e.target.value
        });
    }
    ccapHandler = (e) =>{
        this.setState({
            ccap:e.target.value
        });
    }
    cwaitHandler = (e) =>{
        this.setState({
            cwait:e.target.value
        });
    }
    ctermHandler = (e) =>{
        this.setState({
            cterm:e.target.value
        });
    }

    submitHandler = (e) => {
        e.preventDefault();
        const data = {
            cid: this.state.cid,
            cname: this.state.cname,
            cdept: this.state.cdept,
            cdesc: this.state.cdesc,
            croom: this.state.croom,
            ccap: this.state.ccap,
            cwait: this.state.cwait,
            cterm: this.state.cterm
        }   
        axios.post(rooturl+"/course/new",data)
        .then((response)=>{
            console.log(response.data);
            if(response.data.data.message==="success"){
                alert("Course successfully addedd.");
                this.props.history.push('/course');
            }
            else if(response.data.data.message==="error"){
                alert("Something went wrong!")
                this.props.history.push('/course');
            }
        });
    }
  render() {
    return (
      <div>
        <Navbar/>
        <Header title="My Courses" />
        <div className="pageContent">
          <div className="row">
          <div className="col-3 profilecolumn"></div>
            <div className="col-6 createcourse">
                <form onSubmit={this.submitHandler}>
                    <table className="coursetable">
                        <tbody>
                            <tr>
                                <td>Course ID</td>
                                <td>: <input type="text" name="cid" onChange={this.cidHandler} required /></td>
                            </tr>
                            <tr>
                                <td>Course Name</td>
                                <td>: <input type="text" name="cname" onChange={this.cnameHandler} required /></td>
                            </tr>
                            <tr>
                                <td>Course Department</td>
                                <td>: <input type="text" name="cdept" onChange={this.cdeptHandler} required /></td>
                            </tr>
                            <tr>
                                <td style={{verticalAlign:"top"}}>Course Description</td>
                                <td>&nbsp;&nbsp;<textarea rows="5" cols="30" name="cdesc" onChange={this.cdescHandler} required /></td>
                            </tr>
                            <tr>
                                <td>Course Room</td>
                                <td>: <input type="text" name="croom" onChange={this.croomHandler} required /></td>
                            </tr>
                            <tr>
                                <td>Course Capacity</td>
                                <td>: <input type="text" name="ccap" onChange={this.ccapHandler} pattern="\d+" title="Enter a valid number." required /></td>
                            </tr>
                            <tr>
                                <td>Waitlist Capacity</td>
                                <td>: <input type="text" name="cwait" onChange={this.cwaitHandler} pattern="\d+" title="Enter a valid number." required /></td>
                            </tr>
                            <tr>
                                <td>Course Term</td>
                                <td>: <input type="text" name="cterm" onChange={this.ctermHandler} required /></td>
                            </tr>
                            <tr><td><br/></td></tr>
                            <tr>
                                <td></td>
                                <td><input type="submit" className="btn btn-primary" value="Add Course" />
                                &nbsp;<Link to="/course"><button className="btn btn-primary">Cancel</button></Link></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Coursecreate
