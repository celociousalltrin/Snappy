import React, { useEffect, useState } from "react";

const AppTimer = ({ minutes = 5, callback = () => {} }) => {
  const [timer, setTimer] = useState(minutes * 60);

  useEffect(() => {
    let timerId;
    if (timer > 0) {
      timerId = setInterval(() => {
        setTimer((prevState) => prevState - 1);
      }, 1000);
    } else {
      callback(true);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [timer]);

  const timerMinutes = Math.floor(timer / 60);
  const timerSeconds = timer % 60;

  return (
    <div>
      {timerMinutes}:{timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}
    </div>
  );
};

export default AppTimer;
