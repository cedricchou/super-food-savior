import React, { Component } from "react";
import { Card, CardBody, CardText } from "reactstrap";
import axios from "axios";

export default class MessageAnswers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: null,
      userId: null,
      loading: true
    };

    const messageId = this.props.match.params.id;

    axios
      .get(`/users/${localStorage.session_id}/messages/${messageId}`)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            answers: res.data.answers,
            userId: res.data.userId,
            loading: false
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="MessageAnswers">
          <h1>Loading...</h1>
        </div>
      );
    } else {
      return (
        <main className="MessageAnswers">
          {this.state.answers.map((answer, i) => {
            return (
              <div key={i}>
                <Card className="h-100">
                  <CardBody>
                    <CardText>{answer.content}</CardText>
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
