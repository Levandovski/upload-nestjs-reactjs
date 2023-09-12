import { ReactNode } from "react";
import { Upload } from "../pages";
import { Navigate } from "react-router-dom";

interface IRouter {
  path: string;
  element: ReactNode;
  errorElement?: ReactNode;
}

const Routers: IRouter[] = [
  {
    path: "/",
    element: <Navigate to="/upload" />,
  },
  {
    path: "/upload",
    element: <Upload />,
  },
];

export default Routers;
