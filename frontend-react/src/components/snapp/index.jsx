import React, { useState } from "react";
import { useSelector } from "react-redux";

import { responseMessage } from "../../utils/response-message";
import { editorInitialValue } from "../app-rich-text-box/utils/editorData";

import AppRichTextBox from "../app-rich-text-box";

import "./style.css";
import { createSnapp } from "../../services/method";

const Snapp = () => {
  const [document, setDocument] = useState(editorInitialValue);

  const handleSnapp = async () => {
    try {
      const response = await createSnapp(document);
      responseMessage(response.data.code);
    } catch (err) {
      responseMessage(err.data.code, err.status === 403 && 7000);
      console.log("🚀 ~ file: index.jsx:16 ~ handlePost ~ err:", err);
    }
  };

  return (
    <div className="d-flex row border border-1 rounded pb-2 ms-1 me-1 mb-4">
      <AppRichTextBox
        data={document}
        onChange={setDocument}
        postDataName="Snapp"
        editorElements={[
          "bold",
          "italic",
          "underline",
          "image",
          "emoji",
          "link",
          "mention",
        ]}
        isToolbarIcon
        toolbarCustomComponent={<EditorToolbarImageIcon />}
        isValidator
        validatorIcons={[{ name: "image", length: 1 }]}
        progressIcon={{ length: 250, size: 25, width: 3 }}
        handlePostData={handleSnapp}
        placeholder="Share your snapps. Use @ to mention other snappers"
      />
    </div>
  );
};

export const EditorToolbarImageIcon = () => {
  const { user_image } = useSelector((state) => state.user.data);
  return (
    <img
      src={user_image?.secure_url}
      className="editor-user-profile"
      width="50px"
      height="50px"
    />
  );
};

export default Snapp;
