import React, { Component } from "react";
import axios from "axios";

export default class DonationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      donation: null
    };
  }

  componentDidMount() {
    const donationId = this.props.match.params.id;
    axios.get(`/donations/${donationId}`).then(res => {
      this.setState({ donation: res.data.donationShow });
    });
  }

  renderDonation(donation) {
    if (donation) {
      return (
        <div>
          <ul>
            <li>{donation.title}</li>
            <li>{donation.description}</li>
          </ul>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="DonationPage">
        {this.renderDonation(this.state.donation)}
      </div>
    );
  }
}
