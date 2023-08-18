import React from "react";
import "./style.css";

//! Mock Data
import { MockFriendsList } from "../../../utils/mock-common";
import { useNavigate } from "react-router-dom";
import FriendsList from "../../friends/friends-list";

const MutualFriends = () => {
  const navigate = useNavigate();
  return (
    <div className="discover_container mt-5">
      <h4 className="text-center pt-4 mb-3">Mutual Friends</h4>
      <FriendsList
        MockFriendsList={MockFriendsList}
        isDiscoverFriend
        length={4}
      />
      <div className="pt-2 pb-1">
        <p
          className="text-primary text-center cursor-pointer"
          onClick={() => {
            navigate("/friends");
            window.scrollTo(0, 0);
          }}
        >
          show more
        </p>
      </div>
    </div>
  );
};

export default MutualFriends;
