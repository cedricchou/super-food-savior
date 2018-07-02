import React, { Component } from "react";
import axios from "axios";
import { Form, Input, Label, Button } from "reactstrap";

export default class DonationForm extends Component {
  state = {
    title: "",
    description: "",
    donationPic: ""
  };

  handleChange = event => {
    const newData = {};
    newData[event.target.name] = event.target.value;
    this.setState(newData);
  };

  handleSubmit = event => {
    event.preventDefault();
    const toSend = this.state;
    console.log(toSend);
    axios
      .post("/donations", toSend)
      .then(function(res) {
        console.log(res);
        if (res && res.data && res.data.success) {
          alert("Thanks for posting your donation!");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  fileSelectedHandler = event => {
    this.setState({
      donationPic: event.target.files[0].name
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
          type="file"
          name="donationPic"
          value={this.state.fileSelectedHandler}
          onChange={this.fileSelectedHandler}
        />
        <br />
        <Button type="submit">Post Donation</Button>
      </Form>
    );
  }
}
