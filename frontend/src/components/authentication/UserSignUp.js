import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Form, Input, Label, Button } from "reactstrap";
import axios from "axios";

export default class UserSignUp extends Component {
  state = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    address: "",
    signUpRedirect: null
  };

  handleChange = event => {
    const newUser = {};
    newUser[event.target.name] = event.target.value;
    this.setState(newUser);
  };

  handleSubmit = event => {
    event.preventDefault();
    const toSend = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
      address: this.state.address,
    }
    axios
      .post("/users", toSend)
      .then(res => {
        if (!res.data.errmsg) {
          alert("Thanks for signing up!!");         
            localStorage.setItem("session", this.state.first_name);
          this.setState({
            signUpRedirect: "/login"
          });
        } else {
          alert("email already used");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    if (this.state.signUpRedirect) {
      return <Redirect to={{ pathname: this.state.signUpRedirect }} />;
    } else {
    return (
      <Form className="UserSignUp" onSubmit={this.handleSubmit}>
        <Label>First Name</Label>
        <Input
          type="text"
          name="first_name"
          onChange={this.handleChange}
          value={this.state.first_name}
        />
        <Label>Last Name</Label>
        <Input
          type="text"
          name="last_name"
          onChange={this.handleChange}
          value={this.state.last_name}
        />
        <Label>Email</Label>
        <Input
          type="text"
          name="email"
          onChange={this.handleChange}
          value={this.state.email}
        />
        <Label>Password</Label>
        <Input
          type="password"
          name="password"
          onChange={this.handleChange}
          value={this.state.password}
        />
        <Label>Address</Label>
        <Input
          type="text"
          name="address"
          onChange={this.handleChange}
          value={this.state.address}
        />
        <br />
        <Button type="submit">Sign Up</Button>
      </Form>
    );
  }}
}
