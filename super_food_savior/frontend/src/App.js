import React, { Component } from 'react';
import DonationForm from './components/DonationForm';
import UserForm from './components/UserForm';
import NavBar from './components/NavBar';
import UserSignIn from './components/UserSignIn';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <Route exact path="/donations" component={DonationForm} />
          <Route exact path="/users" component={UserForm} />
          <Route exact path="/login" component={UserSignIn} />
        </div>
      </Router>
    );
  }
}

export default App;
