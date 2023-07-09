import React from "react";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegBookmark, FaRegComment } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import "./style.css";

const Feeds = ({ feedData }) => {
  const navigate = useNavigate();
  return (
    <div>
      {feedData.map((obj) => (
        <div key={`fd_data${obj.id}`} className="mb-4">
          <div
            className="d-flex feed-container rounded cursor-pointer"
            onClick={() => navigate("single-feed")}
          >
            <div>
              <img
                src={obj.profile_img}
                alt="pic-img"
                width="40px"
                height="40px"
                className="feed-profile-image"
              />
            </div>
            <div className="container">
              <div className="d-flex">
                <p className="fw-bold mb-1">{obj.name}</p>
                <p className="text-muted ms-1 mb-1">{`@${obj.snappy_username}`}</p>
                <p className="text-muted ms-1 mb-1">{`.${obj.snapped_at}`}</p>
              </div>

              <div>
                <p className="mb-2">{obj.snapp.message}</p>
                <img
                  src={obj.snapp.image}
                  alt="pic-img"
                  width="100%"
                  height="60%"
                  className="rounded"
                />
              </div>
              <div className="d-flex justify-content-around mt-2">
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
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feeds;
