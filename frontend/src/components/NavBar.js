import React, {Component} from "react";
import { Navbar, Nav, NavLink, NavItem } from "reactstrap";
import { Redirect } from "react-router-dom";
// import DonationSearch from "./donations/DonationSearch";
import SignInOutStatus from "./authentication/SignInOutStatus";
import SignUpOutStatus from "./authentication/SignUpOutStatus";
import ToggleDashboard from "./sidebar/ToggleDashboard";

export default class NavigationBar extends Component {
   constructor(props) {
     super(props);
   }

   handleSignout = event => {
    event.preventDefault();
    this.props.onSignOut();
    window.location.reload(true);
  };

  render() {
    if (localStorage.session) {
      return (
        <div>
          <Navbar className="NavBar" light expand="md">
            <Nav className="m-auto">
              <NavItem>
                <ToggleDashboard click={this.props.handleToggler} />
              </NavItem>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/donations/">Donations</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/donations/new">Post a donation</NavLink>
              </NavItem>
              <NavLink>Welcome {localStorage.session}</NavLink>
              <NavItem>
                <NavLink href="" onClick={this.handleSignout}>
                  Sign Out
                </NavLink>
              </NavItem>
              {/* <NavItem>
                <DonationSearch />
              </NavItem> */}
            </Nav>
          </Navbar>
        </div>
      );
    } else {
      return (
        <div>
          <Navbar className="NavBar" light expand="md">
            <Nav className="m-auto">
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/donations/">Donations</NavLink>
              </NavItem>
              <NavItem>
                <SignInOutStatus />
              </NavItem>
              <NavItem>
                <SignUpOutStatus />
              </NavItem>
            </Nav>
          </Navbar>
        </div>
      );
    }
  }

  
}
