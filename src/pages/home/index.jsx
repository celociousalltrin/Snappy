import { useLocation, useParams } from "react-router-dom";

import React from "react";
import Profile from "../../components/profile";
import Friends from "../../components/Friends";
import Page from "../../components/page";

const Home = () => {
  const { page_id } = useParams();
  return (
    <div>
      <Page>
        {(() => {
          switch (page_id) {
            case "profile":
              return <Profile />;
            case "friends":
              return <Friends />;
            default:
              return "404 - Not Found";
          }
        })()}
      </Page>
    </div>
  );
};

export default Home;
