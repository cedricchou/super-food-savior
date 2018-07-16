import React, { Component } from "react";
import { Switch } from "react-router-dom";
import HomePage from "./components/HomePage";
import NavigationBar from "./components/NavBar";
import DonationForm from "./components/donations/DonationForm";
import DonationIndex from "./components/donations/DonationIndex";
import DonationPage from "./components/donations/DonationPage";
import DonationSearch from "./components/donations/DonationSearch";
import UserDonation from "./components/user/UserDonation";
import UserMessage from "./components/user/UserMessage";
import MessageAnswers from "./components/user/MessageAnswers";
import DonationMessage from "./components/user/DonationMessage";
import SideNavBar from "./components/sidebar/SideNavBar";
import BackDrop from "./components/sidebar/BackDrop";
import UserForm from "./components/authentication/UserForm";
import UserSignIn from "./components/authentication/UserSignIn";
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
      sideNavOpener: false,
      results: null
    };

    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  filteredDonations = (query = "car") => {
    axios
      .get("/donations")
      .then(res => {
        this.setState({
          results: res.data.donations
        });
      })
      .catch(error => {
        console.log("Error fetching and parsing data", error);
      });
  };

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
    console.log(localStorage);
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
            <Route
              exact
              path="/users/:id/messages/:id"
              component={MessageAnswers}
            />
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
