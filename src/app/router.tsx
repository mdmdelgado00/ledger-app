import { AuthGate } from "@features/auth/AuthGate";
import { RequireAuth } from "@features/auth/RequireAuth";
import TransactionPage from "@features/transactions/pages/transactionPage";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { GeneralLayout } from "./layout/generalLayout";
import { AuthCallbackPage } from "./pages/authCallback";
import AuthPage from "./pages/authPage";

export const router = createBrowserRouter([
  {
    path: "/auth",
    element: (
      <AuthGate>
        <AuthPage />
      </AuthGate>
    ),
  },
  {
    path: "/auth/callback",
    element: <AuthCallbackPage />,
  },
  {
    path: "/",
    element: <RequireAuth />,
    children: [
      {
        element: <GeneralLayout />,
        children: [
          { index: true, element: <Navigate to="/dashboard" replace /> },
          { path: "dashboard", element: <div>Dashboard Page</div> },
          { path: "transactions", element: <TransactionPage /> },
          { path: "categories", element: <div>Category Page</div> },
          { path: "budgets", element: <div>Budgets Page</div> },
          { path: "reports", element: <div>Reports Page</div> },
          { path: "settings", element: <div>Settings Page</div> },
        ],
      },
    ],
  },
]);
