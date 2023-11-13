import { Editor, Element, Node, Range, Transforms } from "slate";
import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineUnderline,
} from "react-icons/ai";

import { TfiLayoutWidthDefaultAlt } from "react-icons/tfi";
import { BsEmojiSmile, BsFillImageFill } from "react-icons/bs";

export const getIconForButton = (style) => {
  switch (style) {
    case "bold":
      return <AiOutlineBold />;
    case "italic":
      return <AiOutlineItalic />;
    case "underline":
      return <AiOutlineUnderline />;
    case "image":
      return <BsFillImageFill />;
    case "emoji":
      return <BsEmojiSmile />;
    default:
      return <TfiLayoutWidthDefaultAlt />;
  }
};

export const getLabelForTextBlock = (level = "") => {
  switch (level) {
    case 1:
      return "Heading 1";
    case 2:
      return "Heading 2";
    case 3:
      return "Heading 3";
    case 4:
      return "Heading 4";
    case 5:
      return "Heading 5";
    case 6:
      return "Heading 6";
    case 7:
      return "Paragraph";
    case 0:
      return "Multiple";
    default:
      return "Select Heading";
  }
};

export const toggleStyle = (editor, style, activeStyles) => {
  if (activeStyles.includes(style)) {
    Editor.addMark(editor, style, true);
  } else {
    Editor.removeMark(editor, style);
  }
};

const selectedRangeBlockElements = (data, start, end) => {
  return data.filter((o, i) => i >= start.path[0] && i <= end.path[0]);
};

const selectedRangeLeafElement = (obj, index, arr, start, end) => {
  if (arr.length === 1) {
    return {
      ...obj,
      children: obj.children.filter(
        (oo, i) => i >= start.path[1] && i <= end.path[1]
      ),
    };
  } else if (index == 0) {
    return {
      ...obj,
      children: obj.children.filter((oo, i) => i >= start.path[1]),
    };
  } else if (index == arr.length - 1) {
    return {
      ...obj,
      children: obj.children.filter((oo, i) => i <= end.path[1]),
    };
  } else {
    return obj;
  }
};

export const getSelectedElements = (data, start, end) => {
  return selectedRangeBlockElements(data, start, end).map((obj, index, arr) =>
    selectedRangeLeafElement(obj, index, arr, start, end)
  );
};

export const renderTextElement = (element, attributes, children) => {
  switch (element.level) {
    case 1:
      return <h1 {...attributes}>{children}</h1>;
    case 2:
      return <h2 {...attributes}>{children}</h2>;
    case 3:
      return <h3 {...attributes}>{children}</h3>;
    case 4:
      return <h4 {...attributes}>{children}</h4>;
    case 5:
      return <h5 {...attributes}>{children}</h5>;
    case 6:
      return <h6 {...attributes}>{children}</h6>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

export const textBlockElement = (editor, type, level) => {
  Transforms.setNodes(editor, {
    type,
    level,
    at: editor.selection,
    match: Element.isElement,
  });
};

export const insertCustomNode = (editor, data) => {
  const {
    customNode: { type, text },
    range,
  } = data;

  const customNodeData = {
    type,
    character: text,
    children: [{ text: "" }],
  };
  Transforms.select(editor, range);
  Transforms.insertNodes(editor, customNodeData);
  Transforms.move(editor);
};

const findAdditionalNode = (editorText) => {
  switch (true) {
    case editorText.startsWith("#"):
      return {
        type: "hashtag",
        text: editorText.match(/^#(\w+)$/) && editorText.match(/^#(\w+)$/)[1],
      };
    case editorText.startsWith("@"):
      return {
        type: "mention",
        text: editorText.match(/^@(\w+)$/) && editorText.match(/^@(\w+)$/)[1],
      };
    default:
      return { type: "plainText", text: editorText };
  }
};
export const editorCustomNode = (editor) => {
  const { selection } = editor;
  if (selection && Range.isCollapsed(selection)) {
    const [start] = Range.edges(selection);
    const wordBefore = Editor.before(editor, start, { unit: "word" });
    const before = wordBefore && Editor.before(editor, wordBefore);
    const beforeRange = before && Editor.range(editor, before, start);
    const beforeText = beforeRange && Editor.string(editor, beforeRange);
    if (beforeText) {
      var node = findAdditionalNode(beforeText);
    }
    if (node) {
      return { range: beforeRange, customNode: node };
    }
  }
};

export const editorInitialValidator = (data, number) => {
  if (data.length > 1 || data[0].children[0].text.length > number) {
    return true;
  } else {
    return false;
  }
};
