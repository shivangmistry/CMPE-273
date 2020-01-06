import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Header from '../Header/Header';
import Cookies from 'js-cookie';
import Menu from '../Menu/Menu';
import { Link } from 'react-router-dom';
import axios from 'axios';

export class Assignment extends Component {
  constructor(props) {
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

  componentDidMount() {
    axios.get(`http://localhost:3001/course/${this.state.cid}/assignment`)
      .then((response) => {
        // console.log(response.data);
        if(response.data.message==="error"){
          alert("Something went wrong.");
          this.props.history.push(`http://localhost:3001/course/${this.state.cid}/home`)
        }
        else if(response.data.message==="success"){
          this.setState({
            ass: response.data.data
          })
        }
      })
  }

  render() {
    let ass = [];
    Object.assign(ass,this.state.ass);
    const isStudent = Cookies.get("role") === "student";

    return (
      <div>
        <Navbar />
        <Header title={this.state.cid} />
        <div className="pageContent">
          <div className="row">
            <div className="col-3 menucolumn"><Menu cid={this.state.cid} /></div>
            <div className="col-9 coursecolumn">
              <h3>Assignment</h3><br />
              {ass.map((a,index)=>{
                return <div className="filelist" key={index} style={{padding:"10px"}}><a href={`http://localhost:3001/uploads/${a.aspath}`} download target="_blank" rel="noopener noreferrer" >{a.asname}</a>
                  {(isStudent)
                    ?<Link to={`/course/${this.state.cid}/assignment/${a.asname}`}><button className="btn btn-primary"  style={{float:"right"}}>Submit</button></Link>
                    :<Link to={`/course/${this.state.cid}/assignment/${a.asname}`}><button className="btn btn-primary" style={{float:"right"}} >Grade</button></Link>}
                </div>
              })}
              {(!isStudent)
                ? <Link to={`/course/${this.state.cid}/assignment/new`} ><button type='submit' className="btn btn-primary">Create Assignment</button></Link>
                : null}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Assignment
