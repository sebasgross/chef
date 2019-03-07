import React, { Component } from "react";

import "./App.css";
import { NavLink } from "react-router-dom";
import "antd/dist/antd.css";
import Routes from "./Routes";
import axios from "axios";
import * as toastr from 'toastr';

class App extends Component {
  state = {
    isLogged: false,
    user: {}
  };

  checkLogged() {
  axios
  .get("http://localhost:3000/private", { withCredentials: true })
  .then(res => {
    this.setState({ isLogged: true , user : res.data.user});
    this.render();
  })
  .catch(e => {
    this.setState({ isLogged: false });
    this.render();
  });
};
  navDraw() {
    let { isLogged } = this.state;
    console.log(isLogged);
    if (!isLogged) {
      return (
        <div>
          <nav>
            <NavLink to="/login">Log in</NavLink>
            {"|"}
            <NavLink to="/signup">Sign up</NavLink>
          </nav>
       
        </div>
      );
    } else {
      return (
        <div>
          <nav>
            {"|"}
            <NavLink to="/home">Home</NavLink>
            {"|"}
            <NavLink to="/profile">Profile</NavLink>
            {"|"}
            <NavLink to={"/logout"}>logout</NavLink>

            
          </nav>
     
        </div>
      );
    }
  }
  componentDidMount = () => {
    this.checkLogged();
  };
  logIn = auth => {
    const urlLog = "http://localhost:3000/login"
    axios
      .post(urlLog, auth, { withCredentials: true })
      .then(res => {
        this.setState({ isLogged: true , user:res.data })
        // this.props.history.push('/profile')
      })
      .catch(e => {
        console.log(e)
        toastr.error('Email or Password fields incorrect')
      });
  };

  logOut(){
    const url = "http://localhost:3000/logout"
    axios.get(url, {withCredentials:true})
    .then((res)=>{
        this.setState({isLogged:false})
        this.props.history.push('/')
        console.log(res)
        // this.render()
    })
    .catch((e)=>console.log(e))
}

  render() {
    const { isLogged ,user } = this.state;

    return <div className="App">
    {this.navDraw()}
    <Routes isLogged={isLogged} logOut={this.logOut} logIn={this.logIn} user={user} />
    </div>;
  }
}

export default App;
