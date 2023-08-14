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
  FaRegComment,
} from "react-icons/fa";
import { MdTheaterComedy } from "react-icons/md";
import { BsFillChatFill } from "react-icons/bs";
import { AiFillCodeSandboxCircle, AiTwotoneLike } from "react-icons/ai";

import createProfileLogin from "../assets/login-images/create_profile_login.svg";
import imageUploadLogin from "../assets/login-images/image_upload_login.svg";
import snappShareLogin from "../assets/login-images/snapp_share_login.svg";
import socialCommunicateLogin from "../assets/login-images/social_communicate_login.svg";

export const sideBarData = [
  { id: 1, name: "Home", icon: <FaHome />, route: "/home" },
  { id: 2, name: "Explore", icon: <FaSearch />, route: "/explore" },
  { id: 3, name: "Messages", icon: <BsFillChatFill />, route: "/messages" },
  { id: 4, name: "Friends", icon: <FaUserFriends />, route: "/friends" },
  { id: 5, name: "Notifications", icon: <FaBell />, route: "/notification" },
  { id: 6, name: "Bookmarks", icon: <FaBookmark />, route: "/bookmark" },
  { id: 7, name: "Profile", icon: <FaUserAlt />, route: "/profile" },
  { id: 8, name: "Facts", icon: <FaNewspaper />, route: "/facts" },
  { id: 9, name: "Jokes", icon: <MdTheaterComedy />, route: "/jokes" },
  { id: 10, name: "Setting", icon: <FaCog />, route: "/setting" },
  { id: 11, name: "Log Out", icon: <FaSignOutAlt />, route: "/login" },
];

export const bottomNavbarData = [
  { id: 1, name: "home", icon: <FaHome />, route: "/home" },
  { id: 2, name: "search", icon: <FaSearch />, route: "" },
  { id: 3, name: "notification", icon: <FaBell />, route: "/notification" },
  { id: 4, name: "message", icon: <BsFillChatFill />, route: "/messages" },
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
    id: "facts",
    title: "Facts",
  },
  {
    id: "jokes",
    title: "Jokes",
  },
  {
    id: "setting",
    title: "Setting",
  },
  {
    id: "sandbox",
    title: "sandbox",
  },
];

export const modelOpenInfo = [
  { heading: "Liked by", type: 1 },
  { heading: "Commented by", type: 2 },
  { heading: "Bookmarked by", type: 3 },
];

export const notificationInfo = [
  { type: 1, value: "Liked" },
  { type: 2, value: "Commented" },
  { type: 3, value: "Bookmarked" },
  { type: 4, value: "Accepted" },
  { type: 5, value: "Rejected" },
  { type: 6, value: "Friend Request" },
  { type: 7, value: "Profile Viewed" },
];

export const feedInfo = [
  {
    type: 1,
    value: "Liked",
    icon: (
      <AiTwotoneLike className="align-self-center me-2 ms-2" color="blue" />
    ),
  },
  {
    type: 2,
    value: "Commented",
    icon: <FaRegComment className="align-self-center me-2 ms-2" />,
  },
  {
    type: 3,
    value: "Bookmarked",
    icon: <FaBookmark className="align-self-center me-2 ms-2" />,
  },
];

export const loginCarouselImageDetails = [
  {
    id: 1,
    image: createProfileLogin,
    content: "Create your Social Profile and Cultivate your Social Community",
  },
  {
    id: 2,
    image: snappShareLogin,
    content: "Share the Snapp and Share the Joy",
  },
  {
    id: 3,
    image: socialCommunicateLogin,
    content: "Connect and Communicate Socially",
  },
];

export const signupComponentHeader = [
  { index: 0, header: "User Info" },
  { index: 1, header: "Verify Code" },
  { index: 2, header: "Create Password" },
  { index: 3, header: "Pick a Profile Picture" },
  { index: 4, header: "Describe Yourself" },
  { index: 5, header: "What are you interested in?" },
  { index: 6, header: "Suggested Snappers you can connect" },
];

export const ForgotPasswordHeader = [
  { index: 0, header: "Email" },
  { index: 1, header: "Verify Code" },
  { index: 2, header: "Reset Password" },
];

export const SignupInterestedFields = [
  { id: 1, field: "Science" },
  { id: 2, field: "Technology" },
  { id: 3, field: "Sports" },
  { id: 4, field: "Politics" },
  { id: 5, field: "Entertainment" },
  { id: 6, field: "Art and Culture" },
  { id: 7, field: "Business and Economics" },
  { id: 8, field: "Environment and Sustainability" },
  { id: 9, field: "History and Archaeology" },
  { id: 10, field: "Education and Learning" },
  { id: 11, field: "Travel and Tourism" },
  { id: 12, field: "Health and Wellness" },
  { id: 13, field: "Literature" },
  { id: 14, field: "Philosophy" },
  { id: 15, field: "Food and Cooking" },
  { id: 16, field: "Psychology" },
  { id: 17, field: "Fashion and Style" },
  { id: 18, field: "Music" },
  { id: 19, field: "Astronomy" },
  { id: 20, field: "Sociology" },
];
