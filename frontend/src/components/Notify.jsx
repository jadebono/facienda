// Notify.jsx
// * The Notification system (Toast)

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearNotification } from "../store/NotificationsSlice";

export default function Notify() {
  const [exit, setExit] = useState(false);
  const [intervalID, setIntervalID] = useState(null);
  const [width, setWidth] = useState(0);
  const dispatch = useDispatch();
  const notify = useSelector((state) => state.notification);

  // setting the backGroundColour of the main div
  // this should be of a lighter colour than the bar
  // current settings: (1) success: green-100, (2) error: red-100
  // (3) warning: orange-100, (4) notify: blue-100
  const backGroundColour =
    notify.type === "success"
      ? "bg-green-100"
      : notify.type === "error"
      ? "bg-red-100"
      : notify.type === "warning"
      ? "bg-orange-100"
      : notify.type === "notify"
      ? "bg-blue-100"
      : "bg-white";

  function handleStartTimer() {
    const id = setInterval(() => {
      setWidth((prevWidth) => {
        if (prevWidth < 100) {
          return prevWidth + 0.5;
        } else {
          clearInterval(id);
          return prevWidth;
        }
      });
    }, 20); // -n to increase speed of timer bar, +n to increase it
    setIntervalID(id);
  }

  function handlePauseTimer() {
    clearInterval(intervalID);
  }

  function handleCloseNotification() {
    handlePauseTimer();
    setExit((prevState) => true);
    setTimeout(() => {
      // remove from state and therefore the dom
      dispatch(
        clearNotification(
          {
            type: "",
            message: "",
          },
          400
        )
      );
    });
  }

  useEffect(() => {
    if (width === 100) {
      // if width === 100% close notification
      handleCloseNotification();
    }
  });

  useEffect(() => {
    handleStartTimer();
  }, []);

  return (
    <React.Fragment>
      <div className="notification-wrapper">
        <div
          onMouseEnter={handlePauseTimer}
          onMouseLeave={handleStartTimer}
          className={`notification-item ${backGroundColour} 
         ${exit ? "exit" : ""}`}
        >
          <p className="mx-2 text-blue-900 font-bold break-words">
            {notify.message}
          </p>

          <div className={`${notify.type}`} style={{ width: `${width}%` }} />
        </div>
      </div>
    </React.Fragment>
  );
}
