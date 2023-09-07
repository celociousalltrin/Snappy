import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increament, decrement } from "../redux/slices/userSlice";

const ReduxDemo = () => {
  const dispatch = useDispatch();
  const { count } = useSelector((state) => state.user);
  return (
    <div>
      <p>{count}</p>
      <button
        className="btn btn-sm btn-primary"
        onClick={() => dispatch(increament({ number: 2 }))}
      >
        increament
      </button>
      <button
        className="btn btn-sm btn-danger"
        onClick={() => dispatch(decrement())}
      >
        decrement
      </button>
    </div>
  );
};

export default ReduxDemo;
