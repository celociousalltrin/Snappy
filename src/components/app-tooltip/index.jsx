import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const AppToolTip = ({ children, title, position = "top" }) => {
  return (
    <OverlayTrigger placement={position} overlay={<Tooltip>{title}</Tooltip>}>
      {children}
    </OverlayTrigger>
  );
};

export default AppToolTip;
