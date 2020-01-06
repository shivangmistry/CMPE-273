import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Header from '../Header/Header';
import Scroll from 'react-scroll';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./Inbox.css";
import { rooturl } from '../../config/settings';

var Element = Scroll.Element;

export class Thread extends Component {

    constructor(props) {
        super(props);
        if (!Cookies.get('id')) {
            alert("Please login first.");
            this.props.history.push("/");
        }
        this.state = {
            id1: Cookies.get('id'),
            id2: this.props.match.params.id,
            sub: this.props.match.params.sub,
            texts: null
        }
        this.messageHandler = this.messageHandler.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
    }

    messageHandler = (e) => {
        this.setState({ message: e.target.value})
    }

    submitHandler = (e) => {
        e.preventDefault();
        const d = new Date();
        const time = d.toDateString() + " " + d.toLocaleTimeString();
        const data = {
            from: Cookies.get('name'),
            text: this.state.message,
            time: time
        }
        axios.post(rooturl+`/conversations/${this.state.id2}/${this.state.sub}`, data)
        .then((response)=>{
            if(response.data.data.message==="error") alert("Something went wrong.")
            else if(response.data.data.message==="success"){
                alert("Message sent.")
                // this.props.history.push("/conversations");
                window.location.reload();
            }
        })
    }

    componentDidMount(){
        axios.get(rooturl+`/conversations/${this.state.id2}/${this.state.sub}`)
        .then((response) => {
            // console.log(response.data.data);
            if(response.data.data.message==="success") this.setState({ texts: response.data.data.data})
            else if(response.data.data.message==="error") alert("Something went wrong.")
        })
    }

  render() {
      let texts = [];
      Object.assign(texts, this.state.texts);
    return (
      <div>
            <Navbar />
            <Header title="Conversations" />
            <div className="pageContent">
                <div className="row">
                    <div className="col-12">
                        <Element name="test7" className="element" id="containerElement" style={{
                            position: 'relative',
                            height: '300px',
                            overflow: 'scroll',
                            width: "100%"
                        }}>
                        {texts.map((t, index) => {
                            return <div key={index} className="text">
                            <span className="textname">{t.from}</span><span className="texttime">{t.time}</span><br/>
                            {t.text}</div>
                        })}
                        </Element>
                        <form onSubmit={this.submitHandler} style={{padding: "10px 0"}}>
                            <textarea rows="5" placeholder="message" onChange={this.messageHandler} style={{width: "100%"}} required />
                            <Link to="/conversations"><button className="btn btn-primary">Back</button></Link>&nbsp;
                            <input type="submit" value="Reply" className="btn btn-primary" required />
                        </form>
                    </div>
                </div>
            </div>
      </div>
    )
  }
}

export default Thread
