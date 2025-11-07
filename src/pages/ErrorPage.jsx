import React from "react";
import { useRouteError } from "react-router";
const Error = () => {
  const errorData = useRouteError();
  return <div>somthing went wrong {errorData.status}</div>;
};

export default Error;
