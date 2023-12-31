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
        editorElements={["emoji", "link"]}
        progressIcon={{ length: 150, size: 25, width: 3 }}
        placeholder="User Bio"
      />
    </div>
  );
};

export default UserBio;
