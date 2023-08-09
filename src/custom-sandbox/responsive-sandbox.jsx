import React from "react";
import useCustomArray from "../custom-hooks/useCustomArray";
import "./style.css";

const ResponsiveSandBox = () => {
  const data = useCustomArray(12);
  return (
    <div className="container">
      <div className="row no-gutter">
        <div className="res-container col-sm-3 col-md-2"></div>
        <div className="res-container col-sm-3 col-md-2"></div>
        <div className="res-container col-sm-3 col-md-2"></div>
        <div className="res-container col-sm-3 col-md-2"></div>
        <div className="res-container col-sm-3 col-md-2"></div>
        <div className="res-container col-sm-3 col-md-2"></div>
        <div className="res-container col-sm-3 col-md-2"></div>
      </div>
    </div>
  );
};

export default ResponsiveSandBox;
