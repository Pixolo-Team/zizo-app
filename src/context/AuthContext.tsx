"use client";

// REACT //
import React, { createContext, useContext, useEffect, useState } from "react";

// SERVICES //
import { createIdentityRequest } from "@/services/queries/identity.query";

interface AuthContextData {
  identityId: string | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export function AuthProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Define States
  const [identityId, setIdentityId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Define Use Effect
  useEffect(() => {
    /** Initialize Authentication */
    const initAuth = async () => {
      try {
        // 1. Check Local Storage
        const storedId = localStorage.getItem("zizo-id");

        // If found - then set
        if (storedId) {
          setIdentityId(storedId);
          setIsLoading(false);
          return;
        }

        // 2. Create new Identity if not found
        const { data: newId, error } = await createIdentityRequest();

        if (error || !newId) {
          console.error("Failed to create identity:", error);
          // We can retry or handle error appropriately, for now just stop loading
          setIsLoading(false);
          return;
        }

        // 3. Store new ID
        localStorage.setItem("zizo-id", newId);
        setIdentityId(newId);
      } catch (error) {
        console.error("Auth initialization error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const value = React.useMemo(
    () => ({ identityId, isLoading }),
    [identityId, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
