import React from "react";
import FriendsList from "../friends-list";

import "./style.css";

import { MockFriendsList } from "../../../utils/mock-common";

const FindFriends = () => {
  return (
    <div>
      <FriendsList MockFriendsList={MockFriendsList} isFriendList />
    </div>
  );
};

export default FindFriends;
