import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineLink,
  AiOutlineUnderline,
} from "react-icons/ai";
import { BsEmojiSmile, BsFillImageFill } from "react-icons/bs";
import { FaCode, FaRegKeyboard } from "react-icons/fa";
import { IoImage } from "react-icons/io5";
import { LuFileOutput } from "react-icons/lu";

export const toolbarButtons = [
  { bold: <AiOutlineBold /> },
  { italic: <AiOutlineItalic /> },
  { underline: <AiOutlineUnderline /> },
  { image: <BsFillImageFill /> },
  { emoji: <BsEmojiSmile /> },
  { link: <AiOutlineLink /> },
  { code: <FaCode /> },
  { keyboard: <FaRegKeyboard /> },
  { codeOutput: <LuFileOutput /> },
];

export const customKeybindings = [
  { bold: "b" },
  { italic: "i" },
  { underline: "u" },
  { keyboard: "k" },
  { code: "c", additionalKey: "alt" },
  { codeOutput: "s", additionalKey: "alt" },
];

export const editorValidatorIcons = [{ name: "image", icon: <IoImage /> }];
