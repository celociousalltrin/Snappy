import {
  FaHome,
  FaBookmark,
  FaCog,
  FaSignOutAlt,
  FaUserAlt,
  FaUserFriends,
  FaSearch,
  FaBell,
} from "react-icons/fa";
import { BsFillChatFill } from "react-icons/bs";

export const sideBarName = [
  { id: 1, name: "Home", icon: <FaHome />, route: "/home" },
  { id: 2, name: "Explore", icon: <FaSearch />, route: "/explore" },
  { id: 3, name: "Messages", icon: <BsFillChatFill />, route: "/messages" },
  { id: 4, name: "Friends", icon: <FaUserFriends />, route: "/friends" },
  { id: 5, name: "Notifications", icon: <FaBell />, route: "/notification" },
  { id: 6, name: "Bookmarks", icon: <FaBookmark />, route: "/bookmark" },
  { id: 7, name: "Profile", icon: <FaUserAlt />, route: "/profile" },
  { id: 8, name: "Setting", icon: <FaCog />, route: "/setting" },
  { id: 9, name: "Log Out", icon: <FaSignOutAlt />, route: "/logout" },
];
