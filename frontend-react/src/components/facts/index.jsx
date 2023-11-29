import React from "react";
import { mockDiscoverfacts } from "../../utils/mock-common";
import ExperimentalComponent from "../experimental-component";

const Facts = () => {
  return (
    <div className="ms-2">
      <ExperimentalComponent list={mockDiscoverfacts} />
    </div>
  );
};

export default Facts;
