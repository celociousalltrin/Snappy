import React, { useEffect, useState } from "react";
import "./style.css";
import { SignupInterestedFields } from "../../utils/common-data";
import { AiOutlineDownCircle, AiOutlineUpCircle } from "react-icons/ai";
import useToggleContent from "../../custom-hooks/useToggleContent";
import AppFramerExpand from "../../components/app-framer-expand";
import toast from "react-hot-toast";

const InterestedFields = ({ data, formik: { setFieldValue } }) => {
  const { isShow, showLess, showMore } = useToggleContent();
  const [showIcon, setShowIcon] = useState(true);

  const handleInterestAction = (input) => {
    if (data.includes(input)) {
      setFieldValue(
        "interest",
        data.filter((obj) => obj !== input)
      );
    } else if (data.length > 4) {
      toast.error("You can Choose only 5 interest");
    } else {
      setFieldValue("interest", [...data, input]);
    }
  };

  return (
    <div className="row ms-3 ms-md-0 m-auto">
      <p
        className={`${
          data.length > 4 && "text-primary"
        } fs-5 pb-1 mb-0 text-start fw-bold interest-selected-count`}
      >
        {`${data.length}/5`} <span className="ms-1 fw-normal">Selected</span>
      </p>
      <div className="position-relative">
        <AppFramerExpand setShowIcon={setShowIcon} isVisible={isShow}>
          <p className="text-muted text-start fs-6 mb-4">
            To get a personalized feed in Snappy, you must select atleast 3
            interest and not more than 5 interest
            <span onClick={showLess} className="d-md-none">
              {" "}
              {isShow && (
                <AiOutlineUpCircle size={23} color="rgb(13, 110, 253)" />
              )}
            </span>
          </p>

          {!isShow && (
            <span
              className="content-expand-interest-icon d-md-none"
              onClick={showMore}
            >
              {showIcon && <AiOutlineDownCircle size={23} />}
            </span>
          )}
        </AppFramerExpand>
      </div>
      {SignupInterestedFields.map((obj) => (
        <div className="col-md-4 col-lg-3">
          <div
            className={`shadow p-3 mb-5 rounded interest-single-container ${
              data.includes(obj.id) && "bg-primary text-light"
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
