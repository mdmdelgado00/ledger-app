import { createBrowserRouter, Navigate } from "react-router-dom";
import { GeneralLayout } from "./layout/generalLayout";
import AuthPage from "./pages/authPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: /*<GeneralLayout />*/ <AuthPage />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: "dashboard", element: <div>Dashboard Page</div> },
      { path: "transactions", element: <div>Transactions Page</div> },
      { path: "categories", element: <div>Category Page</div> },
      { path: "budgets", element: <div>Budgets Page</div> },
      { path: "reports", element: <div>Reports Page</div> },
      { path: "settings", element: <div>Settings Page</div> },
    ],
  },
]);
