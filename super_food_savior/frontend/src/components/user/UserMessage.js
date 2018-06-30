import React, { Component } from "react";
import { Card, CardBody, CardText } from "reactstrap";
import axios from "axios";

export default class UserMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null
    };
  }

  async componentDidMount() {
    const res = await axios.get(`/users/${localStorage.session_id}/messages`);
    this.setState({
      message: res.data.myMessages
    });
  }

  renderUserMessage(messages) {
    if (messages) {
      return messages.map((message, index) => {
        <div key={index} className="col-md-4 mb-4">
          <Card>
            <CardBody>
              <CardText>{message.id}</CardText>
            </CardBody>
          </Card>
        </div>;
      });
    }
  }

  render() {
    console.log(this.state.message);

    return (
      <div className="UserMessage row">
        {this.renderUserMessage(this.state.message)}
      </div>
    );
  }
}
