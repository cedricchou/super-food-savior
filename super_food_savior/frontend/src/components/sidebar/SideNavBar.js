import React from "react";
import "./SideNavBar.css";

function SideNavBar(props) {
  return (
    <nav className="sidenav">
      <ul>
        <li>
          <a href={`/users/${localStorage.session_id}/donations`}>
            My Donations
          </a>
        </li>
        <li>
          <a href={`/users/${localStorage.session_id}/messages`}>My Messages</a>
        </li>
      </ul>
    </nav>
  );
}

export default SideNavBar;
