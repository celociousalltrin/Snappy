import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Editable, Slate, withReact } from "slate-react";

import { createEditor } from "slate";
import { withHistory } from "slate-history";

import useEditorConfig from "./hooks/useEditorConfig";

import {
  editorCustomNode,
  editorInitialValidator,
  toggleStyle,
} from "./utils/editorFunction";
import { useRichTextStyle } from "./hooks/useRichTextStyle";
import useEditorSelection from "./hooks/useEditorSelection";
import EditorPopover from "./components/editor-popover";
import { createPortal } from "react-dom";
import { useEditorMention } from "./hooks/useEditorMention";

import "./style.css";
import AppFramerButton from "../app-framer-button";
import RichTextToolbar from "./components/toolbar";

const AppRichTextBox = ({ data, onChange }) => {
  const editor = useMemo(() => withReact(withHistory(createEditor())), []);

  const [customNodeData, setCustomNodeData] = useState(null);

  const { mentionIndex, mentionUserList, handleMentionKeyDown } =
    useEditorMention(customNodeData);
  const { selectedActiveStyles, getSelectedStyle, selectedTextStyle } =
    useEditorSelection();

  const { setActiveStyles, activeStyles, currentStyle, handleApplyStyles } =
    useRichTextStyle();

  useEffect(() => {
    if (!!selectedActiveStyles) {
      setActiveStyles(selectedActiveStyles);
    }
  }, [selectedActiveStyles]);

  useEffect(() => {
    toggleStyle(editor, currentStyle, activeStyles);
  }, [activeStyles]);

  const { renderElement, renderLeaf, onKeyDown } = useEditorConfig(
    editor,
    handleApplyStyles,
    customNodeData,
    setCustomNodeData,
    handleMentionKeyDown
  );

  const handleChange = useCallback(
    (document) => {
      const nodeData = editorCustomNode(editor);
      setCustomNodeData(nodeData);
      onChange(document);
    },
    [editor.selection, onChange]
  );

  return (
    <div>
      <Slate editor={editor} initialValue={data} onChange={handleChange}>
        <RichTextToolbar
          activeStyles={activeStyles}
          handleApplyStyles={handleApplyStyles}
          editor={editor}
          selectedTextStyle={selectedTextStyle}
        />

        <Editable
          placeholder="Share your Snapps"
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={onKeyDown}
          onSelect={() => getSelectedStyle(editor, data)}
        />
        <div className="d-flex justify-content-end">
          <AppFramerButton>
            <button
              className="btn btn-primary mt-1 mb-1 cursor-pointer"
              disabled={!editorInitialValidator(data, 5)}
            >
              Snapp
            </button>
          </AppFramerButton>
        </div>

        {customNodeData &&
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
