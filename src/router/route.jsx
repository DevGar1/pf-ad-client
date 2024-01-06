import { createBrowserRouter } from "react-router-dom";
import { Archivos, Home, Streaming, UploadFile } from "../home";
import Principal from "../Principal.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Principal />,

    children: [
      {
        path: "/",
        index: true,
        element: <Home />,
      },
      {
        path: "/archivos",
        element: <Archivos />,
      },
      {
        path: "/video/:file",
        element: <Streaming />,
      },
      {
        path: "/subir",
        element: <UploadFile />,
      },
    ],
  },
]);
