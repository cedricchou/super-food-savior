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
        console.log(res);
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

  // async componentDidMount() {
  //   const donationId = this.props.match.params.id;
  //   console.log(donationId);
  //   const res = await axios.get(
  //     `/users/${localStorage.session_id}/donations/${donationId}/`
  //   );
  //   console.log(res);
  //   this.setMessageState({
  //     allMessages: res.data.allMessages,
  //     loading: false
  //   });
  // }

  // renderDonationMessage(message) {
  //   if (message) {
  //     return message.map((mes, i) => {
  //       <div key={i} className="col-md-4 mb-4">
  //         <Card>
  //           <CardBody>
  //             <CardText>test</CardText>
  //           </CardBody>
  //         </Card>
  //       </div>;
  //     });
  //   }
  // }

  render() {
    if (this.state.loading) {
      return (
        <div>
          <h4>Loading...</h4>
        </div>
      );
    } else {
      console.log(this.state.allMessages);
      return (
        <div className="DonationMessage">
          <ul>
            {this.state.allMessages.map((oneMessage, i) => {
              <li key={i}>
                <h1>{oneMessage.content}</h1>
              </li>;
            })}
          </ul>
        </div>
      );
    }
  }
}
