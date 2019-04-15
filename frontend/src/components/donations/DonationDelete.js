import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Form, Button } from "reactstrap";

export default class DonationDelete extends Component {

  constructor(props) {
    super(props);
    this.state = {
      deleteError: false,
      deleteSuccessRedirect: null
    }
  }

  deleteDonation = event => {
    event.preventDefault();
    const donationId = this.props.donation.id;
    axios
      .post(`/donations/${donationId}`)
      .then(res => {
        this.setState({
          deleteSuccessRedirect: '/donations'
        })
      })
      .catch(err => {
        this.setState({
          deleteError: true
        })
      });
  };
  render() {
    if(this.state.deleteSuccessRedirect) {
      return <Redirect to={this.state.deleteSuccessRedirect} />
    }
    return (
      <Form onSubmit={this.deleteDonation}>
        <Button type="submit">Delete</Button>
        {this.state.deleteError ? <p>Failed at deleting</p> : null}
      </Form>
    );
  }
}
