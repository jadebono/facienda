// Updateemail.jsx
import React, { useState } from "react";
import { postUpdateEmail } from "../modules/requests";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../store/NotificationsSlice";
import { setUser } from "../store/UserSlice";
import { clearUpdateButtons } from "../store/UpdateButtonsSlice";
/*
Email update policy 
(1) Email has to be unique. If it is not unique, prevent registration but only inform registrant that his registration has been stopped because one of his credentials has already been registered. This will protect the privacy of the email account that has already been registered;
(2) Email field will be encrypted with a secret key and a secret initVector to preserve registrant privacy in case of a database hack or leak.
*/

export default function Updateemail() {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [email, setEmail] = useState({ email: "" });

  function handleUpdateChange(evt) {
    const { name, value } = evt.target;
    setEmail((prevMyEmail) => {
      return {
        [name]: value,
      };
    });
  }

  // submit new email
  async function updateEmail(evt) {
    evt.preventDefault();
    // transmit register to axios post request
    const myDetails = { userId: user.userId, email: email.email };
    const response = await postUpdateEmail(myDetails);
    if (response === "emailUpdated") {
      dispatch(
        setNotification({
          type: "success",
          message: "Email updated!",
        })
      );
      dispatch(clearUpdateButtons());
      dispatch(setUser({ userId: user.userId, email: email.email }));
    } else if (response === "emailTaken") {
      dispatch(
        setNotification({
          type: "warning",
          message: "Unknown problem with that email",
        })
      );
    }
    setEmail((prevEmail) => {
      return { email: "" };
    });
  }

  return (
    <React.Fragment>
      <div className="m-auto mb-20 md:mb-10 flex flex-col w-5/6 md:w-1/2 h-full mt-5 border-2 border-blue-900 bg-blue-50 rounded-2xl">
        <div className="my-2 text-xl text-blue-900 font-bold text-center">
          Update Email
        </div>

        <form
          className="bg-white mb-4 w-5/6 m-auto rounded-xl shadow-lg border border-1 border-blue-700 flex flex-col justify-center text-blue-900  font-semibold "
          onSubmit={updateEmail}
        >
          <div className="flex flex-col ml-4 my-2">
            <label className="" htmlFor="email">
              Email:
            </label>
          </div>
          <div className="flex flex-col">
            <input
              required
              name="email"
              type="email"
              value={email.email || ""}
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
