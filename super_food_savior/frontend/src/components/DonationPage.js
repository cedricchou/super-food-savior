import React, { Component } from "react";
import GoogleMapComponent from "./googlemap/GoogleMapComponent";
import GoogleMapDirections from "./googlemap/GoogleMapDirections";
import MessageForm from "./MessageForm";
import DonationDelete from "./DonationDelete";
import axios from "axios";

export default class DonationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      GMAP_KEY: null,
      donation: null,
      current_user_data: null,
      user_data: null
    };
    const donationId = this.props.match.params.id;
    axios.get(`/donations/${donationId}`).then(res => {
      this.setState({
        GMAP_KEY: res.data.GMAP_KEY,
        donation: res.data.donationShow,
        current_user_data: res.data.current_user_data,
        user_data: res.data.user_data
      });
    });
    this.mapDisplay = this.mapDisplay.bind(this);
  }

  // componentDidMount() {
  //   const donationId = this.props.match.params.id;
  //   axios.get(`/donations/${donationId}`).then(res => {
  //     this.setState({
  //       GMAP_KEY: res.data.GMAP_KEY,
  //       donation: res.data.donationShow,
  //       current_user_data: res.data.current_user_data,
  //       user_data: res.data.user_data
  //     });
  //   });
  // }

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

  mapDisplay(userA, userB) {
    if (userA) {
      if (userA.id === userB.id) {
        return (
          <div>
            <DonationDelete donation={this.state.donation} />
            <GoogleMapComponent
              GMAP_KEY={this.state.GMAP_KEY}
              user_data={userB}
              current_user_data={userA}
            />
          </div>
        );
      } else {
        return (
          <div>
            <MessageForm
              donation={this.state.donation}
              current_user_data={userA}
            />
            <GoogleMapDirections
              GMAP_KEY={this.state.GMAP_KEY}
              user_data={userB}
              current_user_data={userA}
            />
          </div>
        );
      }
    }
  }

  render() {
    return (
      <div className="DonationPage">
        {this.renderDonation(this.state.donation)}
        {this.mapDisplay(this.state.current_user_data, this.state.user_data)}
      </div>
    );
  }
}
