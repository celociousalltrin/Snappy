import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegBookmark, FaRegComment, FaReply } from "react-icons/fa";

import commentProfile from "../../assets/mock-image/5mutual.jpg";

import "./style.css";
import AppTextArea from "../app-text-area";
import AppModal from "../app-modal";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { NavigateToProfile } from "../../utils/common-function";

const SingleFeed = ({ singleFeedData }) => {
  const init = {
    show: false,
    open_type: "",
  };
  const [openModal, setOpenModal] = useState(init);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { page_id } = useParams();

  const handleModelClose = () => {
    setOpenModal(init);
  };

  return (
    <div>
      {
        <div key={`s_fd_data${singleFeedData.id}`} className="mb-4">
          <div className="d-flex single-feed-container p-2 pb-0">
            <img
              src={singleFeedData.profile_img}
              alt="pic-img"
              width="40px"
              height="40px"
              className="profile-image me-2 cursor-pointer"
              onClick={(e) =>
                NavigateToProfile(
                  e,
                  navigate,
                  singleFeedData.snappy_username,
                  page_id
                )
              }
            />
            <div>
              <p
                className="fw-bold mb-0 cursor-pointer profile__name"
                onClick={(e) =>
                  NavigateToProfile(
                    e,
                    navigate,
                    singleFeedData.snappy_username,
                    page_id
                  )
                }
              >
                {singleFeedData.name}
              </p>
              <p className="text-muted">{`@${singleFeedData.snappy_username}`}</p>
            </div>
          </div>
          <div className="container">
            <div className="border-bottom">
              <p className="mb-2">{singleFeedData.snapp.message}</p>
              <img
                src={singleFeedData.snapp.image}
                alt="pic-img"
                width="100%"
                height="60%"
                className="rounded"
              />
              <p className="mt-3 text-muted">{singleFeedData.snapped_at}</p>
            </div>
            <div className="d-flex snapp-feed-data border-bottom mt-3">
              <p>
                {singleFeedData.likes}
                <span
                  onClick={() => setOpenModal({ show: true, open_type: 1 })}
                >
                  Likes
                </span>
              </p>

              <p>
                {singleFeedData.comments_count}
                <span
                  onClick={() => setOpenModal({ show: true, open_type: 2 })}
                >
                  Comments
                </span>
              </p>
              <p>
                {singleFeedData.bookmarks}
                <span
                  onClick={() => setOpenModal({ show: true, open_type: 3 })}
                >
                  Bookmarks
                </span>
              </p>
            </div>
            <div className="d-flex justify-content-around mt-3 pb-3 border-bottom">
              <div>
                <AiOutlineLike size={20} /> <span>80</span>
              </div>
              <div>
                <FaRegComment size={20} /> <span>27</span>
              </div>
              <div>
                <FaRegBookmark size={20} />
              </div>
            </div>
            <div className="mt-3">
              <div className="d-flex">
                <img
                  src={commentProfile}
                  alt="comment-profile"
                  width="40px"
                  height="40px"
                  className="profile-image me-2"
                />
                <AppTextArea
                  placeholder="Add Your Comment"
                  rows="1"
                  cols="80"
                />
              </div>
              <div className="d-flex justify-content-end mt-2 border-bottom pb-3">
                <button className="btn btn-sm me-1 btn-primary rounded ">
                  Add Comment
                </button>
              </div>
            </div>
            <div className="mt-2">
              {singleFeedData.comments.map((obj) => (
                <div key={`cmnt${obj.id}`} className="border-bottom mt-2 pb-3">
                  <div className="d-flex">
                    <div>
                      <img
                        src={obj.user_profile_pic}
                        alt="pic-img"
                        width="40px"
                        height="40px"
                        className="profile-image me-2"
                      />
                    </div>
                    <div>
                      <div className="d-flex comment-profile-data">
                        <p className="fw-bold">{obj.user_name}</p>
                        <p className="text-muted ms-2">{`@${obj.snapp_user_name}`}</p>
                        <p className="text-muted ms-2">{`.${obj.commented_at}`}</p>
                        <FaReply
                          size={20}
                          className="ms-3 mt-1 cursor-pointer"
                          color="#0d6efd"
                          onClick={() => setShow(true)}
                        />
                      </div>
                      <p>{obj.msg}</p>
                    </div>
                  </div>
                  <div>
                    {obj?.replied?.map((o) => (
                      <div>
                        <div key={`rply${o.id}`} className="d-flex mt-3">
                          <div>
                            <img
                              src={o.user_profile_pic}
                              alt="pic-img"
                              width="40px"
                              height="40px"
                              className="profile-image me-2"
                            />
                          </div>
                          <div>
                            <div className="d-flex comment-profile-data">
                              <p className="fw-bold">{o.user_name}</p>
                              <p className="text-muted ms-2">{`@${o.snapp_user_name}`}</p>
                              <p className="text-muted ms-2">{`.${o.commented_at}`}</p>
                            </div>
                            <p>{o.msg}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
      <AppModal openModal={openModal} handleModelClose={handleModelClose} />
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
        size="m"
      >
        <Modal.Header closeButton>
          <Modal.Title>Reply Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This is the body
          <AppTextArea type={1} />
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" onClick={() => setShow(false)}>
            Close
          </button>
          <button
            className="btn btn-primary ms-3"
            onClick={() => setShow(false)}
          >
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SingleFeed;
