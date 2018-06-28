import React, { Component } from "react";
import axios from "axios";
import { Form, Button } from "reactstrap";

export default class DonationDelete extends Component {
  deleteDonation = event => {
    event.preventDefault();
    const donationId = this.props.donation.id;
    axios
      .post(`/donations/${donationId}`)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <Form onSubmit={this.deleteDonation}>
        <Button type="submit">Delete</Button>
      </Form>
    );
  }
}
