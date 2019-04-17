import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardText, CardBody, CardTitle, Form, Input, Button } from "reactstrap";
import axios from "axios";

export default class DonationIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      donations: null,
      filtered: null,
      research: null
    };
  }

  componentDidMount() {
    axios.get("/donations").then(res => {
      this.setState({ donations: res.data.donations });
    });
  }

  handleChange = event => {
    const searchFunction = {};
    searchFunction[event.target.name] = event.target.value;
    this.setState(searchFunction);
  };

  handleSubmit = event => {
    event.preventDefault();
    const {research} = this.state;

    axios.get('/donations').then(res => {
      if(res.data.donations) {
        const searchArray = res.data.donations;
        // const result = searchArray.filter(donation => donation.title === research)
        let result = [];
        searchArray.map(donation => {
          const {title, description} = donation;
          if(title.includes(research) || description.includes(research)) {
            result.push(donation)
          }
        })
        this.setState({
          filtered: result
        })
      }
    }).catch(err => {
      console.log(err)
    })
  };

  renderDonations(donations) {
    const imageDetail = {
      minHeight: "350px",
      maxHeight: "350px",
      minWidth: "100%"
    };

    if (this.state.filtered) {
      const {filtered} = this.state
      return filtered
        .slice(0)
        .reverse()
        .map((donation, index) => (
          <div key={index} className="col-md-4 mb-4">
            <Link to={`/donations/${donation.id}`}>
              <Card className="h-100">
                <img src={donation.pictureUrl} alt="" style={imageDetail} />
                <CardBody>
                  <CardTitle>{donation.title}</CardTitle>
                  <CardText>{donation.description}</CardText>
                </CardBody>
              </Card>
            </Link>
          </div>
        ));
    }

    if (donations) {
      return donations
        .slice(0)
        .reverse()
        .map((donation, index) => (
          <div key={index} className="col-md-4 mb-4">
            <Link to={`/donations/${donation.id}`}>
              <Card className="h-100">
                <img src={donation.pictureUrl} alt="" style={imageDetail} />
                <CardBody>
                  <CardTitle>{donation.title}</CardTitle>
                  <CardText>{donation.description}</CardText>
                </CardBody>
              </Card>
            </Link>
          </div>
        ));
    }
  }

  

  render() {
    return (
      <div className="DonationContainer"> 
        <Form className="DonationSearch" onSubmit={this.handleSubmit}>
          <Input
            type="search"
            placeholder="search donation"
            name="research"
            onChange={this.handleChange}
          />
          <Button type="submit" className="SearchButton" style={{backgroundColor: "#007bff"}}>
            Search
          </Button>
        </Form>
        <div className="DonationIndex row">  
          {this.renderDonations(this.state.donations)}
        </div>
      </div>
    );
  }
}
