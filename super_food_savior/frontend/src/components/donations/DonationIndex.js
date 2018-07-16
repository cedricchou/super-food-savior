import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";
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

  // filteredDonations = event => {
  //   const items = ["apple, banana, carrots"];
  //
  //   let searchText = event.target.value;
  //   const filteredItems = items.filter(item => {
  //     console.log(searchText);
  //     return item.search(searchText) > -1;
  //   });
  //   this.setState({ filtered: filteredItems });
  // };

  renderDonations(donations) {
    const imageDetail = {
      minHeight: "400px",
      maxHeight: "400px",
      minWidth: "100%"
    };

    if (donations) {
      return donations
        .slice(0)
        .reverse()
        .map((donation, index) => (
          <div key={index} className="col-md-4 mb-4">
            <Card className="h-100">
              <img src={donation.pictureUrl} style={imageDetail} />
              <CardBody>
                <CardTitle>{donation.title}</CardTitle>
                <CardText>{donation.description}</CardText>
                <Link to={`/donations/${donation.id}`}>See Donation</Link>
              </CardBody>
            </Card>
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
