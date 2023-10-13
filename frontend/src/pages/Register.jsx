import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "../store/NotificationsSlice";
import { postRegister } from "../modules/requests";

/*
Registration policy
(1) Password must contain must contain at least one uppercase character, one lowercase character, one digit, one symbol, between 16 and 128 characters and must not contain any whitespace;
(2) Password will be hashed but not encrypted;
(3) Username has to be unique. If it is not unique, prevent registration and inform registrant that registration has been stopped because the username has already been registered;
(4) Email has to be unique. If it is not unique, prevent registration but only inform registrant that his registration has been stopped because one of his credentials has already been registered. This will protect the privacy of the email account that has already been registered;
(5) If both username and email have been registered, tell registrant that the registration has been stopped because one or more of his credentials has already been registered. This will protect the privacy of the email account that has already been registered.
(6) Name, Surname, Username, Email & Currency fields will each be encrypted with a secret key and a secret initVector to preserve registrant privacy in case of a database hack or leak.
*/

export default function Register() {
  const [register, setRegister] = useState({
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
    passwordTwo: "",
  });

  const dispatch = useDispatch();

  // Function to test password.
  function checkPasswordValidation(password) {
    const test =
      /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹]).{16,128}$/;
    const validPassword = new RegExp(test);
    return validPassword.test(password) ? true : false;
  }

  /* function for password notification if password is invalid or passwords do not 
  match. Do not tell the user what went wrong */
  function passwordNotify() {
    dispatch(
      setNotification({
        type: "error",
        message:
          "There is a problem with your password. Please try another one.",
      })
    );
  }

  function handleRegisterChange(evt) {
    const { name, value } = evt.target;
    setRegister((prevMyReg) => {
      return {
        ...prevMyReg,
        [name]: value,
      };
    });
  }

  // async function to submit registration data
  async function submitRegister(evt) {
    evt.preventDefault();
    // (1) check that the password is legitimate
    // (2) check that password and passwordTwo are identical
    const isPasswordValid = checkPasswordValidation(register.password);
    const arePasswordsIdentical = register.password === register.passwordTwo;
    // notify if passwords are valid or not
    if (isPasswordValid && arePasswordsIdentical) {
      // transmit register to axios post request
      const response = await postRegister(register);
      console.log(`response is ${response}`);
      if (response === "bothTaken") {
        dispatch(
          setNotification({
            type: "warning",
            message:
              "One or more of your supplied credentials has already been registered",
          })
        );
      } else if (response === "registered") {
        dispatch(
          setNotification({
            type: "success",
            message: "You have successfully registered! Please sign in.",
          })
        );
      } else if (response === "usernameTaken") {
        dispatch(
          setNotification({
            type: "warning",
            message: "Username already registered.",
          })
        );
      } else if (response === "emailTaken") {
        dispatch(
          setNotification({
            type: "warning",
            message: "One of your credentials has already been registered.",
          })
        );
      } else {
        dispatch(
          setNotification({
            type: "error",
            message:
              "There was an error with your registration! Please try again.",
          })
        );
      }

      setRegister((prevRegister) => {
        return {
          name: "",
          surname: "",
          username: "",
          email: "",
          password: "",
          passwordTwo: "",
        };
      });
    } else {
      // if password is invalid and/or passowords do not match
      passwordNotify();
      setRegister((prevRegister) => {
        return {
          name: "",
          surname: "",
          username: "",
          email: "",
          password: "",
          passwordTwo: "",
        };
      });
    }
  }

  return (
    <React.Fragment>
      <div className="m-auto mb-20 flex flex-col w-5/6 md:w-1/2 h-full mt-5 border-2 border-blue-900 bg-blue-50 rounded-2xl">
        <div className="my-2 text-xl text-blue-900 font-bold text-center">
          New to Facienda?
        </div>
        <div className="mb-2 text-center text-lg font-semibold  text-blue-900">
          Register
        </div>
        <form
          className="bg-blue-50 w-5/6 m-auto rounded-xl flex flex-col justify-center text-blue-900  font-semibold "
          onSubmit={submitRegister}
        >
          <div className="flex flex-col ml-4 my-2">
            <label className="" htmlFor="name">
              Name: <p className="inline-block">*</p>
            </label>
          </div>
          <div className="flex flex-col">
            <input
              required
              name="name"
              type="text"
              value={register.name || ""}
              onChange={handleRegisterChange}
              className="ml-4 w-2/3 border border-blue-900 rounded-md shadow-sm p-1"
            />
          </div>
          <div className="flex flex-col ml-4 my-2">
            <label className="" htmlFor="surname">
              Surname: <p className="inline-block">*</p>
            </label>
          </div>
          <div className="flex flex-col">
            <input
              required
              name="surname"
              type="text"
              value={register.surname || ""}
              onChange={handleRegisterChange}
              className="ml-4 w-2/3 border border-blue-900 rounded-md shadow-sm p-1"
            />
          </div>
          <div className="flex flex-col ml-4 my-2">
            <label className="" htmlFor="username">
              Username: <p className="inline-block">*</p>
            </label>
          </div>
          <div className="flex flex-col">
            <input
              required
              name="username"
              type="text"
              value={register.username || ""}
              onChange={handleRegisterChange}
              className="ml-4 w-2/3 border border-blue-900 rounded-md shadow-sm p-1"
            />
          </div>
          <div className="flex flex-col mt-4 ml-4 mb-2">
            <label className="" htmlFor="email">
              Email: <p className="inline-block">*</p>
            </label>
          </div>
          <div className="flex flex-col">
            <input
              required
              name="email"
              type="email"
              value={register.email || ""}
              onChange={handleRegisterChange}
              className="ml-4 w-2/3 border border-blue-900 rounded-md shadow-sm p-1"
            />
          </div>
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
              value={register.password || ""}
              onChange={handleRegisterChange}
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
              value={register.passwordTwo || ""}
              onChange={handleRegisterChange}
              className="ml-4 w-2/3 border border-blue-900 rounded-md shadow-sm p-1"
            />
          </div>

          <div className="flex flex-row my-4 justify-around">
            <button className="btn-gen">Register</button>
          </div>
        </form>
        <p className="my-4 text-center text-blue-900  font-bold">
          *{" "}
          <span className="text-blue-700 font-normal">
            Required Information
          </span>
        </p>
      </div>
    </React.Fragment>
  );
}
