import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postLogin } from "../modules/requests";
import { setNotification } from "../store/NotificationsSlice";
import { setUser } from "../store/UserSlice";

/*

once the response is returned:
if login - update store and notify user that login has taken place and turn navbar img orange
if not - notify user of invalid login
if error - notify of error

add functionality in server to check for a valid token and login automatically if it exists

*/

export default function Login() {
  const [userData, setUserData] = useState({ username: "", password: "" });
  const dispatch = useDispatch();

  // access the user state from the store
  // ?  do I need this here?
  const user = useSelector((state) => state.user);

  // max_age for the cookie in seconds
  const max_age = 14400;

  function handleLoginChange(evt) {
    const { name, value } = evt.target;
    setUserData((prevMyReg) => {
      return {
        ...prevMyReg,
        [name]: value,
      };
    });
  }

  // async function to submit login data to server and db
  async function submitLogin(evt) {
    evt.preventDefault();
    const response = await postLogin(userData);
    const { login, userId, username, token } = response;
    if (login) {
      //save cookie manually
      document.cookie = `session=${token};max-age=${max_age};path=/;`;
      // send data to redux store
      dispatch(
        setUser({
          userId: userId,
          username: username,
        })
      );
      // send notification to user that he has logged in
      dispatch(
        setNotification({
          type: "success",
          message: "You have successfully logged in!",
        })
      );
    } else {
      // send notification to user that log in has failed
      dispatch(
        setNotification({
          type: "error",
          message: "Login has failed!",
        })
      );
    }
    // send notification
    setUserData({ username: "", password: "" });
  }

  return (
    <React.Fragment>
      <div className="mx-auto mt-5 flex flex-col items-center w-4/5 md:w-1/2 border-2 border-blue-900 bg-blue-50 rounded-2xl">
        <div className="my-4 text-xl uppercase text-blue-900 font-bold">
          LOGIN
        </div>
        <form
          className="w-5/6 mb-5 bg-blue-50 rounded-xl"
          onSubmit={submitLogin}
        >
          <div className="ml-4 my-2">
            <label className="text-blue-900 font-semibold" htmlFor="username">
              Username:
            </label>
          </div>
          <div className="">
            <input
              required
              name="username"
              type="text"
              value={userData.username || ""}
              onChange={handleLoginChange}
              className="ml-4 w-2/3 border border-blue-900 rounded-md shadow-sm p-1"
            />
          </div>
          <div className="my-4 ml-4">
            <label className="text-blue-900 font-semibold" htmlFor="password">
              Password:
            </label>
          </div>
          <div className="flex flex-col">
            <input
              required
              name="password"
              type="password"
              value={userData.password || ""}
              onChange={handleLoginChange}
              className="ml-4 w-2/3 border border-blue-900 rounded-md shadow-sm p-1"
            />
          </div>
          <div className="flex flex-row m-4 justify-around">
            <button className="btn-gen">Sign in</button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}
