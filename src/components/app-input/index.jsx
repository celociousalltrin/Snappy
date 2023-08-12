import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { RiSendPlane2Fill } from "react-icons/ri";

import "./style.css";

const AppInput = ({ isFriend, isSendMessage }) => {
  const [searchText, setSearchText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      alert(`${searchText} is the search word`);
      setSearchText("");
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <div
      className={isFriend ? "ms-3 row" : isSendMessage && "position-relative"}
    >
      <div
        className={`${
          isFocused ? "discover-search__focused" : "discover_container"
        } ${isFriend && "col-8"}`}
      >
        {!isSendMessage && <span>{<FaSearch />}</span>}
        <input
          type="text"
          placeholder={
            isFriend
              ? "Search Friend"
              : isSendMessage
              ? "Send Message"
              : "Search"
          }
          onKeyDown={handleKeyDown}
          name="search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={!isFocused && isSendMessage && "ms-3"}
          style={{ width: isSendMessage ? "91%" : "" }}
        />
      </div>
      {isFriend && (
        <div className="col-2 d-flex align-self-center ms-1">
          <button className="btn btn-outline-secondary">Search</button>
        </div>
      )}
      {isSendMessage && (
        <div className={isFocused ? "msg-send-icon__focused" : "msg-send-icon"}>
          <RiSendPlane2Fill size={18} />
        </div>
      )}
    </div>
  );
};

export default AppInput;
