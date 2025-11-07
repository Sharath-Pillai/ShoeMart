import React from "react";
import { useRouteError } from "react-router";
const ErrorPage = () => {
  const errorData = useRouteError();
  return <div>somthing went wrong {errorData.status}</div>;
};

export default ErrorPage;
