import React from "react";

const ToggleDashboard = props => (
  <div>
    <h5 className="ToggleDashbord" onClick={props.click}>
      {localStorage.session}
    </h5>
  </div>
);

export default ToggleDashboard;
