import React, { Component } from "react";
import axios from "axios";

export default class DonationIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      donations: []
    };
  }
  componentDidMount() {
    axios.get("/donations", function(req, res) {});
  }

  render() {
    return <div className="DonationIndex" />;
  }
}
