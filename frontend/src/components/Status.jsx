// Status.jsx
import React from "react";
import { useSelector } from "react-redux";

function StatusPanel() {
  const user = useSelector((state) => state.user);

  return (
    <div className="mr-4 mt-4 p-4 bg-gray-100 border-2 border-blue-900  bg-blue-50 rounded-md shadow-md">
      {user.logged ? (
        <>
          <div>
            <h2 className="inline-block text-blue-900 font-bold ">Status:</h2>{" "}
            <p className="inline-block text-indigo-900 font-extrabold">
              Logged in
            </p>
          </div>
          <div>
            <h2 className="inline-block text-blue-900 font-bold ">Username:</h2>{" "}
            <p className="inline-block text-indigo-900 font-extrabold">
              {user.username}
            </p>
          </div>
        </>
      ) : (
        <p className="text-indigo-900 font-extrabold">
          Register account and log in to save tasks
        </p>
      )}
    </div>
  );
}

export default StatusPanel;
