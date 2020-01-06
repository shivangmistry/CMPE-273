import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Header from '../Header/Header';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';
import { connect } from 'react-redux';

export class Profile extends Component {
  constructor(props) {
    super(props);
    if (!Cookies.get('id')) {
      alert("Please login first.");
      this.props.history.push("/");
    }
    this.state = {
      id: Cookies.get('id'),
      role: Cookies.get('role'),
      user: ""
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/profile/${this.props.match.params.id}`)
      .then((response) => {
        // console.log(response.data.data);
        if(response.data.message==="error"){
          alert("Something went wrong.")
          this.props.history.push("/course")
        }
        else{
          if(Cookies.get('id')===this.props.match.params.id){
            this.setState({
              user: this.props.user
            })
          }
          else{
            this.setState({
              user: response.data.data
            });
          }
        }
      });
  }

  render() {
    return (
      <div>
        <Navbar />
        <Header title="My Profile" />
        <div className="pageContent">
          <div className="row">
            <div className="col-3 profilecolumn">
              <img src={this.state.user.image} alt="profilepic" className="profilepic" />
            </div>
            <div className="col-6">
              <h4>Account Information</h4>
              <table>
                <tbody>
                  <tr>
                    <td>SJSU ID</td>
                    <td>: {this.state.user._id}</td>
                  </tr>
                  <tr>
                    <td>Name</td>
                    <td>: {this.state.user.name}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>: {this.state.user.email}</td>
                  </tr>
                </tbody>
              </table><br />
              <h4>Personal Information</h4>
              <table>
                <tbody>
                  <tr>
                    <td>Contact Number</td>
                    <td>: {this.state.user.cno}</td>
                  </tr>
                  <tr>
                    <td>About</td>
                    <td>: {this.state.user.about}</td>
                  </tr>
                  <tr>
                    <td>City</td>
                    <td>: {this.state.user.city}</td>
                  </tr>
                  <tr>
                    <td>Country</td>
                    <td>: {this.state.user.country}</td>
                  </tr>
                  <tr>
                    <td>Company</td>
                    <td>: {this.state.user.company}</td>
                  </tr>
                  <tr>
                    <td>School</td>
                    <td>: {this.state.user.school}</td>
                  </tr>
                  <tr>
                    <td>Hometown</td>
                    <td>: {this.state.user.hometown}</td>
                  </tr>
                  <tr>
                    <td>Language</td>
                    <td>: {this.state.user.language}</td>
                  </tr>
                  <tr>
                    <td>Gender</td>
                    <td>: {this.state.user.gender}</td>
                  </tr>

                </tbody>
              </table>
              <br />
              {(this.props.match.params.id===Cookies.get('id'))
              ? <Link to="/profile/edit" ><button className="btn btn-primary">Edit Profile</button></Link>
              : null}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    user: state
  }
}

export default connect(mapStateToProps)(Profile);
