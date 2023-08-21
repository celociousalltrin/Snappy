import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import "./style.css";
import { isToggleContent, sliceContent } from "../utils/common-function";
import { MockProfilePopoverData } from "../utils/mock-common";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";

function BasicExample() {
  const [display, setDisplay] = useState(false);
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Popover right</Popover.Header>
      <Popover.Body>
        And here's some <strong>amazing</strong> content. It's very engaging.
        right?
      </Popover.Body>
    </Popover>
  );
  return (
    <div>
      <OverlayTrigger trigger="click" placement="right" overlay={popover}>
        <Button variant="success">Click me to see</Button>
      </OverlayTrigger>
    </div>
  );
}

export default BasicExample;
