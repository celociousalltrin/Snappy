import React from "react";
import ExperimentalComponent from "../experimental-component";
import { mockDiscoverfacts } from "../../utils/mock-common";

const Facts = () => {
  return (
    <div className="ms-2">
      <ExperimentalComponent list={mockDiscoverfacts} />
    </div>
  );
};

export default Facts;
