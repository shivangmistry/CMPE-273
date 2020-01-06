import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Header from '../Header/Header';
import Cookies from 'js-cookie';
import Menu from '../Menu/Menu';
import axios from 'axios';
import './File.css';

export class File extends Component {
  constructor(props) {
    super(props);
    if (!Cookies.get('id')) {
      alert("Please login first.");
      this.props.history.push("/");
    }
    this.state = {
      cid: this.props.match.params.id,
      file: null
    }
    this.fileHandler = this.fileHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  componentDidMount(){
    axios.get(`http://localhost:3001/course/${this.state.cid}/file`)
    .then((response)=>{
      // console.log(response.data);
      if(response.data.message==="error"){
        alert("Something went wrong.");
        this.props.history.push(`http://localhost:3001/course/${this.state.cid}/home`);
      }
      else if(response.data.message==="success"){
        this.setState({
          file: response.data.data
        })
      }
    });
  }

  fileHandler = (e) => {
    this.setState({
      file: e.target.files[0]
    })
  }

  submitHandler = (e) =>{
    e.preventDefault();
    let data = new FormData();
    data.append('lecturefile',this.state.file);
    axios.post(`http://localhost:3001/course/${this.state.cid}/file`,data)
    .then((response)=>{
      if(response.data.message==="success"){
        alert("File Uploaded.");
        window.location.reload();
      } else if(response.data.message==="error"){
        alert("Something went wrong.")
      }
    });
  }

  render() {
    let files = [];
    Object.assign(files,this.state.file);
    const isStudent = Cookies.get("role") === "student";

    return (
      <div>
        <Navbar />
        <Header title={this.state.cid} />
        <div className="pageContent">
          <div className="row">
            <div className="col-3 menucolumn"><Menu cid={this.state.cid}/></div>
            <div className="col-9 coursecolumn">
              <h3>Files</h3><br />
              {files.map((file,index)=>{
                return <div key={index} className="filelist" ><a href={`http://localhost:3001/uploads/${file.fpath}`} download target="_blank" rel="noopener noreferrer" >{file.fname}</a></div>
              })}
              {(!isStudent)
              ?<form onSubmit={this.submitHandler}>
                <input type='file' onChange={this.fileHandler} required/>
                <button type='submit' className="btn btn-primary" >Upload</button>
              </form>
              :null}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default File
