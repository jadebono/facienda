// Updatepassword.jsx
import React, { useState } from "react";
import { postUpdatePassword } from "../modules/requests";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../store/NotificationsSlice";
import { setUser } from "../store/UserSlice";
import { clearUpdateButtons } from "../store/UpdateButtonsSlice";

/*
Registration policy
(1) Password must contain must contain at least one uppercase character, one lowercase character, one digit, one symbol, between 16 and 128 characters and must not contain any whitespace;
(2) Password will be hashed but not encrypted;
*/
export default function Updatepassword() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [password, setPassword] = useState({ password: "", passwordTwo: "" });

  // Function to test password.
  function checkPasswordValidation(password) {
    const test =
      /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹]).{16,128}$/;
    const validPassword = new RegExp(test);
    return validPassword.test(password) ? true : false;
  }

  function handleUpdateChange(evt) {
    const { name, value } = evt.target;
    setPassword((prevMyPwd) => {
      return {
        ...prevMyPwd,
        [name]: value,
      };
    });
  }

  // submit new password
  async function updatePassword(evt) {
    evt.preventDefault();
    // check that passwords are the same and check that the password meets the requirements
    if (
      checkPasswordValidation(password.password) &&
      password.password === password.passwordTwo
    ) {
      // transmit register to axios post request
      const myDetails = { userId: user.userId, password: password.password };
      const response = await postUpdatePassword(myDetails);
      if (response === "passwordUpdated") {
        dispatch(
          setNotification({
            type: "success",
            message: "Password updated!",
          })
        );
        dispatch(clearUpdateButtons());
        dispatch(setUser({ userId: user.userId, password: password.password }));
      } else {
        dispatch(
          setNotification({
            type: "warning",
            message: "An unknown problem has occurred",
          })
        );
      }
      setPassword((prevEmail) => {
        return { password: "", passwordTwo: "" };
      });
    } else {
      dispatch(
        setNotification({
          type: "error",
          message:
            "There is a problem with your password. Please try another one.",
        })
      );
      setPassword((prevEmail) => {
        return { password: "", passwordTwo: "" };
      });
    }
  }

  return (
    <React.Fragment>
      <div className="m-auto mb-20 md:mb-10 flex flex-col w-5/6 md:w-1/2 h-full mt-5 border-2 border-blue-900 bg-blue-50 rounded-2xl">
        <div className="my-2 text-xl text-blue-900 font-bold text-center">
          Update Password
        </div>

        <form
          className="bg-white mb-4 w-5/6 m-auto rounded-xl shadow-lg border border-1 border-blue-700 flex flex-col justify-center text-blue-900  font-semibold "
          onSubmit={updatePassword}
        >
          <div className="flex flex-col mt-4 ml-4 mb-2">
            <label className="" htmlFor="password">
              Password: <p className="inline-block">*</p>{" "}
              <p className="w-2/3 text-sm text-blue-900 text-justify">
                Password must contain at least one uppercase character, one
                lowercase character, one digit, one symbol, between 16 and 128
                characters and must not contain any whitespace.
              </p>
            </label>
          </div>
          <div className="flex flex-col">
            <input
              required
              name="password"
              type="password"
              value={password.password || ""}
              onChange={handleUpdateChange}
              className="ml-4 w-2/3 border border-blue-900 rounded-md shadow-sm p-1"
            />
          </div>
          <div className="flex flex-col mt-4 ml-4 mb-2">
            <label className="" htmlFor="passwordTwo">
              Confirm password: <p className="inline-block">*</p>
            </label>
          </div>
          <div className="flex flex-col">
            <input
              required
              name="passwordTwo"
              type="password"
              value={password.passwordTwo || ""}
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
