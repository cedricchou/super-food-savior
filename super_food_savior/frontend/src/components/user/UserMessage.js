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

  renderUserMessage(message) {
    if (message) {
      console.log(message[0]);
      return message
        .slice(0)
        .reverse()
        .map((mes, i) => {
          <div key={i} className="col-md-4 mb-4">
            <Card>
              <CardBody>
                <CardText>{mes.content}</CardText>
              </CardBody>
            </Card>
          </div>;
        });
    }
  }

  render() {
    console.log(this.state);

    return (
      <div className="UserMessage row">
        {this.renderUserMessage(this.state.message)}
      </div>
    );
  }
}
