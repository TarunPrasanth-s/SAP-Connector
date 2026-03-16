import { useState } from "react";
import type { User } from "@/types/user";

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const loadUser = async (fetchFn: () => Promise<User>) => {
    setLoading(true);
    try {
      const data = await fetchFn();
      setUser(data);
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, loadUser, setUser };
}
