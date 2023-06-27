import React from "react";
import { page_info } from "../../utils/common";

const PageHeader = ({ id, title }) => {
  return (
    <div className="fs-3 fw-bolder mb-2">
      {title && page_info.find((obj) => obj.id === id).title}
    </div>
  );
};

export default PageHeader;
