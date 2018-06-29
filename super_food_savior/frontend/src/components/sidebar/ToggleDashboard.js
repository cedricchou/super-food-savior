import React, { Component } from "react";
import { Button } from "reactstrap";

const ToggleDashboard = props => (
  <Button type="submit" className="ToggleDashbord" onClick={props.click}>
    {localStorage.session}
  </Button>
);

export default ToggleDashboard;
