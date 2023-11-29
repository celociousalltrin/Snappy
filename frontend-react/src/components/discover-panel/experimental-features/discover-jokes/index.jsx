import React from "react";
import { useNavigate } from "react-router-dom";
import { mockDiscoverJokes } from "../../../../utils/mock-common";

const DiscoverJokes = () => {
  const navigate = useNavigate();
  const mockJoke = mockDiscoverJokes[Math.floor(Math.random() * 3) + 1];
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
          Show more
        </p>
      </div>
    </div>
  );
};

export default DiscoverJokes;
