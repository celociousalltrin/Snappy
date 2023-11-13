import React, { useEffect, useState } from "react";
import { getIconForButton } from "../../utils/editorFunction";
import { useSlateStatic } from "slate-react";

import "./style.css";
import ToolBarButton from "./toolbar-components/button";
import ToolBarDropDown from "./toolbar-components/drop-down";
import { Element, Transforms } from "slate";
import { TbCameraPlus } from "react-icons/tb";
import AppImageDialogueBox from "../../../app-image-Dialogue-box";
import { convertFileToDataURL } from "../../../../utils/common-function";

const CHARACTER_STYLES = [
  "bold",
  "italic",
  "underline",
  "code",
  "keyboard",
  "codeOutput",
  "fontSize",
  "fontColor",
];

const Toolbar = ({
  activeStyles,
  handleApplyStyles,
  editor,
  selectedTextStyle,
}) => {
  const [date, setDate] = useState(new Date());
  const [selectedImageDataURL, setSelectedImageDataURL] = useState();

  const [isOpenDialogueBox, setIsOpenDialogueBox] = useState(false);
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

  return (
    <div>
      {" "}
      <div className="toolbar">
        <ToolBarDropDown selectedTextStyle={selectedTextStyle} />
        {CHARACTER_STYLES.map((style) => (
          <ToolBarButton
            key={style}
            icon={<i className={`bi ${getIconForButton(style)}`} />}
            activeStyles={activeStyles}
            onMouseDown={(e) => {
              e.preventDefault();
              handleApplyStyles(style);
            }}
            buttonStyleName={style}
          />
        ))}
        <div>
          <label htmlFor="fileInput">
            <TbCameraPlus size={50} />
          </label>
          <input
            type="file"
            id="fileInput"
            key={date}
            style={{ display: "none" }}
            onChange={handleFileChange}
            name="myFile"
          />
        </div>
      </div>
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

export default Toolbar;
