import React, { useEffect } from "react";
import FriendsList from "../../components/friends/friends-list";
import { MockFriendsList } from "../../utils/mock-common";
import "./style.css";
import { AiOutlineDownCircle, AiOutlineUpCircle } from "react-icons/ai";
import useToggleContent from "../../custom-hooks/useToggleContent";

const SignupAddFriends = () => {
  const { isShow, showMore, showLess } = useToggleContent();

  return (
    <div className="text-start position-relative">
      <p
        className={`fs-6 text-muted mt-0 ms-3 ${
          !isShow && "signup-content-expand"
        }`}
      >
        When You Send Friend Request to SomeOne. If they accept then you will
        see their snaps in your feeds. You will also receive relevant
        recommendations. Atleast Add one Friend in your Snapp Community.
        <span className="d-md-none" onClick={showLess}>
          <AiOutlineUpCircle size={23} color="rgb(13, 110, 253)" />
        </span>
      </p>
      {!isShow && (
        <span className="content-expand-icon d-md-none" onClick={showMore}>
          <AiOutlineDownCircle size={23} />
        </span>
      )}

      <FriendsList MockFriendsList={MockFriendsList} isSignup />
    </div>
  );
};

export default SignupAddFriends;
