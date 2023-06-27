import React from "react";
import PageHeader from "../page-header";
import Header from "../header";
import SideBar from "../sidebar";
import { useParams } from "react-router-dom";
import DiscoverPanel from "../discover-panel";

const Page = ({ children }) => {
  const { page_id } = useParams();
  return (
    <div>
      <Header />
      <div className="row mt-4">
        <div className="col-md-3 ps-5">
          <SideBar />
        </div>
        <div className="col-md-5">
          <PageHeader id={page_id} title={children?.type?.name} />
          <div>{children}</div>
        </div>
        <div className="col-md-4">
          <DiscoverPanel />
        </div>
      </div>
    </div>
  );
};

export default Page;
