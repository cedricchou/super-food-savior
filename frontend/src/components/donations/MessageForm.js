import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Form, Input, Button } from "reactstrap";

export default class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      donation_id: null,
      user_id: null,
      messageSuccessRedirect: null
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
    const {content, donation_id, user_id} = this.state
    const toSend = {
      content,
      donation_id,
      user_id
    };
    const donationId = this.props.donation.id;

    axios
      .post(`/donations/${donationId}/messages`, toSend)
      .then(res => {
        if (res && res.data) {
          alert("message sent");
          this.setState({
            messageSuccessRedirect: '/donations'
          })
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    if(this.state.messageSuccessRedirect) {
      return <Redirect to={this.state.messageSuccessRedirect} />
    } else {
      return (
        <Form className="MessageForm" onSubmit={this.handleSubmit}>
          <Input
            type="textarea"
            name="content"
            value={this.state.content}
            onChange={this.handleChange}
          />
          <br />
          <Button type="submit">Send Message</Button>
        </Form>
      );
    }
    
  }
}
