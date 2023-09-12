import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Routers from "./routes";

const Router: React.FC = () => {
  const routers = createBrowserRouter(Routers);

  return <RouterProvider router={routers} />;
};

export default Router;
