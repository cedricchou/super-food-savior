import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardText, CardBody, CardTitle } from "reactstrap";
import axios from "axios";

export default class DonationIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      donations: null,
      filtered: null
    };
  }

  componentDidMount() {
    axios.get("/donations").then(res => {
      this.setState({ donations: res.data.donations });
    });
  }

  renderDonations(donations) {
    const imageDetail = {
      minHeight: "350px",
      maxHeight: "350px",
      minWidth: "100%"
    };

    if (donations) {
      return donations
        .slice(0)
        .reverse()
        .map((donation, index) => (
          <div key={index} className="col-md-4 mb-4">
            <Link to={`/donations/${donation.id}`}>
              <Card className="h-100">
                <img src={donation.pictureUrl} alt="" style={imageDetail} />
                <CardBody>
                  <CardTitle>{donation.title}</CardTitle>
                  <CardText>{donation.description}</CardText>
                </CardBody>
              </Card>
            </Link>
          </div>
        ));
    }
  }

  render() {
    if (this.state.filtered === null) {
      return (
        <div className="DonationIndex row">
          {this.renderDonations(this.state.donations)}
        </div>
      );
    }
  }
}
