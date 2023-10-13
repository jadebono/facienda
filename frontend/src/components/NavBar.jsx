// Navbar.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  bothHidden,
  burgerShownMenuHidden,
  toggle,
} from "../store/NavBarSlice.js";

export default function Navbar(props) {
  const dispatch = useDispatch();
  const navbar = useSelector((state) => state.navbar);

  // access the user state from the store
  const user = useSelector((state) => state.user);

  useEffect(() => {
    function handleResize() {
      // track when screensize exceeds 768px or falls under it
      const md = window.innerWidth;
      // when screensize is >= 768, hide the burger and
      // close the hidden menu (if it is open)
      md >= 768 ? dispatch(bothHidden()) : dispatch(burgerShownMenuHidden());
    }
    // set resize listener
    // this will create event bindings of handleResize which can seriously affect
    // performance if you resize the screen often enough forcing excessive rerendering
    window.addEventListener("resize", handleResize);

    // return cleanup function to remove the event listener once it is used
    return () => {
      // remove resize listener
      window.removeEventListener("resize", handleResize);
    };
  });

  const mobileBurger = (
    <div className={`${navbar.burger} md:hidden flex items-center gap-2`}>
      <Link
        to="/user"
        className={user.logged ? "user-logged-in" : "user-not-logged-in"}
      >
        <svg
          className="w-6 h-6 "
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          />
        </svg>
      </Link>
      <button
        className="outline-none hover:bg-blue-900 transition duration-300"
        onClick={() => dispatch(toggle())}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>
  );

  return (
    <React.Fragment>
      {/* Navbar goes here  text-white temporary*/}
      <nav className="bg-blue-500 shadow-lg text-white">
        <div className="px-4 py-4">
          <div className="flex mx-4 justify-between space-x-7">
            <div className="flex">
              {/* Website Logo */}
              <div className="flex mr-8">
                <div className="flex items-center mr-2">
                  <img
                    src="/assets/task-list-white.svg"
                    alt="task-list logo"
                    className="h-10 w-10 "
                  ></img>
                </div>
              </div>
              {/* Primary Navbar items */}
              <div className="hidden md:flex items-center space-x-1">
                <Link
                  to="/"
                  className="p-2 text-white rounded hover:bg-blue-900 font-bold transition duration-300 cursor-pointer"
                >
                  Home
                </Link>
                <Link
                  to="/subscribe"
                  className="p-2 text-white rounded hover:bg-blue-900
                  font-bold transition duration-300 cursor-pointer"
                >
                  Subscribe
                </Link>

                <Link
                  to="/contact"
                  className="p-2 text-white rounded hover:bg-blue-900
                  font-bold transition duration-300 cursor-pointer"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            {/* Secondary Navbar items  */}
            <div className="hidden md:flex justify-end items-center  space-x-3 ">
              <Link
                to="/register"
                className="p-2 font-bold text-white rounded hover:bg-blue-900
                transition duration-300 cursor-pointer"
              >
                Register
              </Link>
              <Link
                to="/user"
                className={
                  user.logged ? "user-logged-in" : "user-not-logged-in"
                }
              >
                <svg
                  className="w-6 h-6 "
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
            {/* generate the mobile Link if under the specified conditions */}
            {(navbar.burger === "") & (navbar.menu === "hidden")
              ? mobileBurger
              : ""}
            {/* Mobile menu */}
            <div className={`${navbar.menu} md:hidden`}>
              <ul className="">
                <li className="flex justify-end py-2">{mobileBurger}</li>

                <li className="">
                  <Link
                    to="/"
                    className="block text-sm px-2 py-2 font-bold text-white
                    rounded hover:bg-blue-900 transition duration-300 cursor-pointer"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/subscribe"
                    className="block text-sm px-2 py-2 font-bold text-white
                    rounded hover:bg-blue-900 transition duration-300 cursor-pointer"
                  >
                    Subscribe
                  </Link>
                </li>
                <li></li>
                <li>
                  <Link
                    to="/contact"
                    className="block text-sm px-2 py-2 font-bold text-white
                    rounded hover:bg-blue-900 transition duration-300 cursor-pointer"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="block text-sm px-2 py-2 font-bold text-white
                    rounded hover:bg-blue-900 transition duration-300 cursor-pointer"
                  >
                    Register
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
}
