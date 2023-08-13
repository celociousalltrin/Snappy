import React, { useState } from "react";
import "./style.css";
import { SignupInterestedFields } from "../../utils/common-data";

const InterestedFields = () => {
  const [userInterest, setUserInterest] = useState([]);

  const handleInterestAction = (input) => {
    if (userInterest.includes(input)) {
      setUserInterest(userInterest.filter((obj) => obj !== input));
    } else if (userInterest.length > 4) {
      alert("You can Choose only 5 interest");
    } else {
      setUserInterest([...userInterest, input]);
    }
  };

  return (
    <div className="row ms-3 ms-md-0 m-auto">
      <p
        className={`${
          userInterest.length > 4 && "text-primary"
        } fs-5 pb-1 mb-0 text-start fw-bold interest-selected-count`}
      >
        {`${userInterest.length}/5`}{" "}
        <span className="ms-1 fw-normal">Selected</span>
      </p>
      <p className="text-muted text-start fs-6 mb-4">
        To get a personalized feed in Snappy, you must select atleast 3 interest
        and not more than 5 interest
      </p>
      {SignupInterestedFields.map((obj) => (
        <div className="col-md-4 col-lg-3">
          <div
            className={`shadow p-3 mb-5 rounded interest-single-container ${
              userInterest.includes(obj.id) && "bg-primary text-light"
            }`}
            onClick={() => handleInterestAction(obj.id)}
          >
            <p className="interset-text">{obj.field}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InterestedFields;
