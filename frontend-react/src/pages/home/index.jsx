import React from "react";
import { useParams } from "react-router-dom";

import Profile from "../../components/profile";
import Connectors from "../../components/connectors";
import Page from "../../components/page";
import HomePage from "../../components/home-page";
import Message from "../../components/message";
import Notification from "../../components/notification";
import Bookmark from "../../components/bookmark";
import Setting from "../../components/setting";
import Explore from "../explore";
import Jokes from "../../components/jokes";
import Facts from "../../components/facts";
import SandBox from "../../custom-sandbox";
import Logout from "../../components/logout";

const Home = () => {
  const { page_id } = useParams();
  return (
    <div>
      <Page>
        {(() => {
          switch (page_id) {
            case "home":
              return <HomePage />;
            case "explore":
              return <Explore />;
            // case "messages":
            //   return <Message />;
            case "connectors":
              return <Connectors />;
            case "notification":
              return <Notification />;
            case "bookmark":
              return <Bookmark />;
            case "profile":
              return <Profile />;
            case "facts":
              return <Facts />;
            case "jokes":
              return <Jokes />;
            case "setting":
              return <Setting />;
            case "sandbox":
              return <SandBox />;
            case "logout":
              return <Logout />;
            default:
              return "404 - Not Found";
          }
        })()}
      </Page>
    </div>
  );
};

export default Home;
