import { supabase } from "@lib/dbConnection";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext } from "react";

type Space = {
  id: string | null;
  isLoading: boolean;
  setSpace: (spaceId: string) => void;
};

const SpaceContext = createContext<Space | null>(null);

async function fetchActiveSpace(): Promise<string | null> {
  const { data: auth, error: authErr } = await supabase.auth.getUser();

  if (authErr) throw authErr;
  const userId = auth.user?.id;
  if (!userId) return null;

  const { data: profile, error: profileErr } = await supabase
    .from("profiles")
    .select("last_active_space_id, default_space_id")
    .eq("id", userId)
    .maybeSingle();

  if (profileErr) throw profileErr;

  const preffered = profile?.last_active_space_id ?? profile?.default_space_id;
  if (preffered) return preffered;

  const { data: membership, error: memErr } = await supabase
    .from("space_members")
    .select("space_id")
    .eq("user_id", userId)
    .limit(1);

  if (memErr) throw memErr;

  return membership?.[0]?.space_id ?? null;
}

async function persistActiveSpace(spaceId: string) {
  const { data: auth, error: authErr } = await supabase.auth.getUser();
  if (authErr) throw authErr;
  const userId = auth.user?.id;
  if (!userId) return;

  const { error } = await supabase
    .from("profiles")
    .update({ last_active_space_id: spaceId })
    .eq("id", userId);
  if (error) throw error;
}

export function SpaceProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();

  const { data: spaceId, isLoading } = useQuery({
    queryKey: ["activeSpace"],
    queryFn: fetchActiveSpace,
    staleTime: 60_000,
  });

  const mutation = useMutation({
    mutationFn: persistActiveSpace,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activeSpace"] });
    },
  });

  const setSpace = (id: string) => {
    mutation.mutate(id);
  };

  return (
    <SpaceContext.Provider value={{ id: spaceId, isLoading, setSpace }}>
      {children}
    </SpaceContext.Provider>
  );
}

export function useSpace() {
  const context = useContext(SpaceContext);
  if (!context) {
    throw new Error("useSpace must be used within a SpaceProvider");
  }
  return context;
}
