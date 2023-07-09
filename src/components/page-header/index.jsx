import React from "react";
import { page_info } from "../../utils/common";

const PageHeader = ({ page_id, id, title }) => {
  return (
    <div className="fs-3 fw-bolder mb-2">
      {!id
        ? title && page_info.find((obj) => obj.id === page_id).title
        : "Snapp"}
    </div>
  );
};

export default PageHeader;
