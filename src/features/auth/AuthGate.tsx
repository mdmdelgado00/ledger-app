import { useAuth } from "@features/auth/authProvider";
import { Navigate } from "react-router-dom";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
}
