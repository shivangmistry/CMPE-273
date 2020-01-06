import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Cookies from 'js-cookie';

export class Navbar extends Component {
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout(){
        Cookies.remove('id');
        Cookies.remove('role');
    }

    render() {
        return (
            <div className="navbar ">
                <header id="navigation-bar">
                    <ul className="navul">
                        <div>
                        <img src="https://farm4.staticflickr.com/3894/14354234874_11c95cffeb_b.jpg" alt="logo" className="navbarlogo" />
                        </div><br />
                        <li><Link to="/profile"><i className="fa fa-user-circle-o fa-4x" /><br /><span className="navbartext">Profile</span></Link></li><br />
                        <li><Link to="/course"><i className="fa fa-book fa-4x" /><br /><span className="navbartext">Courses</span></Link></li><br />
                        <li><span className="logoutbutton"><Link to="/" onClick={this.logout} ><i className="fas fa-sign-out-alt fa-3x" /><br /><span className="navbartext">Log Out</span></Link></span></li>
                    </ul>
                </header>
            </div>
        )
    }
}

export default Navbar
