import React from "react";
import { feedData } from "../../utils/mock-common";

import "./style.css";

const Feeds = () => {
  return (
    <div>
      {feedData.map((obj) => (
        <div key={`fd_data${obj.id}`} className="mb-4">
          <div className="d-flex feed-container">
            <div>
              <img
                src={obj.profile_img}
                placeholder="pic img"
                width="50px"
                height="50px"
                className="feed-profile-image"
              />
            </div>
            <div className="container">
              <div className="d-flex">
                <p className="fw-bold">{obj.name}</p>
                <p className="text-muted ms-1">{`@${obj.snappy_username}`}</p>
                <p className="text-muted ms-1">{`.${obj.snapped_at}`}</p>
              </div>

              <div>
                <p>{obj.snapp.message}</p>
                <img
                  src={obj.snapp.image}
                  placeholder="pic img"
                  width="27px"
                  height="30px"
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
