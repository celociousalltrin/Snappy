import React, { useState } from "react";
import AppRichTextBox from "../app-rich-text-box";

import customimg from "../../assets/mock-image/1mutual.jpg";

import "./style.css";
import { editorInitialValue } from "../app-rich-text-box/utils/editorData";

const Snapp = () => {
  const [document, setDocument] = useState(editorInitialValue);

  return (
    <div className="d-flex row border border-1 rounded pb-2 ms-1 me-1 mb-4">
      <AppRichTextBox
        data={document}
        onChange={setDocument}
        generateTextname="Snapp"
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
        toolbarCustomComponent={<EditorToolbarImageIcon />}
        isValidator
        validatorIcons={[{ name: "image", length: 1 }]}
        progressIcon={{ length: 300, size: 25, width: 3 }}
      />
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
