import React, { Component } from "react";
import GoogleMapComponent from "./GoogleMapComponent";
import GoogleMapDirections from "./GoogleMapDirections";
import axios from "axios";

export default class DonationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      GMAP_KEY: null,
      donation: null
    };
  }

  componentDidMount() {
    const donationId = this.props.match.params.id;
    axios.get(`/donations/${donationId}`).then(res => {
      this.setState({
        GMAP_KEY: res.data.GMAP_KEY,
        donation: res.data.donationShow,
        current_user_data: res.data.current_user_data,
        user_data: res.data.user_data
      });
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
        <GoogleMapComponent
          GMAP_KEY={this.state.GMAP_KEY}
          user_data={this.state.user_data}
          current_user_data={this.state.current_user_data}
        />
        {/* <GoogleMapDirections
          GMAP_KEY={this.state.GMAP_KEY}
          user_data={this.state.user_data}
          current_user_data={this.state.current_user_data}
        />; */}
      </div>
    );
  }
}
