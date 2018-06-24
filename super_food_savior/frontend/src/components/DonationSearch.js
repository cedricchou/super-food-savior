import React from "react";
import { Form, Input, Button } from "reactstrap";

export default function DonationSearch() {
  return (
    <Form className="DonationSearch">
      <Input type="search" placeholder="search donation" name="research" />
      <Button type="submit" className="SearchButton btn btn-success">
        Search{" "}
      </Button>
    </Form>
  );
}
