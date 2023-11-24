import React, { useEffect, useState } from "react";
import "./style.css";

import { useNavigate } from "react-router-dom";
import ConnectorsList from "../../connectors/connectors-list";
import { getConnectorList } from "../../../services/method";
import { responseMessage } from "../../../utils/response-message";
import { useSelector } from "react-redux";

const AllianceList = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  const { isConnectorChnaged } = useSelector((state) => state.user);
  console.log(
    "🚀 ~ file: index.jsx:15 ~ AllianceList ~ isConnectorChnaged:",
    isConnectorChnaged
  );

  const getConnectorData = async () => {
    try {
      const result = await getConnectorList();
      setList(result.data.response_data);
    } catch (err) {
      responseMessage(err.data.code);
      console.log("🚀 ~ file: index.jsx:14 ~ getConnectorList ~ err:", err);
    }
  };
  useEffect(() => {
    getConnectorData();
  }, [isConnectorChnaged]);

  return (
    <div className="discover_container mt-5">
      <h4 className="text-center pt-4 mb-3">Alliances</h4>
      <ConnectorsList connecteduserList={list} isDiscoverAlliance length={3} />
      <div className="pt-2 pb-1">
        <p
          className="text-primary text-center cursor-pointer"
          onClick={() => {
            navigate("/connectors", { state: { from: "find-connectors" } });
            window.scrollTo(0, 0);
          }}
        >
          show more
        </p>
      </div>
    </div>
  );
};

export default AllianceList;
