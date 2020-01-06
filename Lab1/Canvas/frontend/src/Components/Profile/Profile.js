import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Header from '../Header/Header';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
// import axios from 'axios';
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
      role: Cookies.get('role')
    }
  }

  componentDidMount() {
    // axios.get('http://localhost:3001/profile')
    //   .then((response) => {
    //     // console.log(response.data.data);
    //     this.setState({
    //       user: response.data.data
    //     });
    //   });
    // this.setState({
    //   user: this.props.user
    // })
  }

  render() {
    return (
      <div>
        <Navbar />
        <Header title="My Profile" />
        <div className="pageContent">
          <div className="row">
            <div className="col-3 profilecolumn">
              {(this.props.user.image === null || this.props.user.image === "")
                ? <img src="https://photos.gograph.com/thumbs/CSP/CSP992/male-profile-picture-vector-stock_k14386009.jpg" alt="profilepic1" className="profilepic" />
                : <img src={this.props.user.image} alt="profilepic2" className="profilepic" />}
            </div>
            <div className="col-6">
              <h4>Account Information</h4>
              <table>
                <tbody>
                  <tr>
                    <td>SJSU ID</td>
                    <td>: {this.props.user.id}</td>
                  </tr>
                  <tr>
                    <td>Name</td>
                    <td>: {this.props.user.name}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>: {this.props.user.email}</td>
                  </tr>
                </tbody>
              </table><br />
              <h4>Personal Information</h4>
              <table>
                <tbody>
                  <tr>
                    <td>Contact Number</td>
                    <td>: {this.props.user.cno}</td>
                  </tr>
                  <tr>
                    <td>About</td>
                    <td>: {this.props.user.about}</td>
                  </tr>
                  <tr>
                    <td>City</td>
                    <td>: {this.props.user.city}</td>
                  </tr>
                  <tr>
                    <td>Country</td>
                    <td>: {this.props.user.country}</td>
                  </tr>
                  <tr>
                    <td>Company</td>
                    <td>: {this.props.user.company}</td>
                  </tr>
                  <tr>
                    <td>School</td>
                    <td>: {this.props.user.school}</td>
                  </tr>
                  <tr>
                    <td>Hometown</td>
                    <td>: {this.props.user.hometown}</td>
                  </tr>
                  <tr>
                    <td>Language</td>
                    <td>: {this.props.user.language}</td>
                  </tr>
                  <tr>
                    <td>Gender</td>
                    <td>: {this.props.user.gender}</td>
                  </tr>

                </tbody>
              </table>
              <br />
              <Link to="/profile/edit" ><button className="btn btn-primary">Edit Profile</button></Link>
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
