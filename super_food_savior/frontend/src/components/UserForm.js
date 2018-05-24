import React, { Component } from "react";
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
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="UserForm">
        <form onSubmit={this.handleSubmit}>
          <label>First Name</label>
          <input
            type="text"
            name="first_name"
            onChange={this.handleChange}
            value={this.state.first_name}
          />
          <label>Last Name</label>
          <input
            type="text"
            name="last_name"
            onChange={this.handleChange}
            value={this.state.last_name}
          />
          <label>Email</label>
          <input
            type="text"
            name="email"
            onChange={this.handleChange}
            value={this.state.email}
          />
          <label>Password</label>
          <input
            type="text"
            name="password"
            onChange={this.handleChange}
            value={this.state.password}
          />
          <label>Address</label>
          <input
            type="text"
            name="address"
            onChange={this.handleChange}
            value={this.state.address}
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}
