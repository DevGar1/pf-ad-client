/* eslint-disable react/prop-types */
import { RouterProvider } from "react-router-dom";
import { router } from "./route";

const Provider = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default Provider;
