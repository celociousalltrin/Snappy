import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { modelOpenInfo } from "../../utils/common-data";
import { MockConnectorsList } from "../../utils/mock-common";

import "./style.css";
import ConnectorsList from "../connectors/connectors-list";
import { AiOutlineClose } from "react-icons/ai";

const AppModal = ({ openModal, handleModelClose }) => {
  const { open_type, show } = openModal;

  return (
    <div>
      <Modal
        show={show}
        onHide={handleModelClose}
        backdrop="static"
        keyboard={false}
        size="m"
        scrollable={true}
      >
        <Modal.Header>
          <div>
            <AiOutlineClose
              className="App-modal-close__button"
              size={23}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleModelClose();
              }}
            />
          </div>
          <Modal.Title className="me-auto">
            {modelOpenInfo.find((obj) => obj.type === open_type)?.heading}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ConnectorsList
            connecteduserList={MockConnectorsList}
            isAllianceList
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AppModal;
