import React, { useEffect, useRef, useState } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import ProfilePopover from "../popover/profile";
import AppModal from "../app-modal";

const AppPopover = ({ children, type }) => {
  const [show, setShow] = useState(false);
  const [openModal, setOpenModal] = useState({ show: false, open_type: "" });
  const [popPlacement, setPopPlacement] = useState("top");
  const elementRef = useRef();

  useEffect(() => {
    if (show) {
      setPopPlacement(
        elementRef.current.getBoundingClientRect().y > 250 ? "top" : "bottom"
      );
    }
  }, [show]);
  const handleModelClose = () => {
    setOpenModal({ show: false, open_type: "" });
  };

  const popoverComponent = () => {
    switch (type) {
      case 1:
        return <ProfilePopover setOpenModal={setOpenModal} setShow={setShow} />;
    }
  };

  const popoverModal = () => {
    switch (type) {
      case 1:
        return (
          <AppModal openModal={openModal} handleModelClose={handleModelClose} />
        );
    }
  };

  return (
    <>
      <div onMouseLeave={() => setShow(false)}>
        <OverlayTrigger
          trigger={["hover", "focus"]}
          placement={popPlacement}
          show={show}
          overlay={<Popover>{popoverComponent()}</Popover>}
        >
          <span ref={elementRef} onMouseEnter={() => setShow(true)}>
            {children}
          </span>
        </OverlayTrigger>
      </div>
      {popoverModal()}
    </>
  );
};

export default AppPopover;
