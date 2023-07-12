import React from "react";

import "./style.css";

const FriendsList = ({ MockFriendsList }) => {
  return (
    <div>
      {MockFriendsList.map((obj) => (
        <div className="d-flex row friends-list-container" key={obj.id}>
          <div className="col-md-1">
            <img
              src={obj.profile_img}
              alt="profile_image"
              width="50px"
              height="50px"
              className="friends_profile--img "
            />
          </div>
          <div className="col-md-10 ms-4">
            <div className="d-flex justify-content-between mt-2">
              <div>
                <p className="fw-bold mb-0">{obj.name}</p>
                <p className="text-muted mb-0"> {`@${obj.snappy_username}`}</p>
              </div>
              <div className="d-flex align-items-center">
                <button className="btn btn-sm btn-primary">Add friend</button>
              </div>
            </div>
            <p>{obj.bio}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FriendsList;
