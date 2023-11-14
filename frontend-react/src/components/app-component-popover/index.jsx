import React from "react";
import { Overlay, Popover } from "react-bootstrap";

const AppComponentPopover = ({
  component,
  show,
  isHeader,
  title,
  target,
  placement = "bottom",
}) => {
  return (
    <Overlay show={show} target={target} placement={placement}>
      {(props) => (
        <Popover {...props}>
          {isHeader && <Popover.Header>{title}</Popover.Header>}
          <Popover.Body>{component}</Popover.Body>
        </Popover>
      )}
    </Overlay>
  );
};

export default AppComponentPopover;
