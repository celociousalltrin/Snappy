import {
  FaHome,
  FaBookmark,
  FaCog,
  FaSignOutAlt,
  FaUserAlt,
  FaUserFriends,
  FaSearch,
  FaBell,
  FaNewspaper,
} from "react-icons/fa";
import { MdTheaterComedy } from "react-icons/md";
import { BsFillChatFill } from "react-icons/bs";

export const sideBarName = [
  { id: 1, name: "Home", icon: <FaHome />, route: "/home" },
  { id: 2, name: "Explore", icon: <FaSearch />, route: "/explore" },
  { id: 3, name: "Messages", icon: <BsFillChatFill />, route: "/messages" },
  { id: 4, name: "Friends", icon: <FaUserFriends />, route: "/friends" },
  { id: 5, name: "Notifications", icon: <FaBell />, route: "/notification" },
  { id: 6, name: "Bookmarks", icon: <FaBookmark />, route: "/bookmark" },
  { id: 7, name: "Profile", icon: <FaUserAlt />, route: "/profile" },
  { id: 8, name: "News", icon: <FaNewspaper />, route: "/news" },
  { id: 9, name: "Jokes", icon: <MdTheaterComedy />, route: "/jokes" },
  { id: 10, name: "Setting", icon: <FaCog />, route: "/setting" },
  { id: 11, name: "Log Out", icon: <FaSignOutAlt />, route: "/logout" },
];

export const page_info = [
  {
    id: "home",
    title: "Home",
  },
  {
    id: "explore",
    title: "Explore",
  },
  {
    id: "messages",
    title: "Messages",
  },
  {
    id: "friends",
    title: "Friends",
  },
  {
    id: "notification",
    title: "Notifications",
  },
  {
    id: "bookmark",
    title: "Bookmarks",
  },
  {
    id: "profile",
    title: "Profile",
  },
  {
    id: "news",
    title: "News",
  },
  {
    id: "jokes",
    title: "Jokes",
  },
  {
    id: "setting",
    title: "Setting",
  },
];
