import React from 'react';
import {NavLink} from 'react-router-dom';

export default function NavBar () {
  return (
    <nav className="NavBar">
      <NavLink exact to="/">Home</NavLink>
      <NavLink exact to="/donations">Post a donation</NavLink>
      <NavLink exact to="/users">Sign Up</NavLink>
    </nav>
  )
}
