import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { modelOpenInfo } from "../../utils/common-data";
import { feedMetaDataList } from "../../utils/mock-common";

import "./style.css";

const AppModal = ({ openModal, handleModelClose }) => {
  const { open_type, show } = openModal;

  const [list, setList] = useState([]);

  useEffect(() => {
    if (show) {
      getList(open_type);
    } else {
      setList([]);
    }
  }, [show]);

  const getList = (input) => {
    let listData;
    if (input === 1) {
      listData = feedMetaDataList;
    }
    if (input === 2) {
      listData = feedMetaDataList;
    }
    if (input === 3) {
      listData = feedMetaDataList;
    }
    setList(listData);
  };

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
        <Modal.Header closeButton>
          <Modal.Title>
            {modelOpenInfo.find((obj) => obj.type === open_type)?.heading}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {list.map((obj) => (
            <div className="d-flex row feed-meta-container" key={obj.id}>
              <div className="col-md-2">
                <img
                  src={obj.profile_img}
                  alt="profile_image"
                  width="50px"
                  height="50px"
                  className="modal_profile--img"
                />
              </div>
              <div className="col-md-10 ps-1">
                <div className="d-flex justify-content-between mt-2">
                  <div>
                    <p className="fw-bold mb-0">{obj.name}</p>
                    <p className="text-muted mb-0">
                      {" "}
                      {`@${obj.snappy_username}`}
                    </p>
                  </div>
                  <div className="d-flex align-items-center">
                    <button className="btn btn-sm btn-primary">
                      Add friend
                    </button>
                  </div>
                </div>
                <p>{obj.bio}</p>
              </div>
            </div>
          ))}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AppModal;
