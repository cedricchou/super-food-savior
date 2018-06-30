import React, { Component } from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import axios from "axios";

export default class UserDonation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      donation: null
    };
  }

  async componentDidMount() {
    const res = await axios.get(`/users/${localStorage.session_id}/donations`);
    this.setState({
      donation: res.data.myDonations
    });
  }

  renderUserDonation(donation) {
    if (donation) {
      return donation.map((don, i) => (
        <div key={i} className="col-md-4 mb-4">
          <Card>
            <CardBody>
              <CardTitle>{don.title}</CardTitle>
              <CardText>{don.description}</CardText>
            </CardBody>
          </Card>
        </div>
      ));
    }
  }

  render() {
    return (
      <div className="UserDonation row">
        {this.renderUserDonation(this.state.donation)}
      </div>
    );
  }
}
