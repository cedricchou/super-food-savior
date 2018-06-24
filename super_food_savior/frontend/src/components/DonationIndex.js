import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Button
} from "reactstrap";
import axios from "axios";

export default class DonationIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      donations: null
    };
    axios.get("/donations").then(res => {
      this.setState({ donations: res.data.donations });
    });
  }

  renderDonations(donations) {
    if (donations) {
      return donations.map((donation, index) => (
        <div key={index} className="col-md-4 mb-4">
          <Card>
            <CardBody>
              <CardTitle>{donation.title}</CardTitle>
              <CardText>{donation.description}</CardText>
            </CardBody>
          </Card>
        </div>
      ));
    }
  }

  render() {
    return (
      <div className="DonationIndex row">
        {this.renderDonations(this.state.donations)}
      </div>
    );
  }
}
