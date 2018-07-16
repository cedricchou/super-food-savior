import React from "react";
import { NavLink, Form } from "reactstrap";

export default function SignInOutStatus(props) {
  return (
    <Form>
      <NavLink href="/login">Sign In</NavLink>
    </Form>
  );
}
