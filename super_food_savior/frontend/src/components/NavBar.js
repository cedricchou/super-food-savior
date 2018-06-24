import React from "react";
import { Navbar, Nav, NavLink, NavItem } from "reactstrap";
import DonationSearch from "./DonationSearch";

export default function NavigationBar(props) {
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
            <NavLink href="/login">Sign In</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/users/new">Sign Up</NavLink>
          </NavItem>
          <NavItem>
            <DonationSearch />
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
}
