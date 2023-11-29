import React, { useState, useEffect } from "react";

import { Transforms } from "slate";
import { ReactEditor, useSlateStatic } from "slate-react";
import { AiFillCloseCircle, AiFillEye } from "react-icons/ai";

import AppImageDialogueBox from "../../../app-image-Dialogue-box";

import "./style.css";

const EditorImage = ({ attributes, children, element }) => {
  const [selectedImageDataURL, setSelectedImageDataURL] = useState();
  const [isOpenDialogueBox, setIsOpenDialogueBox] = useState(false);
  const [imgUrl, setImgUrl] = useState("");

  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);

  useEffect(() => {
    if (imgUrl) {
      Transforms.removeNodes(editor, { at: path });
      Transforms.insertNodes(
        editor,
        {
          type: "image",
          url: imgUrl,
          children: [{ text: "" }],
        },
        { at: editor.selection }
      );
      setImgUrl("");
    }
  }, [imgUrl, editor]);

  // const moveBlock = (fromIndex, toIndex) => {
  //   const [nodeToMove] = Editor.nodes(editor, {
  //     at: [],
  //     match: (node, path) => path[0] === fromIndex,
  //   });

  //   if (nodeToMove) {
  //     const [node, path] = nodeToMove;
  //     Transforms.moveNodes(editor, { at: path, to: [toIndex] });
  //   }
  // };

  const handleDeleteImage = (e) => {
    e.preventDefault();
    Transforms.removeNodes(editor, { at: path });
  };

  const handleOpenEditorImage = (e, url) => {
    e.preventDefault();
    setSelectedImageDataURL(url);
    setIsOpenDialogueBox(true);
  };
  return (
    <>
      <div contentEditable={false} {...attributes}>
        <div className="m-2">
          {/* <button
          className="btn btn-primary ms-2"
          onClick={() => {
            moveBlock(path1[0], path1[0] - 1);
          }}
        >
          up
        </button>
        <button
          className="btn btn-success ms-2 me-2"
          onClick={() => {
            moveBlock(path1[0], path1[0] + 1);
          }}
        >
          down
        </button> */}
          <div className="editor-imgage-container">
            <img
              src={String(element.url)}
              alt={element.caption}
              className="editor-image"
            />
            <AiFillCloseCircle
              size={20}
              className="editor-image-close-button cursor-pointer"
              onClick={handleDeleteImage}
            />

            <AiFillEye
              size={27}
              className="editor-image-view-button cursor-pointer"
              onClick={(e) => handleOpenEditorImage(e, element.url)}
            />
          </div>
        </div>
        {children}
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
    </>
  );
};

export default EditorImage;
