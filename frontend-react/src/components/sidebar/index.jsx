import React from "react";
import { sideBarData } from "../../utils/common-data";
import "./style.css";
import { useNavigate, useParams } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();
  const { ["*"]: page_name } = useParams();

  return (
    <div className="sidebar-container row ms-2">
      {sideBarData.map((obj) => (
        <div
          key={obj.id}
          className={`col-12 sidebar-menu rounded-pill ${
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
