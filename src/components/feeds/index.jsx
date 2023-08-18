import React, { useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { BiSolidChevronDown, BiSolidChevronUp } from "react-icons/bi";
import { FaBookmark, FaRegBookmark, FaRegComment } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

import "./style.css";
import { feedInfo } from "../../utils/common-data";
import {
  navigateToProfile,
  sliceContent,
  isToggleContent,
} from "../../utils/common-function";
import useListToggleContent from "../../custom-hooks/useListToggleContent";
import AppListExpand from "../app-list-expand";
import AppToolTip from "../app-tooltip";

const Feeds = ({ feedData, type }) => {
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

  return (
    <div>
      {feedData.map((obj) => (
        <div key={`fd_data${obj.id}`} className="mb-4">
          <div
            className="feed-container rounded cursor-pointer"
            onClick={() => navigate("single-feed")}
          >
            {type && feedmetaData(type)}
            <div className="d-flex">
              <div>
                <img
                  src={obj.profile_img}
                  alt="pic-img"
                  width="40px"
                  height="40px"
                  className="feed-profile-image"
                  onClick={(e) =>
                    navigateToProfile(e, navigate, obj.snappy_username, page_id)
                  }
                />
              </div>
              <div className="container">
                <div className="d-flex">
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
                    {obj.name}
                  </p>
                  <p className="text-muted ms-1 mb-1 ">{`@${obj.snappy_username}`}</p>
                  <p className="text-muted ms-1 mb-1">{`.${obj.snapped_at}`}</p>
                </div>

                <div>
                  <p className="mb-2">
                    <AppListExpand
                      content={obj.snapp.message}
                      contentId={obj.id}
                      isExpand={listUniqueId.includes(obj.id)}
                      showMore={showMore}
                      showLess={showLess}
                    />
                  </p>
                  <img
                    src={obj.snapp.image}
                    alt="pic-img"
                    width="100%"
                    height="60%"
                    className="rounded"
                  />
                </div>
                {type === 2 && (
                  <div
                    style={{ "background-color": "#E5E4E2" }}
                    className="mt-2 rounded p-2 pb-0"
                  >
                    <p className="fw-bold fs-6 mb-0">Comment:</p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Dignissimos, nisi.
                    </p>
                  </div>
                )}
                <div className="d-flex justify-content-around mt-2">
                  <AppToolTip title="Like">
                    <div>
                      <AiOutlineLike size={20} /> <span>80</span>
                    </div>
                  </AppToolTip>

                  <AppToolTip title="Comment">
                    <div>
                      <FaRegComment size={20} /> <span>27</span>
                    </div>
                  </AppToolTip>
                  <AppToolTip title="BookMark">
                    <div>
                      <FaRegBookmark size={20} />
                    </div>
                  </AppToolTip>
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
