import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Header from '../Header/Header';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Profile.css';
import { connect } from 'react-redux';
import { update } from "../../actions/actions";
import { rooturl } from '../../config/settings';

export class Editprofile extends Component {
  constructor(props) {
    super(props);
    if (!Cookies.get('id')) {
      alert("Please login first.");
      this.props.history.push("/");
    }
    this.state = {
      image: "",
      cno: "",
      about: "",
      city: "",
      country: "",
      company: "",
      school: "",
      hometown: "",
      language: "",
      gender: ""
    }
    this.imageHandler = this.imageHandler.bind(this);
    this.cnoHandler = this.cnoHandler.bind(this);
    this.aboutHandler = this.aboutHandler.bind(this);
    this.cityHandler = this.cityHandler.bind(this);
    this.countryHandler = this.countryHandler.bind(this);
    this.companyHandler = this.companyHandler.bind(this);
    this.schoolHandler = this.schoolHandler.bind(this);
    this.hometownHandler = this.hometownHandler.bind(this);
    this.languageHandler = this.languageHandler.bind(this);
    this.genderHandler = this.genderHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  imageHandler = (e) => {
    this.setState({
      image : e.target.value
    });
  }
  cnoHandler = (e) => {
    this.setState({
      cno : e.target.value
    });
  }
  aboutHandler = (e) => {
    this.setState({
      about : e.target.value
    });
  }
  cityHandler = (e) => {
    this.setState({
      city : e.target.value
    });
  }
  countryHandler = (e) => {
    this.setState({
      country : e.target.value
    });
  }
  companyHandler = (e) => {
    this.setState({
      company : e.target.value
    });
  }
  schoolHandler = (e) => {
    this.setState({
      school : e.target.value
    });
  }
  hometownHandler = (e) => {
    this.setState({
      hometown : e.target.value
    });
  }
  languageHandler = (e) => {
    this.setState({
      language : e.target.value
    });
  }
  genderHandler = (e) => {
    this.setState({
      gender : e.target.value
    });
  }

  submitHandler = (e) => {
    e.preventDefault();
    const data = {
      image: this.state.image,
      cno: this.state.cno,
      about: this.state.about,
      city: this.state.city,
      country: this.state.country,
      company: this.state.company,
      school: this.state.school,
      hometown: this.state.hometown,
      language: this.state.language,
      gender: this.state.gender
    }
    axios.post(rooturl+"/profile/edit",data)
    .then((response) => {
      console.log(response.data);
      if(response.data.data.message==="success"){
        this.props.update(data)
        alert("Profile Updated");
        this.props.history.push(`/profile/${Cookies.get('id')}`);
      }
      else if(response.data.data.message==="error"){
        alert("Problem encountered while updating.");
        this.props.history.push("/profile");
      }
    });
  }

  componentDidMount() {
    // axios.get("http://localhost:3001/profile/")
    //   .then((response) => {
    //     this.setState({
    //       image: response.data.data.image,
    //       cno: response.data.data.cno,
    //       about: response.data.data.about,
    //       city: response.data.data.city,
    //       country: response.data.data.country,
    //       company: response.data.data.company,
    //       school: response.data.data.school,
    //       hometown: response.data.data.hometown,
    //       language: response.data.data.language,
    //       gender: response.data.data.gender
    //     });
    //   });
    this.setState({
      image: this.props.user.image,
      cno: this.props.user.cno,
      about: this.props.user.about,
      city: this.props.user.city,
      country: this.props.user.country,
      company: this.props.user.company,
      school: this.props.user.school,
      hometown: this.props.user.hometown,
      language: this.props.user.language,
      gender: this.props.user.gender
    })
  }

  render() {

    return (
      <div>
        <Navbar />
        <Header title="My Profile" />
        <div className="pageContent">
          <div className="row">
            <div className="col-3 profilecolumn">
            </div>
            <div className="col-6">
            <h4>Enter new information</h4><br/>
            <form onSubmit={this.submitHandler}>
            <table>
              <tbody>
                <tr>
                  <td>Profile Picture</td>
                  <td>: <input type="text" name="image" placeholder="image url" onChange={this.imageHandler} /></td>
                </tr>
                <tr>
                  <td>Contact Number</td>
                  <td>: <input type="text" name="cno"  placeholder="0123456789" pattern="\d{10}" title="Enter a valid contact number." onChange={this.cnoHandler} /></td>
                </tr>
                <tr>
                  <td>About Me</td>
                  <td>: <input type="text" name="about" placeholder={this.props.user.about} onChange={this.aboutHandler} /></td>
                </tr>
                <tr>
                  <td>City</td>
                  <td>: <input type="text" name="city" placeholder={this.props.user.city} onChange={this.cityHandler} /></td>
                </tr>
                <tr>
                  <td>Country</td>
                  <td>: <input type="text" name="country" placeholder={this.props.user.country} onChange={this.countryHandler} /></td>
                </tr>
                <tr>
                  <td>Company</td>
                  <td>: <input type="text" name="company" placeholder={this.props.user.company} onChange={this.companyHandler} /></td>
                </tr>
                <tr>
                  <td>School</td>
                  <td>: <input type="text" name="school" placeholder={this.props.user.school} onChange={this.schoolHandler} /></td>
                </tr>
                <tr>
                  <td>Hometown</td>
                  <td>: <input type="text" name="hometown" placeholder={this.props.user.hometown}  onChange={this.hometownHandler} /></td>
                </tr>
                <tr>
                  <td>Language</td>
                  <td>: <input type="text" name="language" placeholder={this.props.user.language} onChange={this.languageHandler} /></td>
                </tr>
                <tr>
                  <td>Gender</td>
                  <td>
                    <label>
                      <input type="radio" name="gender" value="Male" onChange={this.genderHandler} checked={this.state.gender === "Male"} />
                      Male&nbsp;</label>
                    <label>
                      <input type="radio" name="gender" value="Female" onChange={this.genderHandler} checked={this.state.gender === "Female"} />
                      Female&nbsp;</label>
                    <label>
                      <input type="radio" name="gender" value="Other" onChange={this.genderHandler} checked={this.state.gender === "Other"} />
                      Other&nbsp;</label>
                  </td>
                </tr>
                <tr><td><br/></td></tr>
                <tr>
                  <td></td>
                  <td><input type="submit" value="Update" className="btn btn-primary" />&nbsp;
                      <Link to={`/profile/${Cookies.get('id')}`}><button className="btn btn-primary">Cancel</button></Link>
                  </td>
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

function mapStateToProps(state) {
  return {
    user: state
  }
}

function mapDispatchToProps(dispatch){
  return {
    update: (data) => dispatch(update(data))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Editprofile);
