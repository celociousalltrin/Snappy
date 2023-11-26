import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { modelOpenInfo } from "../../utils/common-data";
import { MockConnectorsList } from "../../utils/mock-common";

import "./style.css";
import ConnectorsList from "../connectors/connectors-list";
import { AiOutlineClose } from "react-icons/ai";
import { responseMessage } from "../../utils/response-message";
import { getFavouritifyConnectorList } from "../../services/method";

const AppModal = ({ openModal, handleModelClose }) => {
  const { open_type, show, snapp_id } = openModal;

  const [list, setlist] = useState([]);

  const getList = async (id, type) => {
    try {
      const response = await getFavouritifyConnectorList(id, type);
      setlist(response.data.response_data);
    } catch (err) {
      responseMessage(err.data.code);
      console.log("🚀 ~ file: index.jsx:17 ~ getList ~ err:", err);
    }
  };

  useEffect(() => {
    if (show) {
      getList(snapp_id, open_type);
    }
  }, [open_type]);

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
            connecteduserList={list.userData || []}
            allianceIds={list.alianceIds}
            isConnectorList
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AppModal;
