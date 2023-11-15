import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Editable, Slate, withReact } from "slate-react";
import { createEditor } from "slate";
import { withHistory } from "slate-history";

import useEditorConfig from "./hooks/useEditorConfig";

import {
  editorBlockElemntsvalidate,
  editorCustomNode,
  editorInitialValidator,
  editorTextlength,
  toggleStyle,
} from "./utils/editorFunction";
import {
  editorDialogueToolbarButtons,
  editorValidatorIcons,
} from "./utils/editorData";
import { useEditorToolbarActive } from "./hooks/useEditorToolbarActive";
import useEditorSelection from "./hooks/useEditorSelection";
import EditorPopover from "./components/editor-popover";
import { createPortal } from "react-dom";
import { useEditorMention } from "./hooks/useEditorMention";

import "./style.css";

import RichTextToolbar from "./components/toolbar";
import { useNavigate } from "react-router-dom";
import AppFramerButton from "../app-framer-button";
import EditorProgressIcon from "./components/editor-progress-icon";

const AppRichTextBox = ({
  data,
  onChange,
  generateTextname,
  editorElements,
  isToolbarIcon,
  toolbarCustomComponent,
  isValidator,
  validatorIcons,
}) => {
  console.log("🚀 ~ file: index.jsx:36 ~ data:", data);
  const editor = useMemo(() => withReact(withHistory(createEditor())), []);

  const [customNodeData, setCustomNodeData] = useState(null);
  const [textLength, setTextLength] = useState(0);

  const navigate = useNavigate();

  const dialogueToolbarButtons = editorElements.filter((o) =>
    editorDialogueToolbarButtons.includes(o)
  );

  const { setActiveStyles, activeStyles, currentStyle, handleApplyStyles } =
    useEditorToolbarActive(dialogueToolbarButtons);

  const { mentionIndex, mentionUserList, handleMentionKeyDown } =
    useEditorMention(customNodeData);

  const { renderElement, renderLeaf, onEditorKeyDown } = useEditorConfig(
    editor,
    handleApplyStyles,
    customNodeData,
    setCustomNodeData,
    handleMentionKeyDown,
    editorElements
  );

  const { selectedActiveStyles, getSelectedStyle, selectedTextStyle } =
    useEditorSelection();

  useEffect(() => {
    if (!!selectedActiveStyles) {
      setActiveStyles(selectedActiveStyles);
    }
  }, [selectedActiveStyles]);

  useEffect(() => {
    toggleStyle(editor, currentStyle, activeStyles);
  }, [activeStyles]);

  const handleChange = useCallback(
    (document) => {
      const nodeData = editorCustomNode(editor);
      setCustomNodeData(nodeData);
      onChange(document);
      setTextLength(editorTextlength(document));
    },
    [editor.selection, onChange]
  );

  return (
    <div>
      <Slate editor={editor} initialValue={data} onChange={handleChange}>
        <RichTextToolbar
          editor={editor}
          editorElements={editorElements}
          activeStyles={activeStyles}
          selectedTextStyle={selectedTextStyle}
          handleApplyStyles={handleApplyStyles}
          isToolbarIcon={isToolbarIcon}
          toolbarCustomComponent={toolbarCustomComponent}
        />

        <Editable
          placeholder="Share your Snapps"
          renderElement={(eldata) => renderElement(eldata, navigate)}
          renderLeaf={renderLeaf}
          onKeyDown={onEditorKeyDown}
          onSelect={() => getSelectedStyle(editor, data)}
        />

        {editorElements.includes("mention") &&
          customNodeData &&
          customNodeData.customNode.type === "mention" &&
          customNodeData.customNode.text?.length > 0 && (
            <Portal>
              <EditorPopover
                customNodeData={customNodeData}
                editor={editor}
                mentionUsers={mentionUserList}
                mentionIndex={mentionIndex}
              />
            </Portal>
          )}
      </Slate>
      <div className="d-flex justify-content-end">
        {isValidator &&
          !!editorValidatorIcons.length &&
          editorValidatorIcons
            .filter((o) => validatorIcons.map((o) => o.name).includes(o.name))
            .map((x) => {
              const { name, length } = validatorIcons.find(
                (oo) => oo.name === x.name
              );
              return (
                <span
                  style={{
                    color: editorBlockElemntsvalidate(data, name, length)
                      ? "rgb(216, 216, 216)"
                      : "rgb(220, 53, 69)",
                    fontSize: "1.6rem",
                  }}
                >
                  {x.icon}
                </span>
              );
            })}

        <EditorProgressIcon
          textLength={textLength}
          maxTextLength={100}
          outerStrokeWidth={3}
          iconSize={25}
        />
        <AppFramerButton>
          <button
            className="btn btn-primary mb-1 cursor-pointer"
            disabled={!editorInitialValidator(data, 5)}
          >
            {generateTextname}
          </button>
        </AppFramerButton>
      </div>
    </div>
  );
};

export default AppRichTextBox;

//This is used for creating a model or popover in this used to
//create a mention popover
const Portal = ({ children }) => {
  return typeof document === "object"
    ? createPortal(children, document.body)
    : null;
};
