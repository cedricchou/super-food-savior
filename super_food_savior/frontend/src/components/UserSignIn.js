import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Form, Input, Label, Button } from "reactstrap";
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
        <Form className="UserSignIn" onSubmit={this.handleSubmit}>
          <div>
            <Label>Email</Label>
            <br />
            <Input
              type="email"
              id="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <Label>Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <br />
          <Button type="submit" className="btn btn-success">
            Login
          </Button>
        </Form>
      );
    }
  }
}
