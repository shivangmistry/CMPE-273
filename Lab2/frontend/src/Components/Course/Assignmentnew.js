import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Header from '../Header/Header';
import Cookies from 'js-cookie';
import Menu from '../Menu/Menu';
import axios from 'axios';
import { rooturl } from '../../config/settings';

export class Assignmentnew extends Component {
    constructor(props){
        super(props);
        if (!Cookies.get('id')) {
            alert("Please login first.");
            this.props.history.push("/");
        }
        this.state = {
            cid: this.props.match.params.id,
            ass:null
        }
    }

    fileHandler = (e) => {
        this.setState({
            file: e.target.files[0]
        })
    }

    submitHandler = (e) => {
        e.preventDefault();
        let data = new FormData();
        data.append('assignment', this.state.file);
        axios.post(rooturl+`/course/${this.state.cid}/assignment/new`, data)
            .then((response) => {
                console.log(response.data);
                if (response.data.data.message === "success") {
                    alert("File Uploaded.")
                    this.props.history.push(`/course/${this.state.cid}/assignment`)
                } else if (response.data.data.message === "error") {
                    alert("Something went wrong.")
                }
            });
    }

  render() {
      const isStudent = Cookies.get("role") === "student";

    return (
      <div>
        <Navbar />
        <Header title={this.state.cid} />
        <div className="pageContent">
          <div className="row">
            <div className="col-3 menucolumn"><Menu cid={this.state.cid} /></div>
            <div className="col-9 coursecolumn">
              <h3>New Assignment</h3><br />
              {(!isStudent)
              ?<form onSubmit={this.submitHandler}>
                <input type='file' onChange={this.fileHandler} required />
                <button type='submit' className="btn btn-primary">Publish</button>
              </form>
              :null}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Assignmentnew
