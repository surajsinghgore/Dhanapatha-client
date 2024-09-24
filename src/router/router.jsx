import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import CommonLayout from "../layout/CommonLayout";
import Login from "../pages/auth/Login";
import HomePage from "../pages/dashboard/HomePage";
import UserProtected from "../layout/UserProtected";
import AuthProtected from "../layout/AuthProtected";
import Register from "../pages/auth/Register";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <MainHomePage />,
    element: <Root />,
  },

  {
    path: "/auth",
    element: <AuthProtected />,
    children: [
      {
        path: "login",
        element: (
          <CommonLayout>
            <Login />
          </CommonLayout>
        ),
      },
      {
        path: "register",
        element: (
          <CommonLayout>
            <Register />
          </CommonLayout>
        ),
      },
    ],
  },
  {
    path: "/user",
    element: <UserProtected />,
    children: [
      {
        path: "dashboard",
        element: (
          <CommonLayout>
            <HomePage />
          </CommonLayout>
        ),
      },
    ],
  },
]);

export default router;
