import React from "react";
import DonationMessage from "../user/DonationMessage";
import { NavLink } from "reactstrap";
import "./SideNavBar.css";

function SideNavBar(props) {
  return (
    <nav className="sidenav">
      <ul>
        <li>
          <NavLink
            className="NavLink"
            href={`/users/${localStorage.session_id}/donations`}
          >
            My Donations
          </NavLink>
        </li>
        <li>
          <NavLink
            className="NavLink"
            href={`/users/${localStorage.session_id}/messages`}
          >
            My Messages
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default SideNavBar;
