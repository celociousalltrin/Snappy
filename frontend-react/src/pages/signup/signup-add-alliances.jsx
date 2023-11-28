import React, { useEffect, useState } from "react";
import ConnectorsList from "../../components/connectors/connectors-list";
import { MockConnectorsList } from "../../utils/mock-common";
import "./style.css";
import { AiOutlineDownCircle, AiOutlineUpCircle } from "react-icons/ai";
import useToggleContent from "../../custom-hooks/useToggleContent";
import AppFramerExpand from "../../components/app-framer-expand";
import { getSignupConnectorsList } from "../../services/method";
import { responseMessage } from "../../utils/response-message";

const SignupAddAlliances = ({ data, formik: { setFieldValue } }) => {
  const { isShow, showMore, showLess } = useToggleContent();
  const [showIcon, setShowIcon] = useState(true);
  const [connectorList, setConnectorList] = useState([]);
  const [isApiExecuted, setApiExecuted] = useState(false);
  useEffect(() => {
    getConnectorList();
  }, []);

  const getConnectorList = async () => {
    try {
      const response = await getSignupConnectorsList();
      setConnectorList(response.data.response_data);
    } catch (err) {
      console.log(
        "🚀 ~ file: signup-add-alliances.jsx:22 ~ getConnectorList ~ err:",
        err
      );
      responseMessage(err.data.code);
    } finally {
      setApiExecuted(true);
    }
  };

  return (
    <div className="text-start position-relative">
      <AppFramerExpand setShowIcon={setShowIcon} isVisible={isShow}>
        <p className="fs-6 text-muted mt-0 ms-3">
          When You Add Someone in Alliance you can see there feeds in your home.
          You will also receive relevant recommendations. Atleast Add 2 in your
          Snapp Community.
          <span className="d-md-none" onClick={showLess}>
            <AiOutlineUpCircle size={23} color="rgb(13, 110, 253)" />
          </span>
        </p>
        {!isShow && (
          <span className="content-expand-icon d-md-none" onClick={showMore}>
            {showIcon && <AiOutlineDownCircle size={23} />}
          </span>
        )}
      </AppFramerExpand>
      <ConnectorsList
        connecteduserList={connectorList}
        isSignup
        callback={(id) => {
          if (data.includes(id)) {
            setFieldValue(
              "alliances",
              data.filter((o) => o != id)
            );
          } else {
            setFieldValue("alliances", [...data, id]);
          }
        }}
        signupConnectedUsers={data}
        isApiExecuted={isApiExecuted}
      />
    </div>
  );
};

export default SignupAddAlliances;
