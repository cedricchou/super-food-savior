import React, { Component } from "react";
import axios from "axios";

export default class DonationForm extends Component {
  state = {
    title: "",
    description: "",
    pictureUrl: "",
    weight: ""
  };

  handleChange = event => {
    const newData = {};
    newData[event.target.name] = event.target.value;
    this.setState(newData);
  };

  handleSubmit = event => {
    event.preventDefault();
    const toSend = this.state;

    axios
      .post("/donations", toSend)
      .then(function(res) {
        console.log(res);
        if (res && res.data && res.data.success) {
          alert("nice work man");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="DonationForm">
        <form onSubmit={this.handleSubmit}>
          Title:
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <br />
          Description:
          <input
            type="text"
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
          />
          <br />
          Add a Picture:
          <input
            type="text"
            name="pictureUrl"
            value={this.state.pictureUrl}
            onChange={this.handleChange}
          />
          <br />
          Produce weight:
          <input
            type="text"
            name="weight"
            value={this.state.weight}
            onChange={this.handleChange}
          />
          <br />
          <input type="submit" />
        </form>
      </div>
    );
  }
}
