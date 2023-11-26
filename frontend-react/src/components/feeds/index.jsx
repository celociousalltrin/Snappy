import React, { useEffect, useState } from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";

import { BiSolidChevronDown, BiSolidChevronUp } from "react-icons/bi";
import { FaBookmark, FaRegBookmark, FaRegComment } from "react-icons/fa";

import { useNavigate, useParams } from "react-router-dom";

import "./style.css";
import { feedInfo } from "../../utils/common-data";
import {
  customTimeAgo,
  displayUserName,
  navigateToProfile,
} from "../../utils/common-function";
import useListToggleContent from "../../custom-hooks/useListToggleContent";
import AppListExpand from "../app-list-expand";
import AppToolTip from "../app-tooltip";
import AppPopover from "../app-popover";
import { EditorMockD } from "../../utils/mock-common";
import {
  createBookmark,
  createLike,
  removeBookmark,
  removeLike,
} from "../../services/method";
import { responseMessage } from "../../utils/response-message";

const Feeds = ({ feedData, type }) => {
  const [snappLikes, setSnappLikes] = useState([]);
  const [snappBookmarks, setSnappBookmarks] = useState([]);

  useEffect(() => {
    setSnappLikes(
      feedData.filter((x) => !!x?.likes).map((o) => o.likes.snapp_id)
    );
    setSnappBookmarks(
      feedData.filter((x) => !!x.bookmarks).map((o) => o.bookmarks.snapp_id)
    );
  }, [feedData]);
  const { listUniqueId, showLess, showMore } = useListToggleContent();
  const navigate = useNavigate();
  const { page_id } = useParams();

  const feedmetaData = (input) => {
    const feedMeta = feedInfo.find((obj) => obj.type === input);
    return (
      <div className="d-flex mb-2">
        {feedMeta.icon}
        <p className="mb-1 text-muted fw-bold">{`${feedMeta.value} on 23 july 2022`}</p>
      </div>
    );
  };

  const handleAddFavouritify = async (e, snapp_id, api, type) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      const response = await api({ snapp_id });
      if (type === "like") {
        setSnappLikes((prev) => [...prev, snapp_id]);
      } else {
        setSnappBookmarks((prev) => [...prev, snapp_id]);
      }
      responseMessage(response.data.code);
    } catch (err) {
      responseMessage(err.data.code);
      console.log("🚀 ~ file: index.jsx:39 ~ handleLike ~ err:", err);
    }
  };

  const handleRemoveFavouritify = async (e, snapp_id, api, type) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      const response = await api(snapp_id);
      if (type === "like") {
        setSnappLikes((prev) => prev.filter((x) => x !== snapp_id));
      } else {
        setSnappBookmarks((prev) => prev.filter((x) => x !== snapp_id));
      }
      responseMessage(response.data.code);
    } catch (err) {
      responseMessage(err.data.code);
      console.log("🚀 ~ file: index.jsx:39 ~ handleLike ~ err:", err);
    }
  };

  return (
    <div>
      {feedData &&
        feedData.map((obj) => (
          <div key={`fd_data${obj._id}`} className="mb-4">
            <div
              className="feed-container rounded cursor-pointer"
              onClick={() => navigate(obj._id)}
            >
              {type && feedmetaData(type)}
              <div className="d-flex">
                <div>
                  <img
                    src={obj.userData.user_image.secure_url}
                    alt="pic-img"
                    width="40px"
                    height="40px"
                    className="feed-profile-image"
                    onClick={(e) =>
                      navigateToProfile(
                        e,
                        navigate,
                        displayUserName(obj.userData.user_name),
                        page_id
                      )
                    }
                  />
                </div>
                <div className="container">
                  <div className="d-flex">
                    {/* <AppPopover type={1}> */}
                    <p
                      className="fw-bold mb-1 profile_name"
                      onClick={(e) =>
                        navigateToProfile(
                          e,
                          navigate,
                          obj.snappy_username,
                          page_id
                        )
                      }
                    >
                      {`${obj.userData.first_name} ${obj.userData.last_name}`}
                    </p>
                    {/* </AppPopover> */}
                    <p className="text-muted ms-1 mb-1 ">
                      {displayUserName(obj.userData.user_name)}
                    </p>
                    <p className="text-muted ms-1 mb-1">{`.${customTimeAgo(
                      obj.createdAt
                    )}`}</p>
                  </div>

                  <div>
                    <p className="mb-2">
                      <AppListExpand
                        content={obj.data}
                        contentId={obj._id}
                        isExpand={listUniqueId.includes(obj._id)}
                        showMore={showMore}
                        showLess={showLess}
                      />
                    </p>
                    {obj?.snapp_image && (
                      <img
                        src={obj?.snapp_image?.secure_url}
                        alt="pic-img"
                        width="100%"
                        height="60%"
                        className="rounded"
                      />
                    )}
                  </div>
                  {type === 2 && (
                    <div
                      style={{ "background-color": "#E5E4E2" }}
                      className="mt-2 rounded p-2 pb-0"
                    >
                      <p className="fw-bold fs-6 mb-0">Comment:</p>
                      <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Dignissimos, nisi.
                      </p>
                    </div>
                  )}
                  <div className="d-flex justify-content-around mt-2">
                    <div>
                      <AppToolTip
                        title={
                          snappLikes.includes(obj._id) ? "remove Like" : "like"
                        }
                      >
                        {!snappLikes.includes(obj._id) ? (
                          <AiOutlineLike
                            size={20}
                            onClick={(e) =>
                              handleAddFavouritify(
                                e,
                                obj._id,
                                createLike,
                                "like"
                              )
                            }
                          />
                        ) : (
                          <AiFillLike
                            size={20}
                            onClick={(e) =>
                              handleRemoveFavouritify(
                                e,
                                obj._id,
                                removeLike,
                                "like"
                              )
                            }
                          />
                        )}
                      </AppToolTip>
                      <span className="ms-1">80</span>
                    </div>
                    <div>
                      <AppToolTip title="Comment">
                        <FaRegComment size={20} />
                      </AppToolTip>
                      <span className="ms-1">27</span>
                    </div>
                    <div>
                      <AppToolTip
                        title={
                          snappBookmarks.includes(obj._id)
                            ? "remove Bookmark"
                            : "Bookmark"
                        }
                      >
                        {!snappBookmarks.includes(obj._id) ? (
                          <FaRegBookmark
                            size={20}
                            onClick={(e) =>
                              handleAddFavouritify(
                                e,
                                obj._id,
                                createBookmark,
                                "bookmark"
                              )
                            }
                          />
                        ) : (
                          <FaBookmark
                            size={20}
                            onClick={(e) =>
                              handleRemoveFavouritify(
                                e,
                                obj._id,
                                removeBookmark,
                                "bookmark"
                              )
                            }
                          />
                        )}
                      </AppToolTip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Feeds;
