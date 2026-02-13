"use client";

import React, { createContext, useEffect, useMemo, useState } from "react";
import type { User } from "firebase/auth";
import { initAuthPersistence, subscribeToAuth } from "@/lib/firebase/auth";

type AuthState = {
  user: User | null;
  loading: boolean;
  error: string | null;
};

export const AuthContext = createContext<AuthState>({
  user: null,
  loading: true,
  error: null,
});

/**
 * MycoVision — Educational + documentation support only.
 * Do not store PHI. Use synthetic examples only.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let unsub: (() => void) | null = null;

    (async () => {
      try {
        await initAuthPersistence();
        unsub = subscribeToAuth((u) => {
          setUser(u);
          setLoading(false);
        });
      } catch (e: any) {
        console.error("Auth init error:", e);
        setError("Auth failed to initialize. Check Firebase config in .env.local.");
        setLoading(false);
      }
    })();

    return () => {
      if (unsub) unsub();
    };
  }, []);

  const value = useMemo(() => ({ user, loading, error }), [user, loading, error]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
