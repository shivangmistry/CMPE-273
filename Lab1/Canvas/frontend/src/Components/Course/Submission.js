import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Header from '../Header/Header';
import Cookies from 'js-cookie';
import Menu from '../Menu/Menu';
import axios from 'axios';
import './Submission.css';

export class Submission extends Component {
    constructor(props){
        super(props);
        if (!Cookies.get('id')) {
            alert("Please login first.");
            this.props.history.push("/");
        }
        this.state = {
            cid: this.props.match.params.id,
            asname: this.props.match.params.asname,
            file: null,
            subs:null,
            sid: null,
            grade: null
        }
        this.markHandler = this.markHandler.bind(this);
        this.gradeClick = this.gradeClick.bind(this);
        this.gradeHandler = this.gradeHandler.bind(this);
    }

    componentDidMount(){
      axios.get(`http://localhost:3001/course/${this.state.cid}/assignment/${this.state.asname}`)
      .then((result)=>{
        // console.log(result.data);
        this.setState({
          subs: result.data.data
        })
      });
    }

    fileHandler = (e) => {
        this.setState({
            file: e.target.files[0]
        })
    }

    submitHandler = (e) => {
        e.preventDefault();
        let data = new FormData();
        data.append('submission', this.state.file);
        // console.log(data);
        axios.post(`http://localhost:3001/course/${this.state.cid}/assignment/${this.state.asname}`, data)
            .then((response) => {
                // console.log(response);
                if (response.data === "success") {
                    alert("File Uploaded.")
                } else if (response.data === "error") {
                    alert("Something went wrong.")
                }
            });
    }

    markHandler = (e)=>{
      this.setState({
        grade: e.target.value
      })
    }

    gradeClick = (e)=>{
      this.setState({
        sid: e.target.value
      })
    }

    gradeHandler = (e)=>{
      e.preventDefault();
      const data = {
        sid: this.state.sid,
        grade: this.state.grade
      }
      axios.post(`http://localhost:3001/course/${this.state.cid}/assignment/${this.state.asname}`, data)
        .then((response) => {
          console.log(response.data);
          if(response.data.message==="success"){
            alert("Assignment graded.")
          }
        });
    }

  render() {
      let subs = [];
      Object.assign(subs,this.state.subs);
      const isStudent = Cookies.get("role") === "student";
    return (
      <div>
        <Navbar />
        <Header title={this.state.cid} />
        <div className="pageContent">
          <div className="row">
            <div className="col-3 menucolumn"><Menu cid={this.state.cid} /></div>
            <div className="col-9 coursecolumn">
              <h3>Submission</h3><br />
              {(isStudent)
              ?<form onSubmit={this.submitHandler}>
                <input type='file' onChange={this.fileHandler} required />
                <button type='submit' className="btn btn-primary">Submit</button>
              </form>
              :<div>
                {subs.map((sub,index)=>{
                  return <table key={index} className="subtable"><tbody>
                    <tr>
                      <td>{sub.sid}</td>
                      <td style={{width:"350px"}}><a href={`http://localhost:3001/uploads/${sub.subpath}`} download target="_blank" rel="noopener noreferrer">{sub.subname}</a></td>
                      <td><form onSubmit={this.gradeHandler}><input type="text" onChange={this.markHandler} placeholder="marks" pattern="\b[0-9]+\b" required />
                          <button className="btn btn-primary" value={sub.sid} onClick={this.gradeClick}>Grade</button>
                          </form></td>
                    </tr>
                  </tbody>
                  </table>
                })}
              </div>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Submission
