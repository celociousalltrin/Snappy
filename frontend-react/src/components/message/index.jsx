import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Chat from "./chat";
import SelectConnectors from "./select-Connectors";

import "./style.css";

const Message = () => {
  return (
    <div>
      <Tabs
        defaultActiveKey="message-chat"
        justify="true"
        variant="underline"
        className="message-container mb-2"
      >
        <Tab eventKey="message-chat" title="Chats">
          <Chat />
        </Tab>
        <Tab eventKey="message-select-connectors" title="Select Connectors">
          <SelectConnectors />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Message;
