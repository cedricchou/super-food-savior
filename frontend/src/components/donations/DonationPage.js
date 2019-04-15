import React, { Component } from "react";
import GoogleMapComponent from "../googlemap/GoogleMapComponent";
import GoogleMapDirections from "../googlemap/GoogleMapDirections";
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

  renderDonation = donation => {
    const imageDetail = {
      maxHeight: "200px",
      maxWidth: "200px",
      margin: "auto",
      display: "flex"
    };
    if (donation) {
      return (
        <div className="row">
          <div className="col-md-6">
            <h3 id="show-title">{donation.title}</h3>
            <p>{donation.description}</p>
          </div>
          <div className="col-md-6">
            <img
              src={donation.pictureUrl}
              alt=""
              style={imageDetail}
              align="right"
            />
          </div>
        </div>
      );
    }
  }

  showFunction = (userA, userB) => {
    if (userA) {
      if (userA.id === userB.id) {
        return (
          <div>
            <DonationDelete donation={this.state.donation} />
          </div>
        );
      } else {
        return (
          <div>
            <MessageForm
              donation={this.state.donation}
              current_user_data={userA}
            />
          </div>
        );
      }
    }
  }

  mapDisplay = (userA, userB) => {
    if (userA) {
      if (userA.id === userB.id) {
        return (
          <div>
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
    const cardStyle = {
      background: "linear-gradient(to bottom, #3e236d 30%, #3f51b5 70%)",
      padding: "20px"
    };

    return (
      <div className="DonationPage row">
        <div className="col-md-6" style={cardStyle}>
          {this.renderDonation(this.state.donation)}
          {this.showFunction(
            this.state.current_user_data,
            this.state.user_data
          )}
        </div>
        <div className="col-md-6">
          {this.mapDisplay(this.state.current_user_data, this.state.user_data)}
        </div>
      </div>
    );
  }
}
