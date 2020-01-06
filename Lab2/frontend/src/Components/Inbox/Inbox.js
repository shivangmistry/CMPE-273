import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Header from '../Header/Header';
import Scroll from 'react-scroll';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import "./Inbox.css";
import { rooturl } from '../../config/settings';

var Element = Scroll.Element;

export class Inbox extends Component {

    constructor(props){
        super(props);
        if (!Cookies.get('id')) {
            alert("Please login first.");
            this.props.history.push("/");
        }
        this.state = {
            from: Cookies.get('id'),
            to: null,
            sub: null,
            msg: null,
            threads: null
        }
        this.toHandler = this.toHandler.bind(this)
        this.subjectHandler = this.subjectHandler.bind(this)
        this.messageHandler = this.messageHandler.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
    }

    toHandler = (e) => {
        this.setState({ to: e.target.value})
    }
    
    subjectHandler = (e) => {
        this.setState({ sub: e.target.value})
    }
    
    messageHandler = (e) => {
        this.setState({ msg: e.target.value})
    }

    submitHandler = (e) => {
        e.preventDefault();
        const d = new Date();
        const time = d.toDateString()+" "+d.toLocaleTimeString();
        let data = {
            from: this.state.from,
            to: this.state.to,
            sub: this.state.sub,
            msg: this.state.msg,
            time: time
        }
        axios.post(rooturl+"/conversations", data)
        .then((response) => {
            if(response.data.data.message==="error") alert("Something went wrong.")
            else if(response.data.data.message==="success"){
                alert("Message sent.")
                // this.props.history.push("/course");
                window.location.reload();
            }
        })
    }

    componentDidMount(){
        axios.get(rooturl+"/conversations")
        .then((response) => {
            console.log(response.data)
            if(response.data.data.message==="success") this.setState({ threads: response.data.data.data})
            else if(response.data.data.message==="error") alert("Something went wrong.")
        })
    }

  render() {
      let threads =[];
      Object.assign(threads, this.state.threads);
    return (
      <div>
            <Navbar />
            <Header title="Conversations" />
            <div className="pageContent">
                <div className="row">
                    <div className="col-3 threads">
                        <Element name="test7" className="element" id="containerElement" style={{
                            position: 'relative',
                            height: '500px',
                            overflow: 'scroll',
                        }}>
                        {(threads[0])
                            ? threads.map((t, index) => 
                                (t.id1===this.state.from)
                                ?<Link to={`/conversations/${t.id2}/${t.sub}`} key={index} ><div className="thread"><strong>{t.sub}</strong><br/>{t.id2name}</div></Link>
                                :<Link to={`/conversations/${t.id1}/${t.sub}`} key={index} ><div className="thread"><strong>{t.sub}</strong><br/>{t.id1name}</div></Link>
                            )
                            :"No new messages"}
                        </Element>
                    </div>
                    <div className="col-9">
                        <h5>Compose a message</h5><br/>
                        <form className="compose" onSubmit={this.submitHandler}>
                            <input type="text" placeholder="To: SJSU ID" onChange={this.toHandler} required /><br/>
                            <input type="text" placeholder="Subject" onChange={this.subjectHandler} required /><br/>
                            <textarea rows="5" cols="100" placeholder="Message" onChange={this.messageHandler} required /><br/>
                            <input type="submit" className="btn btn-primary" value="Send"></input>
                        </form>
                    </div>
                </div>
            </div>
      </div>
    )
  }
}

export default Inbox
