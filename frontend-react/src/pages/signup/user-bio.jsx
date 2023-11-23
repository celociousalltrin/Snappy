import React, { useState } from "react";
import AppRichTextBox from "../../components/app-rich-text-box";

const UserBio = ({ data: { about }, setFieldValue }) => {
  return (
    <div>
      <p className="text-muted mb-3">
        What makes you special? Don't think too hard, just have fun with it
      </p>

      <AppRichTextBox
        data={about}
        onChange={(data) => setFieldValue("about", data)}
        postDataName="Snapp"
        editorElements={["emoji", "link", "hashtag"]}
        progressIcon={{ length: 280, size: 25, width: 3 }}
      />
    </div>
  );
};

export default UserBio;
