import { supabase } from "@lib/dbConnection";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function AuthCallbackPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const run = async () => {
      const code = new URLSearchParams(window.location.search).get("code");
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          console.error("Error exchanging code for session:", error);
          navigate("/auth", { replace: true });
          return;
        }
      }

      const { data } = await supabase.auth.getSession();
      if (data.session) navigate("/dashboard", { replace: true });
      else navigate("/auth", { replace: true });
    };

    run();
  }, [navigate]);
  return <div>Loading...</div>;
}
