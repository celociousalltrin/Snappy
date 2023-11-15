import React, { useEffect, useRef, useState } from "react";
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
import AppComponentPopover from "../../../app-component-popover";
import EditorLink from "../editor-link";
import { toolbarButtons } from "../../utils/editorData";

const RichTextToolbar = ({
  editorElements,
  activeStyles,
  handleApplyStyles,
  editor,
  selectedTextStyle,
  isToolbarIcon,
  toolbarCustomComponent,
}) => {
  const target = useRef(null);
  const [date, setDate] = useState(new Date());
  const [selectedImageDataURL, setSelectedImageDataURL] = useState();

  const [isOpenDialogueBox, setIsOpenDialogueBox] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [showPopover, setShowPopover] = useState(false);

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
      {isToolbarIcon && <div className="col-2">{toolbarCustomComponent}</div>}
      <div className={`editor-toolbar ${isToolbarIcon ? "col-10" : "col-12"}`}>
        {/* <ToolBarDropDown selectedTextStyle={selectedTextStyle} /> */}

        {toolbarButtons
          .filter((x) => editorElements.includes(Object.keys(x)[0]))
          .map((o) => (
            <ToolBarButton
              key={Object.keys(o)[0]}
              icon={Object.values(o)[0]}
              activeStyles={activeStyles}
              showPopover={showPopover}
              setShowPopover={setShowPopover}
              handleApplyStyles={handleApplyStyles}
              target={target}
              onMouseDown={(e) => {
                e.preventDefault();
                handleApplyStyles(Object.keys(o)[0]);
                //This is does because state is updated asynchronously
                if (activeStyles.includes("emoji")) {
                  setShowPicker(false);
                } else if (Object.keys(o)[0] === "emoji") {
                  setShowPicker(true);
                }

                if (activeStyles.includes("link")) {
                  setShowPopover(false);
                } else if (Object.keys(o)[0] === "link") {
                  setShowPopover(true);
                }
              }}
              buttonStyleName={Object.keys(o)[0]}
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
      <AppComponentPopover
        component={
          <EditorLink
            setShowPopover={setShowPopover}
            handleApplyStyles={handleApplyStyles}
          />
        }
        show={showPopover}
        target={target.current}
        isHeader
        title="Add Link"
      />
    </div>
  );
};

export default RichTextToolbar;
