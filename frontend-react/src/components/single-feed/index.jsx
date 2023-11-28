import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegBookmark, FaRegComment, FaReply } from "react-icons/fa";

import commentProfile from "../../assets/mock-image/5mutual.jpg";

import "./style.css";
import AppTextArea from "../app-text-area";
import AppModal from "../app-modal";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  customTimeAgo,
  displayUserName,
  navigateToProfile,
} from "../../utils/common-function";
import AppToolTip from "../app-tooltip";
import AppFramerButton from "../app-framer-button";
import AppPopover from "../app-popover";
import { responseMessage } from "../../utils/response-message";
import {
  createComment,
  getSingleSnapp,
  replyComment,
} from "../../services/method";
import AppListExpand from "../app-list-expand";
import useListToggleContent from "../../custom-hooks/useListToggleContent";
import { Instagram } from "react-content-loader";
import { useSelector } from "react-redux";

const SingleFeed = () => {
  const init = {
    show: false,
    open_type: "",
    snapp_id: "",
  };
  const [singleFeedData, setSingleFeedData] = useState({});
  const { user_image } = useSelector((state) => state.user.data);

  const { listUniqueId, showLess, showMore } = useListToggleContent();

  const [openModal, setOpenModal] = useState(init);
  const [tempComment, setTempComment] = useState("");
  const [tempReplyComment, setTempReplyComment] = useState("");
  const [tempReplyCommentId, setTempReplyCommentId] = useState("");
  const [show, setShow] = useState(false);
  const [isApiExecuted, setApiExecuted] = useState(false);
  const navigate = useNavigate();
  const { page_id, id } = useParams();

  const getData = async (snapp_id) => {
    try {
      const response = await getSingleSnapp(snapp_id);
      setSingleFeedData(response.data.response_data);
    } catch (err) {
      console.log("🚀 ~ file: index.jsx:35 ~ getData ~ err:", err);
    } finally {
      setApiExecuted(true);
    }
  };

  useEffect(() => {
    getData(id);
  }, []);

  const handleModelClose = () => {
    setOpenModal(init);
    setTempReplyComment("");
  };

  const handleAddComment = async (snapp_id) => {
    try {
      const response = await createComment({ snapp_id, comment: tempComment });
      setTempComment("");
      setSingleFeedData((prev) => ({
        ...prev,
        snapp_comments: [...prev.snapp_comments, response.data.response_data],
      }));

      setSingleFeedData((prev) => ({
        ...prev,
        comments_count: {
          ...prev.comments_count,
          count: prev.comments_count?.count
            ? prev.comments_count?.count + 1
            : 0 + 1,
        },
      }));

      responseMessage(response.data.code);
    } catch (err) {
      console.log("🚀 ~ file: index.jsx:35 ~ handleAddComment ~ err:", err);
      responseMessage(err.data.code);
    }
  };

  const handleupdateReplyComment = (input, updatedComment) => {
    return {
      ...input,
      snapp_comments: input.snapp_comments.map((o) => {
        if (o._id === updatedComment._id) {
          return {
            ...o,
            reply_comments: updatedComment.reply_comments,
            reply_userData: updatedComment.reply_userData,
          };
        } else {
          return o;
        }
      }),
    };
  };

  const handleReplyComment = async (cmnt_id) => {
    try {
      const response = await replyComment({
        _id: cmnt_id,
        reply_comment: tempReplyComment,
      });

      setShow(false);
      setSingleFeedData((prev) =>
        handleupdateReplyComment(prev, response.data.response_data)
      );
      setTempReplyComment("");
      setTempReplyCommentId();
      responseMessage(response.data.code);
    } catch (err) {
      console.log(
        "🚀 ~ file: index.jsx:51 ~ comnsthandleReplyComment= ~ err:",
        err
      );
      responseMessage(err.data.code);
    }
  };

  return (
    <>
      {isApiExecuted ? (
        <>
          {Object.keys(singleFeedData).length > 0 && (
            <div>
              {
                <div key={`s_fd_data${singleFeedData._id}`} className="mb-4">
                  <div className="d-flex single-feed-container p-2 pb-0">
                    <img
                      src={singleFeedData.userData.user_image.secure_url}
                      alt="pic-img"
                      width="40px"
                      height="40px"
                      className="profile-image me-2 cursor-pointer"
                      onClick={(e) =>
                        navigateToProfile(
                          e,
                          navigate,
                          singleFeedData.user_id,
                          page_id
                        )
                      }
                    />
                    <div>
                      <p
                        className="fw-bold mb-0 cursor-pointer profile__name"
                        onClick={(e) =>
                          navigateToProfile(
                            e,
                            navigate,
                            singleFeedData.user_id,
                            page_id
                          )
                        }
                      >
                        {`${singleFeedData.userData.first_name} ${singleFeedData.userData.last_name}`}
                      </p>
                      <p className="text-muted">
                        {displayUserName(singleFeedData.userData.user_name)}
                      </p>
                    </div>
                  </div>
                  <div className="container">
                    <div className="border-bottom">
                      <p className="mb-2">
                        {" "}
                        <AppListExpand
                          content={singleFeedData.data}
                          contentId={singleFeedData._id}
                          isExpand={listUniqueId.includes(singleFeedData._id)}
                          showMore={showMore}
                          showLess={showLess}
                        />
                      </p>
                      {singleFeedData?.snapp_image && (
                        <img
                          src={singleFeedData.snapp_image.secure_url}
                          alt="pic-img"
                          width="100%"
                          height="60%"
                          className="rounded"
                        />
                      )}
                      <p className="mt-3 text-muted">
                        {customTimeAgo(singleFeedData.createdAt)}
                      </p>
                    </div>
                    <div className="d-flex snapp-feed-data border-bottom mt-3">
                      <p>
                        {singleFeedData.likes_count?.count}
                        <span
                          onClick={() =>
                            setOpenModal({
                              show: true,
                              open_type: 1,
                              snapp_id: singleFeedData._id,
                            })
                          }
                        >
                          Likes
                        </span>
                      </p>

                      <p>
                        {singleFeedData.comments_count?.count}
                        <span
                          onClick={() =>
                            setOpenModal({
                              show: true,
                              open_type: 2,
                              snapp_id: singleFeedData._id,
                            })
                          }
                        >
                          Comments
                        </span>
                      </p>
                      <p>
                        {singleFeedData.bookmarks_count?.count}
                        <span
                          onClick={() =>
                            setOpenModal({
                              show: true,
                              open_type: 3,
                              snapp_id: singleFeedData._id,
                            })
                          }
                        >
                          Bookmarks
                        </span>
                      </p>
                    </div>
                    <div className="d-flex justify-content-around mt-3 pb-3 border-bottom">
                      <div>
                        <AppToolTip title="like">
                          <AiOutlineLike size={20} className="cursor-pointer" />
                        </AppToolTip>
                        <span>{singleFeedData.likes_count?.count}</span>
                      </div>
                      <div>
                        <AppToolTip title="Comment">
                          <FaRegComment size={20} className="cursor-pointer" />{" "}
                        </AppToolTip>
                        <span>{singleFeedData.comments_count?.count}</span>
                      </div>
                      <div>
                        <AppToolTip title="Bookmark">
                          <FaRegBookmark size={20} className="cursor-pointer" />
                        </AppToolTip>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="d-flex">
                        <img
                          src={user_image.secure_url}
                          alt="comment-profile"
                          width="40px"
                          height="40px"
                          className="profile-image me-2"
                        />
                        <AppTextArea
                          placeholder="Add Your Comment"
                          rows="1"
                          cols="80"
                          cb={(value) => setTempComment(value)}
                          value={tempComment}
                        />
                      </div>
                      <div className="d-flex justify-content-end mt-2 border-bottom pb-3">
                        <AppFramerButton>
                          <button
                            className="btn btn-sm me-1 btn-primary rounded"
                            onClick={() => handleAddComment(id)}
                            disabled={tempComment.length > 10 ? false : true}
                          >
                            Add Comment
                          </button>
                        </AppFramerButton>
                      </div>
                    </div>
                    <div className="mt-2">
                      {singleFeedData.snapp_comments.map((obj) => (
                        <div
                          key={`cmnt${obj._id}`}
                          className="border-bottom mt-2 pb-3"
                        >
                          <div className="d-flex">
                            <div>
                              <img
                                src={obj.userData.user_image.secure_url}
                                alt="pic-img"
                                width="40px"
                                height="40px"
                                className="profile-image me-2"
                              />
                            </div>
                            <div>
                              <div className="d-flex comment-profile-data">
                                {/* <AppPopover type={1}> */}
                                <p
                                  className="fw-bold mb-0 user-name-style"
                                  onClick={(e) =>
                                    navigateToProfile(
                                      e,
                                      navigate,
                                      obj.user_id,
                                      page_id
                                    )
                                  }
                                >
                                  {`${obj.userData.first_name} ${obj.userData.last_name}`}
                                </p>
                                {/* </AppPopover> */}
                                <p className="text-muted ms-2">
                                  {displayUserName(obj.userData.user_name)}
                                </p>
                                <p className="text-muted ms-2">{`.${customTimeAgo(
                                  obj.createdAt
                                )}`}</p>
                                <AppToolTip title="Reply">
                                  <FaReply
                                    size={20}
                                    className="ms-3 mt-1 cursor-pointer"
                                    color="#0d6efd"
                                    onClick={() => {
                                      setShow(true);
                                      setTempReplyCommentId(obj._id);
                                    }}
                                  />
                                </AppToolTip>
                              </div>
                              <p>{obj.comment}</p>
                            </div>
                          </div>
                          <div>
                            {obj?.reply_comments?.length > 0 &&
                              obj.reply_comments.map((o) => {
                                const replyUser = obj.reply_userData.find(
                                  (xx) => xx._id === o.reply_user_id
                                );
                                return (
                                  <div>
                                    <div
                                      key={`rply${o._id}`}
                                      className="d-flex mt-3"
                                    >
                                      <div>
                                        <img
                                          src={replyUser.user_image.secure_url}
                                          alt="pic-img"
                                          width="40px"
                                          height="40px"
                                          className="profile-image me-2"
                                        />
                                      </div>
                                      <div>
                                        <div className="d-flex comment-profile-data">
                                          {/* <AppPopover type={1}> */}
                                          <p
                                            className="fw-bold mb-0 user-name-style"
                                            onClick={(e) =>
                                              navigateToProfile(
                                                e,
                                                navigate,
                                                displayUserName(
                                                  replyUser.user_name
                                                ),
                                                page_id
                                              )
                                            }
                                          >
                                            {`${replyUser.first_name} ${replyUser.last_name}`}
                                          </p>
                                          {/* </AppPopover> */}
                                          <p className="text-muted ms-2">
                                            {displayUserName(
                                              replyUser.user_name
                                            )}
                                          </p>
                                          <p className="text-muted ms-2">{`.${customTimeAgo(
                                            o.replied_at
                                          )}`}</p>
                                        </div>
                                        <p>{o.reply_comment}</p>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              }
              <AppModal
                openModal={openModal}
                handleModelClose={handleModelClose}
              />
              <Modal
                show={show}
                onHide={() => {
                  setShow(false);
                  setTempReplyComment("");
                  setTempReplyCommentId();
                }}
                backdrop="static"
                keyboard={false}
                size="m"
              >
                <Modal.Header closeButton>
                  <Modal.Title>Reply Comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <AppTextArea
                    type={1}
                    rows={2}
                    cb={(value) => setTempReplyComment(value)}
                    value={tempReplyComment}
                  />
                </Modal.Body>
                <Modal.Footer>
                  <button
                    className="btn btn-danger btn-sm"
                    type="button"
                    onClick={() => {
                      setShow(false);
                      setTempReplyComment("");
                      setTempReplyCommentId();
                    }}
                  >
                    Close
                  </button>
                  <button
                    className="btn btn-primary ms-3 btn-sm"
                    type="button"
                    onClick={() => handleReplyComment(tempReplyCommentId)}
                  >
                    Reply Comment
                  </button>
                </Modal.Footer>
              </Modal>
            </div>
          )}
        </>
      ) : (
        <Instagram />
      )}
    </>
  );
};

export default SingleFeed;
