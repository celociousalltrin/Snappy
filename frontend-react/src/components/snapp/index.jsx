import React, { useState } from "react";
import AppRichTextBox from "../app-rich-text-box";
import { ExampleDocument } from "../app-rich-text-box/utils/example";

import "./style.css";

const Snapp = () => {
  const [document, setDocument] = useState(ExampleDocument);

  return (
    <div className="d-flex row border border-1 rounded pb-2 ms-1 me-1 mb-4 pt-2">
      <AppRichTextBox data={document} onChange={setDocument} />
    </div>
  );
};

export default Snapp;
