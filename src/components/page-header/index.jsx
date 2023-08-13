import React from "react";
import { page_info } from "../../utils/common-data";
import { MdOutlineArrowBack } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

const PageHeader = ({ page_id, id, title }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <div className="fs-3 fw-bolder mb-2">
      {id === "single-feed" ? (
        <div>
          <MdOutlineArrowBack
            size={22}
            className="ms-2 me-4 cursor-pointer"
            onClick={() =>
              navigate(pathname.substring(0, pathname.indexOf("/", 1)))
            }
          />
          Snapp
        </div>
      ) : (
        title && page_info.find((obj) => obj.id === page_id).title
      )}
    </div>
  );
};

export default PageHeader;
