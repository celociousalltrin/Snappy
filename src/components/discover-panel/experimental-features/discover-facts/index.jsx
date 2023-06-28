import React from "react";
import { mockDiscoverfacts } from "../../../../utils/mock-common";
import { useNavigate } from "react-router-dom";

const DiscoverFacts = () => {
  const navigate = useNavigate();
  const mockFacts = mockDiscoverfacts[Math.floor(Math.random() * 10) + 1];
  return (
    <div className="mt-3 ms-2">
      <h5>{mockFacts.question}</h5>
      <p>{mockFacts.answer}</p>
      <div>
        <p
          className="text-center text-primary cursor-pointer"
          onClick={() => {
            navigate("/facts");
            window.scrollTo(0, 0);
          }}
        >
          Show more
        </p>
      </div>
    </div>
  );
};

export default DiscoverFacts;
