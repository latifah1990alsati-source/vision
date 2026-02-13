"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithGoogle } from "@/lib/firebase/auth";
import { useAuth } from "@/lib/auth/useAuth";

export default function LoginPage() {
  const router = useRouter();
  const { user, loading, error } = useAuth();
  const [busy, setBusy] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  if (!loading && user) {
    router.replace("/app");
    return null;
  }

  async function handleGoogle() {
    setLocalError(null);
    setBusy(true);
    try {
      await signInWithGoogle();
      router.replace("/app");
    } catch (e: any) {
      console.error(e);
      setLocalError("Google sign-in failed. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-lg border p-6 bg-white">
        <h1 className="text-2xl font-semibold">MycoVision</h1>
        <p className="text-sm text-gray-600 mt-2">
          Educational + documentation support only. No PHI. Human review required.
        </p>

        <div className="mt-6 space-y-3">
          {(error || localError) && (
            <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error || localError}
            </div>
          )}

          <button
            onClick={handleGoogle}
            disabled={busy}
            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white disabled:opacity-60"
          >
            {busy ? "Signing in..." : "Sign in with Google"}
          </button>

          <p className="text-xs text-gray-500">
            Do not enter patient names, MRNs, full DOB, or addresses.
          </p>
        </div>
      </div>
    </main>
  );
}
