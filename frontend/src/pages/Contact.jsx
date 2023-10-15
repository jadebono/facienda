// sends emails to mailtrap.io
import React, { useState, useEffect } from "react";
import { postContactForm } from "../modules/requests";
import { useDispatch } from "react-redux";
import { setNotification } from "../store/NotificationsSlice";

export default function Contact() {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    subject: "",
    body: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Contact us";
  }, []);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFields((prevFields) => {
      return { ...prevFields, [name]: value };
    });
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    const response = await postContactForm(fields);
    if (response === true) {
      dispatch(
        setNotification({
          type: "success",
          message: "Your email has been submitted!",
        })
      );
    } else {
      dispatch(
        setNotification({
          type: "error",
          message: "An error has occurred!",
        })
      );
    }
    setFields((prevState) => {
      return {
        name: "",
        email: "",
        subject: "",
        body: "",
      };
    });
  }

  return (
    <React.Fragment>
      <div className="flex justify-center mt-5 mb-20 md:mb-10">
        <div className="flex-col flex justify-center items-center w-4/5 md:w-1/3 bg-blue-50 rounded-2xl border-2 border-blue-900">
          <div className="my-2 text-xl  uppercase text-blue-900 font-bold">
            Contact Us
          </div>

          <div className="my-2 text-center text-sm font-semibold  text-blue-900">
            We'll get back to you as soon as possible.{" "}
          </div>
          <form
            className="bg-blue-50 w-5/6 m-4 rounded-xl   flex flex-col justify-center text-blue-900 font-semibold "
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col ml-4 my-2">
              <label className="" htmlFor="name">
                Name and surname: <p className="inline-block">*</p>
              </label>
            </div>
            <div className="flex flex-col">
              <input
                required
                name="name"
                type="text"
                value={fields.name || ""}
                onChange={handleChange}
                className="ml-4 w-2/3 border border-blue-900 rounded-md shadow-sm p-1 "
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
                value={fields.email || ""}
                onChange={handleChange}
                className="ml-4 w-2/3 border border-blue-900 rounded-md shadow-sm p-1"
              />
            </div>
            <div className="flex flex-col mt-4 ml-4 mb-2">
              <label className="" htmlFor="subject">
                Subject: <p className="inline-block">*</p>
              </label>
            </div>
            <div className="flex flex-col">
              <input
                required
                name="subject"
                type="text"
                value={fields.subject || ""}
                onChange={handleChange}
                className="ml-4 w-2/3 border border-blue-900 rounded-md shadow-sm p-1"
              />
            </div>
            <div className="flex flex-col mt-4 ml-4 mb-2">
              <label className="" htmlFor="body">
                Text: <p className="inline-block">*</p>
              </label>
            </div>
            <div className="flex flex-col">
              <textarea
                rows="5"
                required
                name="body"
                type="text"
                value={fields.body || ""}
                onChange={handleChange}
                className="ml-4 w-5/6 border border-blue-900 rounded-md shadow-sm p-1"
              />
            </div>
            <div className="flex flex-row my-4 justify-around">
              <button className="btn-gen">Submit</button>
            </div>
          </form>
          <p className="mb-4 text-center text-blue-900 font-bold">
            *{" "}
            <span className="text-blue-900 font-normal">
              Required Information
            </span>
          </p>
        </div>
      </div>{" "}
    </React.Fragment>
  );
}
