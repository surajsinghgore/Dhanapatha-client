import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import CommonLayout from "../layout/CommonLayout";
import Login from "../pages/auth/Login";
import HomePage from "../pages/dashboard/HomePage";
import UserProtected from "../authorization/UserProtected";
import AuthProtected from "../authorization/AuthProtected";
import Register from "../pages/auth/Register";
import PaymentPage from "../pages/admin/payment/PaymentPage";
import ShowAllTransactionPage from "../pages/client/AllTranscation/ShowAllTransactionPage";
import PayPaymentPage from "../pages/client/payment/PayPaymentPage";
import UserProfile from "../pages/client/Profile/UserProfile";
import WalletPage from "../pages/client/Profile/WalletPage";
import SettingPage from "../pages/client/Profile/SettingPage";
import AddAccountForm from "../pages/client/Profile/AddAccountForm";

const router = createBrowserRouter([
  {
    path: "/",
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
        path: "signup",
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
      {
        path: "payment/:user",
        element: (
          <CommonLayout>
            <PaymentPage />
          </CommonLayout>
        ),
      },
      {
        path: "pay-payment/:user",
        element: (
          <CommonLayout>
            <PayPaymentPage />
          </CommonLayout>
        ),
      },
      {
        path: "all-transaction",
        element: (
          <CommonLayout>
            <ShowAllTransactionPage />
          </CommonLayout>
        ),
      },
      {
        path: "profile",
        element: (
          <CommonLayout>
            <UserProfile />
          </CommonLayout>
        ),
      },
      {
        path: "wallet",
        element: (
          <CommonLayout>
            <WalletPage />
          </CommonLayout>
        ),
      },
      {
        path: "setting",
        element: (
          <CommonLayout>
            <SettingPage />
          </CommonLayout>
        ),
      },
      {
        path: "add-account",
        element: (
          <CommonLayout>
            <AddAccountForm />
          </CommonLayout>
        ),
      },
    ],
  },
]);

export default router;
