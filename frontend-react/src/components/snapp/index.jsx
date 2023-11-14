import React, { useState } from "react";
import AppRichTextBox from "../app-rich-text-box";
import { ExampleDocument } from "../app-rich-text-box/utils/example";
import { editorInitialValidator } from "../app-rich-text-box/utils/editorFunction";
import AppFramerButton from "../app-framer-button";
import customimg from "../../assets/mock-image/1mutual.jpg";

import "./style.css";

const Snapp = () => {
  const [document, setDocument] = useState(ExampleDocument);
  console.log("🚀 ~ file: index.jsx:10 ~ Snapp ~ document:", document);

  return (
    <div className="d-flex row border border-1 rounded pb-2 ms-1 me-1 mb-4">
      <AppRichTextBox
        data={document}
        onChange={setDocument}
        editorElements={[
          "bold",
          "italic",
          "underline",
          "image",
          "emoji",
          "link",
          "mention",
          "hashtag",
        ]}
        isToolbarIcon
        customComponent={<EditorToolbarImageIcon />}
      />
      <div className="d-flex justify-content-end">
        <AppFramerButton>
          <button
            className="btn btn-primary mb-1 cursor-pointer"
            disabled={!editorInitialValidator(document, 5)}
          >
            Snapp
          </button>
        </AppFramerButton>
      </div>
    </div>
  );
};

export const EditorToolbarImageIcon = () => {
  return (
    <img
      src={customimg}
      className="editor-user-profile"
      width="50px"
      height="50px"
    />
  );
};

export default Snapp;
