import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Header from '../Header/Header';
import Cookies from 'js-cookie';
import Menu from '../Menu/Menu';
import axios from 'axios';
import './Announcement.css'

export class Newannouncement extends Component {
    constructor(props) {
        super(props);
        if (!Cookies.get('id')) {
            alert("Please login first.");
            this.props.history.push("/");
        }
        this.state = {
            cid: this.props.match.params.id,
            aname:"",
            adesc:"",
            atime:""
        }
        this.anameHandler = this.anameHandler.bind(this)
        this.adescHandler = this.adescHandler.bind(this)
        this.setTime = this.setTime.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
    }

    anameHandler = (e)=>{
        this.setState({
            aname: e.target.value
        });
    }
    adescHandler = (e)=>{
        this.setState({
            adesc: e.target.value
        });
    }
    setTime = (e)=>{
        let date = new Date();
        this.setState({
            atime: date.toDateString()+" "+date.toLocaleTimeString()
        });
    }
    
    submitHandler = (e)=>{
        e.preventDefault();
        const data = {
            cid: this.state.cid,
            aname: this.state.aname,
            adesc: this.state.adesc,
            atime: this.state.atime
        }
        axios.post(`http://localhost:3001/course/${this.state.cid}/announcement/new`,data)
        .then((result)=>{
            // console.log(result.data);
            if(result.data.message==="error"){
                alert("Something went wrong!");
                this.props.history.push(`/course/${this.state.cid}/announcement`);
            }
            else if(result.data.message==="success"){
                alert("Announcement published.");
                this.props.history.push(`/course/${this.state.cid}/announcement`);
            }
        })
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
                            <h3>New Announcements</h3><br />
                            <form onSubmit={this.submitHandler}>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>Title</td>
                                            <td>&nbsp;&nbsp;<input type="text" name="aname" onChange={this.anameHandler} required /></td>
                                        </tr>
                                        <tr>
                                            <td className="annfield">Announcement</td>
                                            <td>&nbsp;&nbsp;<textarea name="adesc" rows="5" onChange={this.adescHandler} cols="50" required /></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>&nbsp;&nbsp;<button name="publish" value="Publish" className="btn btn-primary" onClick={this.setTime} >Publish</button></td>
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

export default Newannouncement
