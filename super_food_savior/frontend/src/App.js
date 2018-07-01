import React, { Component } from "react";
import { Switch } from "react-router-dom";
import DonationForm from "./components/DonationForm";
import DonationIndex from "./components/DonationIndex";
import DonationPage from "./components/DonationPage";
import UserDonation from "./components/user/UserDonation";
import UserMessage from "./components/user/UserMessage";
import DonationMessage from "./components/user/DonationMessage";
import UserForm from "./components/UserForm";
import NavigationBar from "./components/NavBar";
import SideNavBar from "./components/sidebar/SideNavBar";
import BackDrop from "./components/sidebar/BackDrop";
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
      user: null,
      sideNavOpener: false
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
        localStorage.getItem("session");
        this.setState({
          loggedIn: true,
          email: user.email,
          user: user
        });
      }
    });
  }

  updateUser = user => {
    this.setState(user);
  };

  clearUser() {
    localStorage.removeItem("session");
    localStorage.removeItem("session_id");
  }

  handleToggler = () => {
    this.setState(prevState => {
      return { sideNavOpener: !prevState.sideNavOpener };
    });
  };

  handleBackdrop = () => {
    this.setState({ sideNavOpener: false });
  };

  render() {
    let sideNav = "";
    let backdrop = "";
    if (this.state.sideNavOpener) {
      sideNav = <SideNavBar />;
      backdrop = <BackDrop click={this.handleToggler} />;
    }
    return (
      <Router>
        <div className="App">
          <NavigationBar
            user={this.state.user}
            updateUser={this.updateUser}
            loggedIn={this.state.loggedIn}
            onSignOut={this.clearUser}
            handleToggler={this.handleToggler}
          />
          {backdrop}
          {sideNav}
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/donations" component={DonationIndex} />
            <Route exact path="/donations/new" component={DonationForm} />
            <Route exact path="/donations/:id" component={DonationPage} />
            <Route exact path="/users/new" component={UserForm} />
            <Route exact path="/users/:id/messages" component={UserMessage} />
            <Route exact path="/users/:id/donations" component={UserDonation} />
            <Route
              exact
              path="/users/:id/donations/:id"
              component={DonationMessage}
            />
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
