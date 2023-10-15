// Account page with logout facility
/*
- panel with current details, and buttons to edit username/email/password
- second panel for update username/email/password that appears when the user clicks on the relevant buttons
- button to delete account
- button to logout

*/

import React, { useState, useEffect } from "react";
import Updateusername from "../components/Updateusername";
import Updateemail from "../components/Updateemail";
import Updatepassword from "../components/Updatepassword";
import UserPanel from "../components/UserPanel";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, userDetails } from "../modules/requests";
import { setNotification } from "../store/NotificationsSlice";
import { clearUser } from "../store/UserSlice";
import { clearAllTasks } from "../store/TaskSlice";
import {
  clearUpdateButtons,
  setUpdateButtons,
} from "../store/UpdateButtonsSlice";

export default function Account() {
  const [currentUser, setCurrentUser] = useState({
    name: "",
    surname: "",
    username: "",
    email: "",
  });

  // use updatebuttons to toggle Updateusername, Updateemail, Updatepassword panels
  const updatebuttons = useSelector((state) => state.updatebuttons);

  const dispatch = useDispatch();
  // access the user state from the store
  const user = useSelector((state) => state.user);

  useEffect(() => {
    async function getDetails() {
      const retrievedDetails = await userDetails(user.userId);
      setCurrentUser((prevCurrentUser) => {
        return { ...retrievedDetails };
      });
    }
    getDetails();
  }, [user]);

  function togglePanel(choice) {
    if (choice === 1 && !updatebuttons.username) {
      dispatch(setUpdateButtons({ username: true }));
    } else if (choice === 2 && !updatebuttons.email) {
      dispatch(setUpdateButtons({ email: true }));
    } else if (choice === 3 && !updatebuttons.password) {
      dispatch(setUpdateButtons({ password: true }));
    } else {
      dispatch(clearUpdateButtons());
    }
  }

  function logout(message) {
    document.cookie = `session=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
    dispatch(clearUser());
    dispatch(clearAllTasks());
    dispatch(
      setNotification({
        type: "success",
        message: message,
      })
    );
  }

  async function closeAccount() {
    const response = await deleteUser(user.userId);
    if (response) {
      logout("You have successfully closed your account!");
    } else {
      setNotification({
        type: "error",
        message: "An unknown error has prevented the closure of this account.",
      });
    }
  }

  return (
    <React.Fragment>
      {" "}
      <div className="text-center text-blue-900 text-4xl">
        User Account
      </div>{" "}
      <div className="mx-4 flex flex-row">
        <button
          className="btn-gen"
          onClick={() => logout("You have successfully logged out!")}
        >
          logout
        </button>
        <button className="btn-danger" onClick={closeAccount}>
          close account
        </button>
      </div>
      {/* user details panel - submit data from currentUser as a prop */}
      <UserPanel userDetails={currentUser} togglePanel={togglePanel} />
      {updatebuttons.username ? (
        <Updateusername />
      ) : updatebuttons.email ? (
        <Updateemail />
      ) : updatebuttons.password ? (
        <Updatepassword />
      ) : (
        " "
      )}
    </React.Fragment>
  );
}
