import React, { Component } from "react";
import axios from "axios";
import { Form, Input, Label, Button } from "reactstrap";

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
      <Form onSubmit={this.handleSubmit} className="DonationForm">
        <Label>Title:</Label>
        <Input
          type="text"
          name="title"
          value={this.state.title}
          onChange={this.handleChange}
        />
        <Label>Description:</Label>
        <Input
          type="text"
          name="description"
          value={this.state.description}
          onChange={this.handleChange}
        />
        <Label>Add a Picture:</Label>
        <Input
          type="text"
          name="pictureUrl"
          value={this.state.pictureUrl}
          onChange={this.handleChange}
        />
        <br />
        <Button type="submit">Post Donation</Button>
      </Form>
    );
  }
}
