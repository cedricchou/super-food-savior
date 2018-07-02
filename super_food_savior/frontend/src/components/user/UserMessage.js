import React, { Component } from "react";
import { Card, CardBody, CardText } from "reactstrap";
import axios from "axios";

export default class UserMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: null,
      loading: true
    };
  }

  async componentDidMount() {
    const res = await axios.get(`/users/${localStorage.session_id}/messages`);
    this.setState({
      messages: res.data.myMessages,
      loading: false
    });
  }

  // renderUserMessage(messages) {
  //   if (messages) {
  //     return messages
  //       .slice(0)
  //       .reverse()
  //       .map((message, i) => {
  // <div key={i} className="col-md-4 mb-4">
  //   <Card>
  //     <CardBody>
  //       <CardText>{message.content}</CardText>
  //     </CardBody>
  //   </Card>
  // </div>;
  //       });
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
      console.log(this.state.messages);
      return (
        <main className="UserMessage row">
          {this.state.messages.map((message, index) => {
            <div key={index} className="col-md-4 mb-4">
              <Card>
                <CardBody>
                  <CardText>{message.content}</CardText>
                </CardBody>
              </Card>
            </div>;
          })};
        </main>
      );
    }
  }
}
