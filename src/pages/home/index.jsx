import { useLocation, useParams } from "react-router-dom";

import React from "react";
import Profile from "../../components/profile";
import Friends from "../../components/Friends";
import Page from "../../components/page";
import HomePage from "../../components/home-page";
import Message from "../../components/message";
import Notification from "../../components/notification";
import Bookmark from "../../components/bookmark";
import Setting from "../../components/setting";
import Explore from "../explore";
import News from "../../components/news";
import Jokes from "../../components/jokes";

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
            case "messages":
              return <Message />;
            case "friends":
              return <Friends />;
            case "notification":
              return <Notification />;
            case "bookmark":
              return <Bookmark />;
            case "profile":
              return <Profile />;
            case "news":
              return <News />;
            case "jokes":
              return <Jokes />;
            case "setting":
              return <Setting />;
            default:
              return "404 - Not Found";
          }
        })()}
      </Page>
    </div>
  );
};

export default Home;
