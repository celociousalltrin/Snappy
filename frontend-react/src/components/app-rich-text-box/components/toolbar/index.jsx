import React, { useEffect, useState } from "react";
import { editorCustomNode, getIconForButton } from "../../utils/editorFunction";
import { useSlateStatic } from "slate-react";

import customimg from "../../../../assets/mock-image/1mutual.jpg";
import "./style.css";
import ToolBarButton from "./toolbar-components/button";
import ToolBarDropDown from "./toolbar-components/drop-down";
import { Element, Transforms } from "slate";
import AppImageDialogueBox from "../../../app-image-Dialogue-box";
import { convertFileToDataURL } from "../../../../utils/common-function";
import Picker from "emoji-picker-react";

const CHARACTER_STYLES = ["bold", "italic", "underline", "image", "emoji"];

const RichTextToolbar = ({
  activeStyles,
  handleApplyStyles,
  editor,
  selectedTextStyle,
}) => {
  const [date, setDate] = useState(new Date());
  const [selectedImageDataURL, setSelectedImageDataURL] = useState();

  const [isOpenDialogueBox, setIsOpenDialogueBox] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [imgUrl, setImgUrl] = useState("");

  const handleImageUpload = (img) => {
    Transforms.insertNodes(
      editor,
      {
        type: "image",
        url: img,
        children: [{ text: "" }],
      },
      { at: editor.selection }
    );
    Transforms.move(editor);
  };

  useEffect(() => {
    if (imgUrl) {
      handleImageUpload(imgUrl);
    }
  }, [imgUrl]);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setDate(new Date());

    if (selectedFile) {
      // We can Create Like this but it does not support on every browser
      // const imageURL = URL.createObjectURL(selectedFile);
      const imageURL = await convertFileToDataURL(selectedFile);
      setSelectedImageDataURL(imageURL);
      setIsOpenDialogueBox(true);
    }
  };

  const handleSelectEmoji = (data) => {
    if (editor.selection) {
      Transforms.select(editor, editor.selection);
      Transforms.insertNodes(editor, {
        type: "emoji",
        character: data.emoji,
        children: [{ text: "" }],
      });
      Transforms.move(editor);
      setShowPicker(false);
    }
  };

  return (
    <div className="row mb-1">
      <div className="col-3">
        <img
          src={customimg}
          className="editor-user-profile"
          width="50px"
          height="50px"
        />
      </div>
      <div className="editor-toolbar col-9">
        {/* <ToolBarDropDown selectedTextStyle={selectedTextStyle} /> */}
        {CHARACTER_STYLES.map((style) => (
          <ToolBarButton
            key={style}
            icon={getIconForButton(style)}
            activeStyles={activeStyles}
            onMouseDown={(e) => {
              e.preventDefault();
              handleApplyStyles(style);
              //This is does because state is updated asynchronously
              if (activeStyles.includes("emoji")) {
                setShowPicker(false);
              } else if (style === "emoji") {
                setShowPicker(true);
              }
            }}
            buttonStyleName={style}
          />
        ))}
        <div>
          <input
            type="file"
            id="editor-image-upload"
            key={date}
            style={{ display: "none" }}
            onChange={handleFileChange}
            name="myFile"
          />
        </div>
      </div>
      {showPicker && (
        <Picker
          pickerStyle={{ width: "100%" }}
          onEmojiClick={handleSelectEmoji}
        />
      )}
      <AppImageDialogueBox
        show={isOpenDialogueBox}
        setShow={setIsOpenDialogueBox}
        setSelectedImageDataURL={setSelectedImageDataURL}
        selectedImageDataURL={selectedImageDataURL}
        callback={(url) => {
          setImgUrl(url);
        }}
      />
    </div>
  );
};

export default RichTextToolbar;
