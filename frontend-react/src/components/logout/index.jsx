import React from "react";
import { useEffect } from "react";
import { logout } from "../../services/method";
import { useDispatch } from "react-redux";
import { logoutReducer } from "../../redux/slices/userSlice";
import { responseMessage } from "../../utils/response-message";
import { useNavigate } from "react-router-dom";
import { purgeStore } from "../../redux/store";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    userLogout();
  }, []);

  const userLogout = async () => {
    try {
      const response = await logout();
      dispatch(logoutReducer);
      purgeStore();
      responseMessage(response.data.code);
      navigate("/login");
    } catch (err) {
      console.log("🚀 ~ file: index.jsx:12 ~ userLogout ~ err:", err);
    }
  };
  return <div></div>;
};

export default Logout;
