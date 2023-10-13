import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { subscribeUser, unsubscribeUser } from "../modules/requests";
import { clearSubscriber, setSubscriber } from "../store/SubscribeSlice";
import { setNotification } from "../store/NotificationsSlice";

export default function Subscribe() {
  const dispatch = useDispatch();
  const subscriber = useSelector((state) => state.subscriber);

  useEffect(() => {
    document.title = "Newsletter";
  }, []);

  function handleSubscription(evt) {
    const { name, value } = evt.target;
    dispatch(setSubscriber({ [name]: value }));
  }

  async function submitSubscriber(evt) {
    evt.preventDefault();
    const response = await subscribeUser(subscriber);
    if (response === "Email is already subscribed!") {
      dispatch(
        setNotification({
          type: "error",
          message: response,
        })
      );
    } else if (response) {
      dispatch(
        setNotification({
          type: "success",
          message: "You have successfully subscribed to the newsletter.",
        })
      );
    } else {
      dispatch({
        type: "error",
        message: "Subscription failed! Please try again.",
      });
    }
    dispatch(clearSubscriber());
  }

  function handleUnsubscribe(evt) {
    const { value } = evt.target;
    dispatch(setSubscriber({ emailToUnsubscribe: value }));
  }

  async function submitUnsubscribe(evt) {
    evt.preventDefault();
    const response = await unsubscribeUser({
      email: subscriber.emailToUnsubscribe,
    });
    if (response === "That email is not subscribed!") {
      dispatch(
        setNotification({
          type: "error",
          message: response,
        })
      );
    } else if (response) {
      dispatch(
        setNotification({
          type: "success",
          message: "You have successfully unsubscribed from the newsletter.",
        })
      );
    } else {
      dispatch(
        setNotification({
          type: "error",
          message: "Unknown error.",
        })
      );
    }

    dispatch(clearSubscriber());
  }

  return (
    <React.Fragment>
      {/* Subscribe facility */}
      <div className="mx-4 my-4 border-2 border-blue-900 rounded-lg shadow-lg bg-blue-50 sm:mx-4 md:w-2/3 md:mx-auto">
        <form className="flex flex-col my-5">
          <div className="mb-4 text-center font-bold text-blue-900">
            Not a subscriber? Subscribe to our newsletter
          </div>
          <div className="mb-5 ml-2 sm:mx-auto">
            <label className="text-blue-900 font-bold" htmlFor="name">
              Name:
            </label>
            <input
              className="border border-blue-900 rounded-md ml-10"
              name="name"
              type="text"
              required
              value={subscriber.name || ""}
              onChange={handleSubscription}
            />
          </div>
          <div className="mb-5 ml-2 sm:mx-auto">
            <label className="text-blue-900 font-bold" htmlFor="surname">
              Surname:
            </label>
            <input
              className="border border-blue-900 rounded-md ml-4"
              name="surname"
              type="text"
              required
              value={subscriber.surname || ""}
              onChange={handleSubscription}
            />
          </div>
          <div className=" ml-2 sm:mx-auto">
            <label className="text-blue-900 font-bold" htmlFor="email">
              Email:
            </label>
            <input
              className="border border-blue-900 rounded-md ml-11"
              name="email"
              type="email"
              required
              value={subscriber.email || ""}
              onChange={handleSubscription}
            />
          </div>
          <button className="btn-gen" onClick={submitSubscriber}>
            Subscribe
          </button>
        </form>
      </div>
      {/* UnSubscribe facility */}
      <div className="mx-4 mt-4 border-2 border-blue-900 rounded-lg shadow-lg bg-blue-50 sm:mx-4 md:w-2/3 md:mx-auto">
        <form className="flex flex-col my-5">
          <div className="mx-4 mb-4 text-center font-bold text-blue-900">
            Unsubscribe
          </div>

          <div className="mx-4 sm:mx-auto">
            <label className="text-blue-900 font-bold" htmlFor="email">
              Email:
            </label>
            <input
              className="border border-blue-900 rounded-md ml-5"
              name="email"
              type="email"
              required
              value={subscriber.emailToUnsubscribe || ""}
              onChange={handleUnsubscribe}
            />
          </div>
          <button className="btn-gen" onClick={submitUnsubscribe}>
            Unsubscribe
          </button>
        </form>
      </div>
    </React.Fragment>
  );
}
