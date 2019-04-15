import React, { Component } from "react";
import HomePage from "./components/HomePage";
import NavigationBar from "./components/NavBar";
import DonationForm from "./components/donations/DonationForm";
import DonationIndex from "./components/donations/DonationIndex";
import DonationPage from "./components/donations/DonationPage";
import UserDonation from "./components/user/UserDonation";
import UserMessage from "./components/user/UserMessage";
import MessageAnswers from "./components/user/MessageAnswers";
import DonationMessage from "./components/user/DonationMessage";
import SideNavBar from "./components/sidebar/SideNavBar";
import BackDrop from "./components/sidebar/BackDrop";
import UserForm from "./components/authentication/UserForm";
import UserSignIn from "./components/authentication/UserSignIn";
import "./index.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      email: null,
      user: null,
      sideNavOpener: false,
      results: null
    };
  }

  clearUser = () => {
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
            onSignOut={this.clearUser}
            handleToggler={this.handleToggler}
          />
          {backdrop}
          {sideNav}

          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/donations" component={DonationIndex} />
            <Route 
              exact path="/donations/new" 
              component={DonationForm} 
            />
            <Route exact path="/donations/:id" component={DonationPage} />
            <Route exact path="/users/new" component={UserForm} />
            <Route exact path="/users/:id/messages" component={UserMessage} />
            <Route
              exact path="/users/:id/messages/:id"
              component={MessageAnswers}
            />
            <Route exact path="/users/:id/donations" component={UserDonation} />
            <Route
              exact path="/users/:id/donations/:id"
              component={DonationMessage}
            />
            <Route
              exact path="/login"
              component={UserSignIn}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
