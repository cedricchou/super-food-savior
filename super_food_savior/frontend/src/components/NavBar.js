import React from "react";
import { Navbar, Nav, NavLink, NavItem } from "reactstrap";
import DonationSearch from "./DonationSearch";
import SignInOutStatus from "./SignInOutStatus";
import SignUpOutStatus from "./SignUpOutStatus";

export default function NavigationBar(props) {
  const { user, loggedIn, onSignOut = () => {} } = props;

  const handleSignout = event => {
    event.preventDefault();
    onSignOut();
  };

  if (loggedIn === true) {
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
              <NavLink href="/donations/new">Post a donation</NavLink>
            </NavItem>
            <p>Welcome Cedric</p>
            <NavItem>
              <a href="" onClick={handleSignout}>
                Sign Out
              </a>
            </NavItem>
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
              <NavLink href="/donations/new">Post a donation</NavLink>
            </NavItem>
            <NavItem>
              <SignInOutStatus />
            </NavItem>
            <NavItem>
              <SignUpOutStatus />
            </NavItem>
            <NavItem>
              <DonationSearch />
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}
