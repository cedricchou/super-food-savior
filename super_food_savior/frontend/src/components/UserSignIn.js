import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

export default class UserSignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      redirectTo: null
    };
  }

  handleChange = event => {
    const loginUser = {};
    loginUser[event.target.name] = event.target.value;
    this.setState(loginUser);
  };

  handleSubmit = event => {
    event.preventDefault();
    axios
      .post("/login", this.state)
      .then(res => {
        if (res.status === 200) {
          this.props.updateUser({
            loggedIn: true,
            email: res.data.email
          });
          this.setState({
            redirectTo: "/donations"
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      return (
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Email</label>
            <br />
            <input
              type="email"
              id="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <label>Password</label>
            <input
              type="text"
              id="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <input type="submit" />
        </form>
      );
    }
  }
}
