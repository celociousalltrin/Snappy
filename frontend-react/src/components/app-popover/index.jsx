import React, { useEffect, useRef, useState } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import ProfilePopover from "../popover/profile";
import AppModal from "../app-modal";

import "./style.css";

const AppPopover = ({ children, type, isNoPopOver }) => {
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

  const popoverComponent = (input) => {
    switch (input) {
      case 1:
        return (
          <ProfilePopover
            setOpenModal={setOpenModal}
            setShow={setShow}
            id={id}
          />
        );
    }
  };

  const popoverModal = (input) => {
    switch (input) {
      case 1:
        return (
          <AppModal openModal={openModal} handleModelClose={handleModelClose} />
        );
    }
  };

  return (
    <>
      {!isNoPopOver ? (
        <div onMouseLeave={() => setShow(false)}>
          <OverlayTrigger
            trigger={["hover", "focus"]}
            placement={popPlacement}
            show={show}
            overlay={
              <Popover className="custom-popover">
                {popoverComponent(type)}
              </Popover>
            }
          >
            <span ref={elementRef} onMouseEnter={() => setShow(true)}>
              {children}
            </span>
          </OverlayTrigger>
        </div>
      ) : (
        <span>{children}</span>
      )}
      {popoverModal(type)}
    </>
  );
};

export default AppPopover;
