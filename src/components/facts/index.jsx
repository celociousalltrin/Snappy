import React from "react";
import ExperimentalComponent from "../experimental-component";
import { mockDiscoverfacts } from "../../utils/mock-common";

const Facts = () => {
  return (
    <div>
      <ExperimentalComponent list={mockDiscoverfacts} />
    </div>
  );
};

export default Facts;
