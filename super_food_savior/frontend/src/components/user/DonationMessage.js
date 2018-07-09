import React, { Component } from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import axios from "axios";

export default class DonationMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allMessages: null,
      loading: true
    };
    const donationId = this.props.match.params.id;

    axios
      .get(`/users/${localStorage.session_id}/donations/${donationId}/`)
      .then(res => {
        if (res.status === 200)
          this.setState({
            allMessages: res.data.allMessages,
            loading: false
          });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    if (this.state.loading) {
      return (
        <div>
          <h4>Loading...</h4>
        </div>
      );
    } else {
      return (
        <main className="DonationMessage">
          {this.state.allMessages.map((oneMessage, i) => {
            return (
              <div key={i}>
                <Card className="h-100">
                  <CardBody>
                    <CardText>{oneMessage.content}</CardText>
                  </CardBody>
                </Card>
              </div>
            );
          })}
        </main>
      );
    }
  }
}
