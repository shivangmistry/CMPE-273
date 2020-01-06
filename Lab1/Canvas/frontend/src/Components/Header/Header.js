import React, { Component } from 'react';
import './Header.css';

export class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: ""
        }
    }
  render() {
    return (
      <div className="row container">
        <div className="col-12 pageheader">
            <h1 className="pagetitle" >{this.props.title}</h1>
        </div>
      </div>
    )
  }
}

export default Header
