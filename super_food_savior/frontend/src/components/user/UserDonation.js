import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText, CardImg } from "reactstrap";
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
      console.log(donation[0]);
      return donation
        .slice(0)
        .reverse()
        .map((don, i) => (
          <div key={i} className="col-md-4 mb-4">
            <Card>
              <CardImg src={don.pictureUrl} />
              <CardBody>
                <CardTitle>{don.title}</CardTitle>
                <CardText>{don.description}</CardText>
              </CardBody>
              <Link
                to={`/users/${localStorage.session_id}/donations/${don.id}`}
              >
                See Messages{" "}
              </Link>
            </Card>
          </div>
        ));
    }
  }

  render() {
    console.log(this.state);
    return (
      <div className="UserDonation row">
        {this.renderUserDonation(this.state.donation)}
      </div>
    );
  }
}
