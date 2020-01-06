import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import Header from './Header';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import { login } from "../../actions/actions";

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            password: ""
        }
        this.idChangeHandler = this.idChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    idChangeHandler = (e) => {
        this.setState({
            id: e.target.value
        });
    }

    passwordChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    submitHandler = (e) => {
        e.preventDefault();
        const data = {
            id: this.state.id,
            password: this.state.password
        }
        axios.post("http://localhost:3001/login", data)
            .then(response => {
                // console.log(response.data)
                if(response.data.message==="success"){
                    Cookies.set('id',response.data.id);
                    Cookies.set('role',response.data.role);
                    this.props.login(response.data.data);
                    this.props.history.push("/course");
                }
                else if(response.data.message==="nouser"){
                    alert("No such user found.");
                    this.props.history.push("/");
                }
                else{
                    alert("Incorrect username or passowrd.");
                    this.props.history.push("/");
                }
            });
    }

    componentDidMount(){
        if(Cookies.get('id')){
            this.props.history.push("/course"); 
        }
    }

    render() {
        return (
            <div>
                <div><Header/></div>
            <div className="login">
                <div className="logodiv" ><img src="https://d92mrp7hetgfk.cloudfront.net/images/sites/misc/san_jose_state_u-1/standard.png?1548463655" alt="Logo" className="loginlogo" /></div>
                <div className="loginform"><form onSubmit={this.submitHandler}>
                    <input type="text" name="id" placeholder="SJSU ID" onChange={this.idChangeHandler} pattern="\d+" title="Enter a valid ID" required ></input><br />
                    <input type="password" name="password" placeholder="Password" onChange={this.passwordChangeHandler} required /><br />
                    <input type="submit" className="btn btn-primary" value="Sign In" /><br /><br />
                    Not a Member?  <Link to="/signup">Signup</Link>
                </form>
                </div>
            </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        login: (data) => dispatch(login(data))
    };
}

export default connect(null, mapDispatchToProps)(Login);
