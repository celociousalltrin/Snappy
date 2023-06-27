import React from "react";
import { sideBarName } from "../../utils/common";
import "./style.css";
import { useNavigate, useParams } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();
  const { ["*"]: page_name } = useParams();

  return (
    <div className="sidebar-container ps-5">
      {sideBarName.map((obj) => (
        <div
          key={obj.id}
          className={`sidebar-menu rounded-pill pe-4 ${
            `/${page_name}` === obj.route && "fw-bold"
          }`}
          onClick={() => navigate(obj.route)}
        >
          <span className="sidebar-icon me-3 ms-1 fs-5">{obj.icon}</span>
          <span className="sidebar-name me-2 fs-4">{obj.name}</span>
        </div>
      ))}
    </div>
  );
};

export default SideBar;
