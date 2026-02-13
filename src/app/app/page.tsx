"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth/useAuth";
import { logout } from "@/lib/firebase/auth";

export default function AppHomePage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <main className="min-h-screen p-6">
        <p className="text-sm text-gray-600">Loading session…</p>
      </main>
    );
  }

  if (!user) return null;

  return (
    <main className="min-h-screen p-6">
      <header className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-xl font-semibold">MycoVision Dashboard</h1>
          <p className="text-xs text-gray-500">
            Educational + documentation support only. Human review required. No PHI.
          </p>
        </div>
        <button
          onClick={async () => {
            await logout();
            router.replace("/login");
          }}
          className="rounded-lg border px-3 py-2 text-sm"
        >
          Logout
        </button>
      </header>

      <section className="mt-6">
        <p className="text-sm">
          Signed in as: <span className="font-medium">{user.email || user.uid}</span>
        </p>

        <div className="mt-4 rounded-lg border p-4 bg-gray-50">
          <p className="text-sm font-medium">Next steps (coming soon)</p>
          <ul className="list-disc pl-5 text-sm text-gray-700 mt-2 space-y-1">
            <li>Create new case</li>
            <li>Upload microscopy images (KOH/Culture/LPCB)</li>
            <li>AI analysis + results review</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
