// UserPanel.jsx
// * UserPanel for <Account/> component

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../store/NotificationsSlice";

export default function UserPanel(props) {
  // get userDetails as a prop from <Account/> and populate the fields with it
  const userDetails = props.userDetails;
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <div className="my-4 mx-auto w-5/6 md:w-1/2 border-2 border-blue-900 rounded-lg shadow-lg bg-blue-50 sm:mx-4 md:mx-auto">
        <div className="flex flex-row ml-2">
          <div className="text-blue-900 font-bold">Name:</div>
          <div className="rounded-md ml-9 w-5/6 font-extrabold text-indigo-900">
            {userDetails.name}
          </div>
        </div>
        <div className="flex flex-row ml-2">
          <div className="text-blue-900 font-bold">Surname:</div>
          <div className="rounded-md ml-4 w-5/6 font-extrabold text-indigo-900">
            {userDetails.surname}
          </div>
        </div>
        <div className="flex flex-row ml-2">
          <div className="text-blue-900 font-bold">Username:</div>
          <div className="rounded-md ml-2 w-5/6 font-extrabold text-indigo-900">
            {userDetails.username}
          </div>
        </div>
        <div className="flex flex-row ml-2">
          <div className="text-blue-900 font-bold">Email:</div>
          <div className="rounded-md ml-10 w-5/6 font-extrabold text-indigo-900">
            {userDetails.email}
          </div>
        </div>

        <div className="mx-1 mt-2 text-center text-lg font-semibold  text-blue-900">
          You may update your username, email, and password by clicking on the
          applicable buttons below
        </div>
        <div className="flex flex-row mb-2">
          <button className="btn-gen" onClick={() => props.togglePanel(1)}>
            username
          </button>
          <button className="btn-gen" onClick={() => props.togglePanel(2)}>
            email
          </button>
          <button className="btn-gen" onClick={() => props.togglePanel(3)}>
            password
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}
