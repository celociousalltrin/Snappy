import { Editor, Element, Node, Range, Transforms } from "slate";
import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineUnderline,
  AiOutlineLink,
  AiOutlineConsoleSql,
} from "react-icons/ai";

import { TfiLayoutWidthDefaultAlt } from "react-icons/tfi";
import { BsEmojiSmile, BsFillImageFill } from "react-icons/bs";
import { numberToWord } from "../../../utils/common-function";
import { useSlateStatic } from "slate-react";
import { editorInitialValue } from "./editorData";

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
    case "link":
      return <AiOutlineLink />;
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

export const editorKeyBinding = (o) => {
  if (o?.additionalKey) {
    return `mod+${o.additionalKey}+${Object.values(o)[0]}`;
  } else {
    return `mod+${Object.values(o)[0]}`;
  }
};

export const editorTextlength = (data) => {
  return data
    .filter((o) => o.type === "text")
    .reduce(
      (acc, curr) =>
        (acc += curr.children.reduce((acc, curr) => {
          if (!curr?.type) {
            acc += curr.text.length;
          }
          return acc;
        }, 0)),
      0
    );
};

export const editorBlockElementsvalidate = (data, elementName, number) => {
  return data.filter((o) => o.type === elementName)?.length < number;
};

export const findIconValidator = (validatorIcons, iconName) => {
  return validatorIcons && validatorIcons.find((o) => o.name === iconName);
};

export const editorValidatorMessage = (name, length) => {
  const customLength = length >= 10 ? length : numberToWord(length);
  switch (name) {
    case "image":
      return `You can add only ${customLength} image to Snapp.`;
    case "text":
      return `when creating a snapp, you can enter ${customLength} text`;
    default:
      return "";
  }
};

export const resetEditor = (editor) => {
  Transforms.delete(editor, {
    at: {
      anchor: Editor.start(editor, []),
      focus: Editor.end(editor, []),
    },
  });
};
