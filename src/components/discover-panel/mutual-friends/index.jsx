import React from "react";
import "./style.css";

//! Mock Data
import { mockMutual } from "../../../utils/mock-common";
import { useNavigate } from "react-router-dom";

const MutualFriends = () => {
  const navigate = useNavigate();
  return (
    <div className="discover_container mt-5">
      <h4 className="text-center pt-4 mb-3">Mutual Friends</h4>
      {mockMutual.map((obj) => (
        <div key={obj.id} className="d-flex mb-2">
          <img
            src={obj.profile_img}
            alt={obj.name}
            width="50px"
            height="50px"
            // onLoad={(e) => console.log(e)}
            className="mutual_friends--img"
          />
          <div className="mt-2">
            <h5 className="mb-0">{obj.name}</h5>
            <p>{`@${obj.snappy_username}`}</p>
          </div>
          <div className="mutual_friend--button">
            <button className="btn btn-primary">Add Friend</button>
          </div>
        </div>
      ))}
      <div className="pt-2 pb-1">
        <p
          className="text-primary text-center cursor-pointer"
          onClick={() => {
            navigate("/friends");
            window.scrollTo(0, 0);
          }}
        >
          show more
        </p>
      </div>
    </div>
  );
};

export default MutualFriends;
