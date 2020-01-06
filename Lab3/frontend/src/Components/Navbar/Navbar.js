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
        // const page = 0, limit= 4;
        return (
            <div className="navbar ">
                <header id="navigation-bar">
                    <ul className="navul">
                        <div>
                        <img src="https://28dvez1wnqjyd37ed3lq71f6-wpengine.netdna-ssl.com/wp-content/uploads/2018/02/SJSU-University-monogram_Web_Gold.png" alt="logo" className="navbarlogo" />
                        </div><br />
                        <li><Link to={`/profile/${Cookies.get('id')}`}><i className="fa fa-user-circle-o fa-3x" /><br /><span className="navbartext">Profile</span></Link></li><br />
                        <li><Link to="/course"><i className="fa fa-book fa-3x" /><br /><span className="navbartext">Courses</span></Link></li><br />
                        <li><Link to="/people"><i className="fa fa-users fa-3x" /><br /><span className="navbartext">People</span></Link></li><br />
                        <li><Link to="/conversations"><i className="fa fa-inbox fa-3x" /><br /><span className="navbartext">Inbox</span></Link></li><br />
                        <li><span className="logoutbutton"><Link to="/" onClick={this.logout} ><i className="fas fa-sign-out-alt fa-3x" /><br /><span className="navbartext">Log Out</span></Link></span></li>
                    </ul>
                </header>
            </div>
        )
    }
}

export default Navbar
