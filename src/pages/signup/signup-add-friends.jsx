import React from "react";
import FriendsList from "../../components/friends/friends-list";
import { MockFriendsList } from "../../utils/mock-common";
import "./style.css";

const SignupAddFriends = () => {
  return (
    <div className="text-start mt-3">
      <p className="fs-6 text-muted mt-0">
        When You Send Friend Request to SomeOne. If they accept then you will
        see their snaps in your feeds. You will also receive relevant
        recommendations. Atleast Add one Friend in your Snapp Community.
      </p>

      <FriendsList MockFriendsList={MockFriendsList} isSignup />
    </div>
  );
};

export default SignupAddFriends;
