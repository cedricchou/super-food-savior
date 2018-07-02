import React, { Component } from "react";
import axios from "axios";
import { Form, Input, Button } from "reactstrap";

export default class DonationSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      research: null
    };
  }

  handleChange = name => event => {
    const searchFunction = {};
    searchFunction[event.target.name] = event.target.value;
    this.setState(searchFunction);
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  render() {
    return (
      <Form className="DonationSearch" onSubmit={this.handleSubmit}>
        <Input
          type="search"
          placeholder="search donation"
          name="research"
          onChange={this.handleChange}
        />
        <Button type="submit" className="SearchButton btn btn-success">
          Search{" "}
        </Button>
      </Form>
    );
  }
}
