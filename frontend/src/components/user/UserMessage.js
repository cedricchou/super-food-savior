import React, { Component } from "react";
import { Card, CardBody, CardText } from "reactstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";

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

  render() {
    if(!localStorage.session) {
      return <Redirect to="/login" />
    }
    else if (this.state.loading) {
      return (
        <div>
          <h4>Loading...</h4>
        </div>
      );
    } else {
      return (
        <main className="UserMessage row">
          {this.state.messages.map((message, index) => {
            return (
              <div key={index} className="col-md-4 mb-4">
                <Card>
                  <CardBody>
                    <CardText>{message.content}</CardText>
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
