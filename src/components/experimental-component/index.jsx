import React, { useState } from "react";

import "./style.css";

const ExperimentalComponent = ({ list }) => {
  const [listIndex, setListIndex] = useState([]);
  const [showAnswers, setShowAnswers] = useState(false);
  const [listCount, setListCount] = useState(5);
  return (
    <div>
      <button
        className={`btn mb-3 ${showAnswers ? "btn-secondary" : "btn-info"}`}
        type="button"
        onClick={() => {
          setShowAnswers(!showAnswers);
        }}
      >
        {showAnswers ? "Hide All Answers" : "Show All Answers"}
      </button>

      {list.map(
        (obj, i) =>
          i < listCount && (
            <div key={`exp_comp${obj.id}`} className="d-flex mb-2">
              <div>
                <h5 className="me-2">{`${i + 1})`}</h5>
              </div>
              <div>
                <h5>{obj.question}</h5>
                {listIndex.includes(i) || showAnswers ? (
                  <div className="d-flex">
                    <p>{obj.answer}</p>
                    {!showAnswers && (
                      <>
                        <p
                          onClick={() =>
                            setListIndex(listIndex.filter((obj) => obj !== i))
                          }
                          className="ms-3 text-danger cursor-pointer text-nowrap me-3 text-decoration-underline"
                        >
                          Hide Answer
                        </p>
                      </>
                    )}
                  </div>
                ) : (
                  <p
                    onClick={() => setListIndex([...listIndex, i])}
                    className="cursor-pointer text-primary"
                  >
                    <u>Show Answer</u>
                  </p>
                )}
              </div>
            </div>
          )
      )}
      {listCount < 20 && (
        <div className="d-flex justify-content-center mb-5">
          <button
            onClick={() => setListCount(listCount + 5)}
            className="cursor-pointer btn btn-outline-dark "
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default ExperimentalComponent;
