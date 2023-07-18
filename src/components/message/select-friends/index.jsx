import React from "react";
import FriendsList from "../../friends/friends-list";
import { MockFriendsList } from "../../../utils/mock-common";

import "./style.css";

const SelectFriends = () => {
  return (
    <div>
      <FriendsList MockFriendsList={MockFriendsList} isMessage />
    </div>
  );
};

export default SelectFriends;
