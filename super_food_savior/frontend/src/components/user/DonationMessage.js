import React, { Component } from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import axios from "axios";

export default class DonationMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null
    };
  }

  async componentDidMount() {
    const donationId = this.props.match.params.id;
    console.log(donationId);
    const res = await axios.get(
      `/users/${localStorage.session_id}/donations/${donationId}/`
    );
    console.log(res);
    this.setState({
      message: res.data.allMessages
    });
    console.log(this.state);
  }

  render() {
    return <div>I am the donation message page </div>;
  }
}
