import React, { useEffect, useRef, useState } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import ProfilePopover from "../popover/profile";

const AppPopover = ({ children, position = "top", type }) => {
  const [show, setShow] = useState(false);

  const popoverComponent = () => {
    switch (type) {
      case 1:
        return <ProfilePopover />;
    }
  };

  return (
    <div onMouseLeave={() => setShow(false)}>
      <OverlayTrigger
        trigger={["hover", "focus"]}
        placement={position}
        show={show}
        overlay={<Popover>{popoverComponent()}</Popover>}
      >
        <span onMouseEnter={() => setShow(true)}>{children}</span>
      </OverlayTrigger>
    </div>
  );
};

export default AppPopover;
