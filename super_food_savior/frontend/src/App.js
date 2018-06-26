import React, { Component } from "react";
import { Switch } from "react-router-dom";
import DonationForm from "./components/DonationForm";
import DonationIndex from "./components/DonationIndex";
import DonationPage from "./components/DonationPage";
import UserForm from "./components/UserForm";
import NavigationBar from "./components/NavBar";
import UserSignIn from "./components/UserSignIn";
import HomePage from "./components/HomePage";
import axios from "axios";
import "./index.css";

import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      email: null,
      user: null
    };

    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  getUser() {
    axios.get("/").then(res => {
      if (res.data.user) {
        const user = res.data.user[0];
        this.setState({
          loggedIn: true,
          email: user.email,
          user: user
        });
      } else {
        this.setState({
          loggedIn: false,
          email: null,
          user: null
        });
      }
    });
  }

  updateUser = user => {
    this.setState(user);
  };

  clearUser(props) {
    localStorage.clear();
    this.setState({
      loggedIn: false,
      email: null,
      user: null
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <NavigationBar
            user={this.state.user}
            updateUser={this.updateUser}
            loggedIn={this.state.loggedIn}
            onSignOut={this.clearUser}
          />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/donations" component={DonationIndex} />
            <Route exact path="/donations/new" component={DonationForm} />
            <Route exact path="/donations/:id" component={DonationPage} />
            <Route exact path="/users/new" component={UserForm} />
            <Route
              exact
              path="/login"
              render={() => <UserSignIn updateUser={this.updateUser} />}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
