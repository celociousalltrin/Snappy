import React, { useEffect, useState } from "react";

import Modal from "react-bootstrap/Modal";
import { AiOutlineClose } from "react-icons/ai";

import { modelOpenInfo } from "../../utils/common-data";
import { responseMessage } from "../../utils/response-message";

import ConnectorsList from "../connectors/connectors-list";

import "./style.css";

import { getFavouritifyConnectorList } from "../../services/method";

const AppModal = ({ openModal, handleModelClose, api, isProfile, userId }) => {
  const { open_type, show, snapp_id } = openModal;
  const [isApiExecuted, setApiExecuted] = useState(false);
  const [list, setList] = useState([]);

  const getList = async (id, type) => {
    setApiExecuted(false);
    try {
      let response;
      if (isProfile) {
        response = await api(userId);
      } else {
        response = await getFavouritifyConnectorList(id, type);
      }

      setList(response.data.response_data);
    } catch (err) {
      responseMessage(err.data.code);
      console.log("🚀 ~ file: index.jsx:17 ~ getList ~ err:", err);
    } finally {
      setApiExecuted(true);
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
          {isProfile ? (
            <ConnectorsList
              connecteduserList={list}
              isFansList={open_type === 4 ? true : false}
              isAllianceList={open_type === 5 ? true : false}
              isApiExecuted={isApiExecuted}
              isModal
            />
          ) : (
            <ConnectorsList
              connecteduserList={
                (list.length > 0 && list.map(({ userData }) => userData)) || []
              }
              allianceIds={
                list.length > 0 && list.map(({ alliance_id }) => alliance_id)
              }
              isConnectorList
              isApiExecuted={isApiExecuted}
              isModal
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AppModal;
