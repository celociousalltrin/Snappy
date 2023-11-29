import React from "react";

import { mockDiscoverJokes } from "../../utils/mock-common";

import ExperimentalComponent from "../experimental-component";

import "./style.css";

const Joke = () => {
  return (
    <div className="ms-2">
      <ExperimentalComponent list={mockDiscoverJokes} />
    </div>
  );
};

export default Joke;
