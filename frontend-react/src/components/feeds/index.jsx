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
  formatDate,
  navigateToProfile,
} from "../../utils/common-function";
import useListToggleContent from "../../custom-hooks/useListToggleContent";
import AppListExpand from "../app-list-expand";
import AppToolTip from "../app-tooltip";
import AppPopover from "../app-popover";
import { MdFeed } from "react-icons/md";

import {
  createBookmark,
  createLike,
  removeBookmark,
  removeLike,
} from "../../services/method";
import { responseMessage } from "../../utils/response-message";
import { useSelector } from "react-redux";
import { Instagram } from "react-content-loader";
import AppNoDataFound from "../app-no-data-found";

const Feeds = ({ feedData, type, isApiExecuted }) => {
  const { id, sec_id } = useParams();
  const [isFavouritifyLoading, setIsFavouritifyLoading] = useState(false);

  const [list, setList] = useState([]);
  const data = useSelector((state) => state.user.data);

  useEffect(() => {
    setList(feedData);
  }, [feedData, id]);
  const { listUniqueId, showLess, showMore } = useListToggleContent();
  const navigate = useNavigate();
  const { page_id } = useParams();

  const feedmetaData = (input, value) => {
    const feedMeta = feedInfo.find((obj) => obj.type === input);
    return (
      <div className="d-flex mb-2">
        {feedMeta.icon}
        <p className="mb-1 text-muted fw-bold">{`${
          feedMeta.value
        } on ${formatDate(value)}`}</p>
      </div>
    );
  };

  const handleUpdateLike = (input, snappId) => {
    return input.map((o) => {
      if (o._id == snappId) {
        return {
          ...o,
          snappLikedUserIds: [
            ...o.snappLikedUserIds,
            { user_id: data.user_id },
          ],
          likes_count: {
            count: !o?.likes_count ? 1 : o.likes_count.count + 1,
          },
        };
      } else {
        return o;
      }
    });
  };

  const handleRemoveLike = (input, snappId) => {
    return input.map((o) => {
      if (o._id == snappId) {
        return {
          ...o,
          snappLikedUserIds: o.snappLikedUserIds.filter(
            ({ user_id }) => user_id != data.user_id
          ),
          likes_count: {
            count: o.likes_count.count - 1,
          },
        };
      } else {
        return o;
      }
    });
  };
  const handleUpdateBookmark = (input, snappId) => {
    return input.map((o) => {
      if (o._id == snappId) {
        return {
          ...o,
          snappBookmarkedUserIds: [
            ...o.snappBookmarkedUserIds,
            { user_id: data.user_id },
          ],
        };
      } else {
        return o;
      }
    });
  };

  const handleRemoveBookmark = (input, snappId) => {
    return input.map((o) => {
      if (o._id == snappId) {
        return {
          ...o,
          snappBookmarkedUserIds: o.snappBookmarkedUserIds.filter(
            ({ user_id }) => user_id != data.user_id
          ),
        };
      } else {
        return o;
      }
    });
  };

  const handleAddFavouritify = async (e, snapp_id, api, favouritifyName) => {
    e.stopPropagation();
    e.preventDefault();
    setIsFavouritifyLoading(true);
    try {
      const response = await api({ snapp_id });
      if (favouritifyName === "like") {
        setList((prev) => handleUpdateLike(prev, snapp_id));
      } else {
        setList((prev) => handleUpdateBookmark(prev, snapp_id));
      }
      responseMessage(response.data.code);
    } catch (err) {
      responseMessage(err.data.code);
      console.log("🚀 ~ file: index.jsx:39 ~ handleLike ~ err:", err);
    } finally {
      setIsFavouritifyLoading(false);
    }
  };

  const handleRemoveFavouritify = async (
    e,
    snapp_id,
    api,
    favouritifyName,
    favouritifyType
  ) => {
    e.stopPropagation();
    e.preventDefault();
    setIsFavouritifyLoading(true);
    try {
      const response = await api(snapp_id);
      if (
        (favouritifyName === "bookmark" && favouritifyType === 3) ||
        (favouritifyName === "like" && favouritifyType === 1)
      ) {
        setList((prev) => prev.filter((xx) => xx._id !== snapp_id));
      }
      if (favouritifyName === "like") {
        setList((prev) => handleRemoveLike(prev, snapp_id));
      } else {
        setList((prev) => handleRemoveBookmark(prev, snapp_id));
      }
      responseMessage(response.data.code);
    } catch (err) {
      responseMessage(err.data.code);
      console.log("🚀 ~ file: index.jsx:39 ~ handleLike ~ err:", err);
    } finally {
      setIsFavouritifyLoading(false);
    }
  };

  return (
    <div>
      {isApiExecuted ? (
        <>
          {feedData && feedData.length > 0 ? (
            <>
              {list &&
                list.map((obj) => (
                  <div key={`fd_data${obj._id}`} className="mb-4">
                    <div
                      className="feed-container rounded cursor-pointer"
                      onClick={() =>
                        navigate(sec_id ? `/profile/${obj._id}` : obj._id)
                      }
                    >
                      {type &&
                        feedmetaData(
                          type,
                          obj[
                            type === 1
                              ? "likes"
                              : type === 2
                              ? "commentData"
                              : "bookmarks"
                          ]?.createdAt
                        )}
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
                                obj.user_id,
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
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                navigateToProfile(
                                  e,
                                  navigate,
                                  obj.user_id,
                                  page_id
                                );
                              }}
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
                              <p className="pb-2">
                                {obj?.commentData?.comment}
                              </p>
                            </div>
                          )}
                          <div className="d-flex justify-content-around mt-2">
                            <div>
                              <AppToolTip
                                title={
                                  isFavouritifyLoading
                                    ? "Loading....."
                                    : obj.snappLikedUserIds?.some(
                                        ({ user_id }) => user_id == data.user_id
                                      )
                                    ? "Liked"
                                    : "like"
                                }
                              >
                                {!obj.snappLikedUserIds?.some(
                                  ({ user_id }) => user_id == data.user_id
                                ) ? (
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
                                        "like",
                                        type
                                      )
                                    }
                                  />
                                )}
                              </AppToolTip>
                              <span className="ms-1">
                                {obj?.likes_count?.count}
                              </span>
                            </div>
                            <div>
                              <AppToolTip title="Comment">
                                <FaRegComment size={20} />
                              </AppToolTip>
                              <span className="ms-1">
                                {obj?.comments_count?.count}
                              </span>
                            </div>
                            <div>
                              <AppToolTip
                                title={
                                  isFavouritifyLoading
                                    ? "Loading...."
                                    : obj.snappBookmarkedUserIds?.some(
                                        ({ user_id }) => user_id == data.user_id
                                      )
                                    ? "Bookmarked"
                                    : "Bookmark"
                                }
                              >
                                {!obj.snappBookmarkedUserIds?.some(
                                  ({ user_id }) => user_id == data.user_id
                                ) ? (
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
                                        "bookmark",
                                        type
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
            </>
          ) : (
            <AppNoDataFound
              icon={<MdFeed size={"130"} />}
              content={"There is no snapps to showcase"}
            />
          )}
        </>
      ) : (
        <Instagram />
      )}
    </div>
  );
};

export default Feeds;
