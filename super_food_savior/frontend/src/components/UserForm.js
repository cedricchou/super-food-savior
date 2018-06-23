import React, { Component } from "react";
import { Form, Input, Label, Button } from "reactstrap";
import axios from "axios";

export default class UserForm extends Component {
  state = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    address: ""
  };

  handleChange = event => {
    const newUser = {};
    newUser[event.target.name] = event.target.value;
    this.setState(newUser);
  };

  handleSubmit = event => {
    event.preventDefault();
    axios
      .post("/users", this.state)
      .then(function(res) {
        console.log(res);
        if (!res.data.errmsg) {
          console.log("successful signup");
          this.setState({
            redirectTo: "/login"
          });
        } else {
          console.log("username already taken");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    return (
      <Form className="UserForm" onSubmit={this.handleSubmit}>
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
  }
}
