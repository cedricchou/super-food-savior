import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Form, Input, Label, Button } from "reactstrap";

export default class DonationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      donationPic: "",
      donationPostSuccessRedirect: null
    };
  }

  handleChange = event => {
    const newData = {};
    newData[event.target.name] = event.target.value;
    this.setState(newData);
  };

  handleSubmit = event => {
    event.preventDefault();
    const toSend = {
      title: this.state.title,
      description: this.state.description,
      donationPic: this.state.donationPic
    }

    let formData = new FormData();
    formData.set('title', toSend.title);
    formData.set('description', toSend.description)
    formData.append('donationPic', toSend.donationPic)

    axios
      .post("/donations", formData)
      .then(res => {
        if (res.data.success) {
          console.log(res)
        alert("Thanks for posting a donation!")
          this.setState({
            donationPostSuccessRedirect: '/donations'
          })
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  // fileSelectedHandler = event => {
  //   this.setState({
  //     donationPic: event.target.files[0].name
  //   });
  // };

  fileSelectedHandler = event => {
    this.setState({
      donationPic: event.target.files[0]
    });
  };

  render() {
    if(!localStorage.session) {
      return <Redirect to="/login" />
    }
    if(this.state.donationPostSuccessRedirect) {
      return <Redirect to={this.state.donationPostSuccessRedirect} />
    } else {
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
            type="textarea"
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
          />
          <Label>Add a Picture:</Label>
          <Input
            type="file"
            name="donationPic"
            encType="multipart/form-data"
            // value={this.state.fileSelectedHandler}
            onChange={this.fileSelectedHandler}
          />
          <br />
          <Button type="submit">Post Donation</Button>
        </Form>
      );
    }
  }
}
