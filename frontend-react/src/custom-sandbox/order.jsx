import React, { useState } from "react";

const Order = () => {
  const data = [
    { id: 1, name: "vijay", age: 22, order: 1 },
    { id: 2, name: "Ajith", age: 24, order: 2 },
    { id: 3, name: "Rajini", age: 21, order: 3 },
    { id: 4, name: "Kamal", age: 45, order: 4 },
  ];

  const [details, setDetails] = useState(data);

  const handleUp = (input, index) => {
    const temp = [...details];
    temp[index] = { ...input, order: temp[index - 1].order };
    temp[index - 1] = { ...temp[index - 1], order: details[index].order };
    setDetails(temp);
  };

  const handleDown = (input, index) => {
    const temp = [...details];
    temp[index] = { ...input, order: temp[index + 1].order };
    temp[index + 1] = { ...temp[index + 1], order: details[index].order };
    setDetails(temp);
  };

  return (
    <div>
      {details
        .sort((firstItem, secondItem) => firstItem.order - secondItem.order)
        .map((obj, i) => {
          return (
            <div className="d-flex bg-secondary m-2">
              <h5 className="me-3">{obj.name}</h5>
              <p>{obj.age}</p>
              <button
                className="btn btn-sm btn-primary ms-4 me-2"
                onClick={() => handleUp(obj, i)}
              >
                Up
              </button>
              <button
                className="btn btn-sm btn-info"
                onClick={() => handleDown(obj, i)}
              >
                down
              </button>
            </div>
          );
        })}
    </div>
  );
};

export default Order;
