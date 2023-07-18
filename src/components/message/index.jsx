import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Chat from "./chat";
import SelectFriends from "./select-friends";

import "./style.css";

const Message = () => {
  return (
    <div>
      <Tabs
        defaultActiveKey="message-chat"
        justify="true"
        variant="underline"
        className="message-container mb-4"
      >
        <Tab eventKey="message-chat" title="Chats">
          <Chat />
        </Tab>
        <Tab eventKey="message-select-friend" title="Select Friends">
          <SelectFriends />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Message;
