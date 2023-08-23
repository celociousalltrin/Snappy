import React from "react";
import "./style.css";
import ExperimentalComponent from "../experimental-component";
import { mockDiscoverJokes } from "../../utils/mock-common";

const Joke = () => {
  return (
    <div className="ms-2">
      <ExperimentalComponent list={mockDiscoverJokes} />
    </div>
  );
};

export default Joke;
