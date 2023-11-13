import { useCallback } from "react";
import { DefaultElement } from "slate-react";
import isHotkey from "is-hotkey";
import { insertCustomNode, renderTextElement } from "../utils/editorFunction";
import EditorImage from "../components/editor-image";
import { useNavigate } from "react-router-dom";

export default function useEditorConfig(
  editor,
  handleApplyStyles,
  customNodeData,
  setCustomNodeData,
  handleMentionKeyDown
) {
  const { isVoid, isInline, markableVoid } = editor;

  editor.isVoid = (element) => {
    return (
      ["image", "mention", "hashtag"].includes(element.type) || isVoid(element)
    );
  };

  editor.isInline = (element) => {
    return ["mention", "hashtag"].includes(element.type)
      ? true
      : isInline(element);
  };

  editor.markableVoid = (element) => {
    return (
      ["mention", "hashtag"].includes(element.type) || markableVoid(element)
    );
  };

  const onKeyDown = useCallback(
    (event) =>
      KeyBindings.onKeyDown(
        event,
        editor,
        handleApplyStyles,
        customNodeData,
        setCustomNodeData,
        handleMentionKeyDown
      ),
    [editor, customNodeData]
  );
  return { renderElement, renderLeaf, onKeyDown };
}

function renderElement(props) {
  const { element, children, attributes } = props;

  switch (element.type) {
    case "text":
      return renderTextElement(element, attributes, children);
    case "image":
      return <EditorImage {...props} />;
    case "mention":
      return (
        <span style={{ color: "rgb(38, 114, 165)" }}>@{element.character}</span>
      );
    case "hashtag":
      return (
        <span style={{ color: "rgb(56, 167, 242)" }}>#{element.character}</span>
      );
    default:
      return <DefaultElement {...props} />;
  }
}

function renderLeaf(props) {
  const { attributes, children, leaf } = props;

  const navigate = useNavigate();

  let el = <>{children}</>;
  if (leaf.bold) {
    el = <strong>{el}</strong>;
  }

  if (leaf.code) {
    el = <code>{el}</code>;
  }
  if (leaf.italic) {
    el = <em>{el}</em>;
  }

  if (leaf.underline) {
    el = <u>{el}</u>;
  }

  if (leaf.keyboard) {
    el = <kbd>{el}</kbd>;
  }

  if (leaf.codeOutput) {
    el = <samp>{el}</samp>;
  }

  if (leaf.fontSize) {
    el = <span style={{ fontSize: "5rem" }}>{el}</span>;
  }

  if (leaf.fontColor) {
    el = <span style={{ color: "red" }}>{el}</span>;
  }

  return <span {...attributes}>{el}</span>;
}

const KeyBindings = {
  onKeyDown: (
    event,
    editor,
    handleApplyStyles,
    customNodeData,
    setCustomNodeData,
    handleMentionKeyDown
  ) => {
    if (isHotkey("mod+b", event)) {
      handleApplyStyles("bold");
      return;
    }
    if (isHotkey("mod+i", event)) {
      handleApplyStyles("italic");
      return;
    }
    if (isHotkey("mod+c", event)) {
      handleApplyStyles("code");
      return;
    }
    if (isHotkey("mod+u", event)) {
      handleApplyStyles("underline");
      return;
    }
    if (isHotkey("mod+k", event)) {
      event.preventDefault();
      handleApplyStyles("keyboard");
      return;
    }
    if (isHotkey("mod+o", event)) {
      event.preventDefault();
      handleApplyStyles("codeOutput");
      return;
    }
    if (
      customNodeData &&
      customNodeData.customNode.type === "hashtag" &&
      isHotkey("space", event)
    ) {
      insertCustomNode(editor, customNodeData);
      setCustomNodeData(null);
      return;
    }
    if (customNodeData && customNodeData.customNode.type === "mention") {
      // mentionKeyDown(event, editor, customNodeData);
      handleMentionKeyDown(event, editor, customNodeData, setCustomNodeData);
    }
  },
};
