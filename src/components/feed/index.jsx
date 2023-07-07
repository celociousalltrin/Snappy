import React from "react";
import { feedData } from "../../utils/mock-common";

import "./style.css";

const Feeds = () => {
  return (
    <div>
      {feedData.map((obj) => (
        <div key={`fd_data${obj.id}`} className="mb-4">
          <div className="d-flex feed-container rounded">
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
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feeds;
