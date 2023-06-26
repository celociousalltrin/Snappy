import React from "react";
import Navbar from "../navbar";
import PageHeader from "../page-header";
import { useParams } from "react-router-dom";

const Page = ({ children }) => {
  const { page_id } = useParams();
  return (
    <div>
      <Navbar />
      <PageHeader id={page_id} title={children?.type?.name} />
      <div>{children}</div>
    </div>
  );
};

export default Page;
