import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import "./People.css";

export class People extends Component {
    constructor(props) {
        super(props);
        if (!Cookies.get('id')) {
            alert("Please login first.");
            this.props.history.push("/");
        }
        this.state = {
            id: Cookies.get('id'),
            role: Cookies.get('role'),
            page: 0 ,
            limit: 4,
            people: ""
        }
        this.nxtHandler = this.nxtHandler.bind(this);
        this.prvHandler = this.prvHandler.bind(this);
    }

    nxtHandler = (e) => {
        this.paginate(1);
        let t = this.state.page+1
        axios.get(`http://localhost:3001/people?page=${t}&limit=${this.state.limit}`)
        .then((response) => {
            if(response.data.message==="error"){
                alert("Something went wrong!")
                this.props.history.push("/course")
            }
            else if(response.data.message==="success"){
                if (!response.data.data[0]){
                    this.paginate(-1)
                }
                else{
                    this.setState({ people: response.data.data})
                }
            }
        })
    }

    prvHandler = (e) => {
        let t = this.state.page-1
        if(t<0 || this.state.page===0){
            t = 0;
        }
        else{
            this.paginate(-1);
        }
        axios.get(`http://localhost:3001/people?page=${t}&limit=${this.state.limit}`)
        .then((response) => {
            if(response.data.message==="error"){
                alert("Something went wrong!")
                this.props.history.push("/course")
            }
            else if(response.data.message==="success"){
                this.setState({ people: response.data.data})
            }
        })
    }

    paginate(n){
        this.setState({ page: this.state.page + n})
    }

    componentDidMount() {
        axios.get(`http://localhost:3001/people?page=0&limit=${this.state.limit}`)
            .then((response) => {
                // console.log(response.data)
                if (response.data.message === "success") {
                    this.setState({
                        people: response.data.data
                    })
                }
                else {
                    alert("Error occurred.")
                }
            });
    }

    render() {
        let people = [];
        Object.assign(people, this.state.people)
        return (
            <div>
                <Navbar />
                <Header title="People" />
                <div className="pageContent">
                    <div className="row">
                        <div className="col-3"></div>
                        <div className="col-6">
                            <div className="peepscontainer">
                                {people.map((p, index) =>{
                                    return <Link to={`/profile/${p._id}`} key={index}><div  className="row peeps">
                                        <div className="col-3">
                                            <img src={p.image} style={{ width: "80px", height: "80px", borderRadius: "50%" }} alt="profilepic" />
                                        </div>
                                        <div className="col-1 peopleid">{p._id}</div>
                                        <div className="col-4 peoplenames">{p.name}</div>
                                        <div className="col-4 peoplenames">
                                        {(p.role==="faculty")?"Faculty":"Student"}
                                        </div>
                                    </div>
                                    </Link>
                            })}
                            </div>
                            <hr/>
                            <div className="navbuttons">
                                <button className="btn btn-primary nxt" onClick={this.prvHandler}>&lt;</button>&nbsp;
                                <button className="btn btn-primary prv" onClick={this.nxtHandler}>&gt;</button><br />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default People
