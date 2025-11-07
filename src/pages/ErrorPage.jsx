import React from "react";
import { useRouteError } from "react-router";
const Error = () => {
  const errorData = useRouteError();
  return (
    <>
      {/* Top nav / breadcrumbs */}
      <header className="bg-white border-b border-red-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="text-sm text-gray-600 hover:underline">
            &lt; Back
          </a>
        </div>
      </header>
      <div>somthing went wrong {errorData.status}</div>
    </>
  );
};

export default Error;
