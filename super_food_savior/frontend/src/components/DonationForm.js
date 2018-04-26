import React, { Component } from 'react';
import axios from 'axios';

export default class DonationForm extends Component {

  state = {
    title: '1',
    description: '2'
  }

  handleChange = (event) => {
    // console.log("which field", event.target.name);
    const newData = {};
    newData[event.target.name] = event.target.value;
    console.log("newData >>>>", newData);
    this.setState(newData)
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const toSend = this.state;
  axios
   .post('/donations', toSend)
   .then(function (response) {
     console.log(response);
     if (response && response.data && response.data.success){
       alert("nice work man")
     }
   })
   .catch(function (error) {
     console.log(error);
   });
  }

  render() {
    return (
      <div className="DonationForm">
        <form onSubmit={this.handleSubmit}>
          Title:
          <input type="text" name="title" value={this.state.title}
            onChange={this.handleChange}
           />
          <br/>
          Description:
          <input type="text" name="description" value={this.state.description}
            onChange={this.handleChange}
           />
           <input type="submit" />
        </form>
      </div>
    )
  }
}
