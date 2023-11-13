import demoimage from "../../../assets/mock-image/1mutual.jpg";

export const ExampleDocument = [
  {
    type: "text",
    level: 1,
    children: [{ text: "Hello from Heading 1" }],
  },
  {
    type: "text",
    level: 2,
    children: [{ text: "Hello from Heading 2" }],
  },
  {
    type: "image",
    url: demoimage,
    children: [{ text: "" }],
  },
  {
    type: "text",
    level: 3,
    children: [{ text: "Hello from Heading 3" }],
  },
  {
    type: "text",
    level: 4,
    children: [{ text: "Hello from Heading 4" }],
  },
  {
    type: "text",
    level: 5,
    children: [{ text: "Hello from Heading 5" }],
  },
  {
    type: "text",
    level: 6,
    children: [{ text: "Hello from Heading 6 " }],
  },

  {
    type: "text",
    level: 7,
    children: [
      { text: "Hello World! This is my paragraph inside a sample document." },
      {
        type: "mention",
        character: "Mace Windu",
        children: [{ text: "" }],
      },
      {
        type: "hashtag",
        character: "vijay",
        children: [{ text: "" }],
      },
      { text: "Bold text.", bold: true, code: true },
      { text: "Italic text.", italic: true },
      { text: "Bold and underlined text.", bold: true, underline: true },
      { text: "variableFoo sdfewes sdvs ", code: true },
      { text: "Ctrl + S", keyboard: true },
      { text: " This is for Saving the file", codeOutput: true },
      { text: "This is larger font size", fontSize: true },
      { text: "This is different font colour", fontColor: true },
    ],
  },
];
