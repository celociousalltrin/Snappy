import React from "react";
import { mockDiscoverJokes } from "../../../../utils/mock-common";
import { useNavigate } from "react-router-dom";

const DiscoverJokes = () => {
  const navigate = useNavigate();
  const mockJoke = mockDiscoverJokes[1];
  return (
    <div className="mt-3 ms-2">
      <h5>{mockJoke.question}</h5>
      <p>{mockJoke.answer}</p>
      <div>
        <p
          className="text-center text-primary cursor-pointer"
          onClick={() => {
            navigate("/jokes");
            window.scrollTo(0, 0);
          }}
        >
          Show More
        </p>
      </div>
    </div>
  );
};

export default DiscoverJokes;
