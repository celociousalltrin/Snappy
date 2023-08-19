import React from "react";
import FriendsList from "../friends/friends-list";
import { MockFriendsList } from "../../utils/mock-common";

const ProfilePopover = () => {
  return (
    <div>
      <FriendsList MockFriendsList={MockFriendsList.slice(0, 1)} />
    </div>
  );
};

export default ProfilePopover;
