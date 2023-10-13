// Updateusername.jsx
import React, { useState } from "react";
import { postUpdateUsername } from "../modules/requests";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../store/NotificationsSlice";
import { setUser } from "../store/UserSlice";
import { clearUpdateButtons } from "../store/UpdateButtonsSlice";
/*
Username Update policy

(1) Username has to be unique. If it is not unique, prevent registration and inform registrant that registration has been stopped because the username has already been registered;
(2) Username will each be encrypted with a secret key and a secret initVector to preserve registrant privacy in case of a database hack or leak.
*/
export default function Updateusername() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [username, setUsername] = useState({ username: "" });

  function handleUpdateChange(evt) {
    const { name, value } = evt.target;
    setUsername((prevMyReg) => {
      return {
        [name]: value,
      };
    });
  }

  // submit new username
  async function updateUsername(evt) {
    evt.preventDefault();
    // transmit register to axios post request
    const myDetails = { userId: user.userId, username: username.username };
    const response = await postUpdateUsername(myDetails);
    if (response === "usernameUpdated") {
      dispatch(
        setNotification({
          type: "success",
          message: "Username updated!",
        })
      );
      dispatch(setUser({ userId: user.userId, username: username.username }));
      dispatch(clearUpdateButtons());
    } else if (response === "usernameTaken") {
      dispatch(
        setNotification({
          type: "warning",
          message: "Username already registered.",
        })
      );
    }
    setUsername((prevUsername) => {
      return { username: "" };
    });
  }

  return (
    <React.Fragment>
      <div className="m-auto mb-20 md:mb-10 flex flex-col w-5/6 md:w-1/2 h-full mt-5 border-2 border-blue-900 bg-blue-50 rounded-2xl">
        <div className="my-2 text-xl text-blue-900 font-bold text-center">
          Update Username
        </div>

        <form
          className="bg-white mb-4 w-5/6 m-auto rounded-xl shadow-lg border border-1 border-blue-700 flex flex-col justify-center text-blue-900  font-semibold "
          onSubmit={updateUsername}
        >
          <div className="flex flex-col ml-4 my-2">
            <label className="" htmlFor="username">
              Username:
            </label>
          </div>
          <div className="flex flex-col">
            <input
              required
              name="username"
              type="text"
              value={username.username || ""}
              onChange={handleUpdateChange}
              className="ml-4 w-2/3 border border-blue-900 rounded-md shadow-sm p-1"
            />
          </div>
          <div className="flex flex-row my-4 justify-around">
            <button className="btn-gen">Update</button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}
