import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { responseMessage } from "../../utils/response-message";
import { userData } from "../../redux/slices/userSlice";

import { loginExternalAuthenticateUser } from "../../services/method";

const ExternalAuthenticate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    externalLoginUser();
  }, []);

  const externalLoginUser = async () => {
    try {
      const response = await loginExternalAuthenticateUser();

      dispatch(userData(response.data.response_data));
      responseMessage(response.data.code);
      navigate("/home");
    } catch (err) {
      console.log("🚀 ~ file: index.jsx:13 ~ externalLoginUser ~ err:", err);
      responseMessage(err.data.code);
    }
  };

  return <div></div>;
};

export default ExternalAuthenticate;
