import React, { useEffect } from "react";

export default function Error404() {
  useEffect(() => {
    document.title = "Error 404";
  }, []);

  return (
    <React.Fragment>
      <div className="ml-4 mb-20 md:mb-10 text-blue-900">
        <h1 className="text-5xl mt-10">404 Not Found</h1>
        <h1 className="text-3xl mt-5 ">
          The page or resource you were looking for does not exist.{" "}
        </h1>
        <p className=" text-lg mt-5 mr-4 text-justify">
          Quote The 404 (Not Found) status code indicates that the origin server
          did not find a current representation for the target resource or is
          not willing to disclose that one exists. A 404 status code does not
          indicate whether this lack of representation is temporary or
          permanent. Unquote
        </p>
        <div className="flex flex-row justify-start mt-2">
          <p className=" font-bold">Source:</p>
          <a
            href="https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.4"
            className="ml-2 underline "
            rel="noreferrer"
            target="_blank"
          >
            Hypertext Transfer Protocol (HTTP/1.1): Semantics and Content
            specification, at the Internet Engineering Task Force
          </a>
        </div>
        <div className="">
          <h1 className="text-3xl mt-10 ">Why does this happen? </h1>
          <ol className="list-decimal ml-4 mt-2">
            <li>You mistyped a url link;</li>
            <li>You ran into a broken link;</li>
            <li>You clicked on a broken link returned by a search engine;</li>
            <li>You clicked on a broken link on another site.</li>
          </ol>
          <div className="">
            <h1 className="text-3xl mt-10 ">What can you do? </h1>
            <p className=" text-lg mt-5 mr-4 text-justify">
              Use the navigation bar to return home or to some other section of
              the site. You may also use the contact form to let us know about
              the error and its cause.
            </p>
          </div>{" "}
        </div>
      </div>
    </React.Fragment>
  );
}
