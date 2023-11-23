import { useCallback } from "react";
import { DefaultElement } from "slate-react";
import isHotkey from "is-hotkey";
import {
  editorKeyBinding,
  insertCustomNode,
  renderTextElement,
} from "../utils/editorFunction";
import EditorImage from "../components/editor-image";
import { customKeybindings } from "../utils/editorData";

export default function useEditorConfig(
  editor,
  handleApplyStyles,
  customNodeData,
  setCustomNodeData,
  handleMentionKeyDown,
  editorElements
) {
  const { isVoid, isInline, markableVoid } = editor;

  editor.isVoid = (element) => {
    return (
      [
        "image",
        "mention",
        "hashtag",
        "emoji",
        "link",
        "table",
        "video",
      ].includes(element.type) || isVoid(element)
    );
  };

  editor.isInline = (element) => {
    return ["mention", "hashtag", "emoji", "link"].includes(element.type)
      ? true
      : isInline(element);
  };

  editor.markableVoid = (element) => {
    return (
      ["mention", "hashtag", "emoji", "link"].includes(element.type) ||
      markableVoid(element)
    );
  };

  const onEditorKeyDown = useCallback(
    (event) =>
      KeyBindings.onKeyDown(
        event,
        editor,
        handleApplyStyles,
        customNodeData,
        setCustomNodeData,
        handleMentionKeyDown,
        editorElements
      ),
    [editor, customNodeData]
  );
  return { renderElement, renderLeaf, onEditorKeyDown };
}

export const renderElement = (props, navigate) => {
  const { element, children, attributes } = props;

  switch (element.type) {
    case "text":
      return renderTextElement(element, attributes, children);
    case "image":
      return <EditorImage {...props} />;
    case "mention":
      return (
        <span
          style={{ color: "rgb(38, 114, 165)" }}
          onClick={(e) => {
            e.preventDefault();
            navigate(`/profile/${element.character}`);
          }}
        >
          @{element.character}
        </span>
      );
    case "hashtag":
      return (
        <span
          style={{ color: "rgb(56, 167, 242)" }}
          onClick={(e) => {
            e.preventDefault();
            navigate(`/search?q=${element.character}=hashtag_click`);
          }}
        >
          #{element.character}
        </span>
      );
    case "emoji":
      return <span>{element.character}</span>;
    case "link":
      return (
        <span
          onClick={() => window.open(element.url, "_blank")}
          className="text-primary cursor-pointer text-decoration-underline"
        >
          {element.character}
        </span>
      );
    default:
      return <DefaultElement {...props} />;
  }
};

export const renderLeaf = (props) => {
  const { attributes, children, leaf } = props;

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

  if (leaf.code) {
    el = <pre>{el}</pre>;
  }
  if (leaf.codeOutput) {
    el = <samp>{el}</samp>;
  }

  return <span {...attributes}>{el}</span>;
};

const KeyBindings = {
  onKeyDown: (
    event,
    editor,
    handleApplyStyles,
    customNodeData,
    setCustomNodeData,
    handleMentionKeyDown,
    editorElements
  ) => {
    customKeybindings
      .filter((x) => editorElements.includes(Object.keys(x)[0]))
      .map((o) => {
        if (isHotkey(editorKeyBinding(o), event)) {
          event.preventDefault();
          handleApplyStyles(Object.keys(o)[0]);
          return;
        }
      });
    if (
      editorElements.includes("hashtag") &&
      customNodeData &&
      customNodeData.customNode.type === "hashtag" &&
      isHotkey("space", event)
    ) {
      insertCustomNode(editor, customNodeData);
      setCustomNodeData(null);
      return;
    }
    if (
      editorElements.includes("mention") &&
      customNodeData &&
      customNodeData.customNode.type === "mention"
    ) {
      handleMentionKeyDown(event, editor, customNodeData, setCustomNodeData);
      return;
    }
  },
};
