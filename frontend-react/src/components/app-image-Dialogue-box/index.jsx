import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { generateCroppedImageDataURL } from "../../utils/common-function";

import "./style.css";
import AppFramerButton from "../app-framer-button";
import toast from "react-hot-toast";
const AppImageDialogueBox = ({
  imageCropperComp,
  show,
  setShow,
  selectedImageDataURL,
  setSelectedImageDataURL,
  croppedAreaPixels,
  callback = () => {},
}) => {
  const handleClose = () => {
    setShow(false);
    setSelectedImageDataURL("");
  };

  const handleGenerateCroppedImage = (crop, imageURL) => {
    const result = generateCroppedImageDataURL(imageURL, crop);
    callback(result);
    handleClose();
    toast.success("Image Uploaded Successfully");
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>{imageCropperComp}</Modal.Body>
        <Modal.Footer>
          <AppFramerButton hover={1.1} tap={0.9}>
            <button
              className="btn btn-primary"
              onClick={() =>
                handleGenerateCroppedImage(
                  croppedAreaPixels,
                  selectedImageDataURL
                )
              }
            >
              Upload
            </button>
          </AppFramerButton>
          <AppFramerButton>
            <button className="btn btn-danger" onClick={handleClose}>
              Cancel
            </button>
          </AppFramerButton>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AppImageDialogueBox;
