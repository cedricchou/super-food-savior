import React, { Component } from "react";
import axios from "axios";
import { Form, Input, Button } from "reactstrap";

export default class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      donation_id: null,
      user_id: null
    };
  }

  handleChange = event => {
    let inputValue = event.target.name;
    inputValue = event.target.value;
    this.setState({
      content: inputValue,
      donation_id: this.props.donation.id,
      user_id: this.props.current_user_data.id
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const toSend = this.state;
    const donationId = this.props.donation.id;

    axios
      .post(`/donations/${donationId}/messages`, toSend)
      .then(res => {
        if (res && res.data) {
          console.log(res);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <Form className="MessageForm" onSubmit={this.handleSubmit}>
        <Input
          type="text"
          name="content"
          value={this.state.content}
          onChange={this.handleChange}
        />
        <Button type="submit">Send Message</Button>
      </Form>
    );
  }
}
