import React, { Component } from "react";
import axios from "axios";
import { Form, Input, Button } from "reactstrap";

export default class DonationSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }

  handleChange = event => {
    const searchFunction = {};
    searchFunction[event.target.name] = event.target.value;
    this.setState(searchFunction);
  };

  handleSubmit = event => {
    event.preventDefault();
    axios.get("/donations", this.state).then(res => {
      console.log(res);
    });
  };

  render() {
    return (
      <Form className="DonationSearch" onSubmit={this.handleSubmit}>
        <Input type="search" placeholder="search donation" name="research" />
        <Button type="submit" className="SearchButton btn btn-success">
          Search{" "}
        </Button>
      </Form>
    );
  }
}
