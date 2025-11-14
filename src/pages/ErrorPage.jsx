import React from "react";
import { useRouteError } from "react-router";
import Backnavbar from "../components/common/Backnavbar";
const Error = () => {
  const errorData = useRouteError();
  return (
    <>
      {/* Top nav / breadcrumbs */}
      <Backnavbar/>
      <div>somthing went wrong {errorData.status}</div>
    </>
  );
};

export default Error;
