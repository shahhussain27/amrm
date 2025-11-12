"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Auth } from "./auth";

export function ProtectedPage({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    if (!Auth.isAuthenticated()) {
      router.push("/login");
    }
  }, [router]);

  return <>{children}</>;
}
