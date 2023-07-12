import React from "react";
import "./style.css";
import FriendsList from "../friends-list";
import { MockFriendsList } from "../../../utils/mock-common";

const MutualFriends = () => {
  return (
    <div>
      <FriendsList MockFriendsList={MockFriendsList} />
    </div>
  );
};

export default MutualFriends;
