"use client";
import { useRouter } from "next/navigation";
import { ProtectedPage } from "./utils/ProtectedPage";
import { Auth } from "./utils/auth";

export default function Home() {
  const router = useRouter();

  const dashboards = [
    { id: "allStations", label: "All Stations" },
    { id: "ctqStations", label: "CTQ Stations" },
    { id: "managementReviews", label: "Management Reviews" },
  ];

  const handleLogout = () => {
    Auth.logout();
    router.push("/login");
  };

  return (
    <ProtectedPage>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <h1 className="text-3xl font-bold mb-8">
          Advance Manpower Review And Management
        </h1>
        <div className="flex gap-6">
          {dashboards.map((dash) => (
            <button
              key={dash.id}
              onClick={() => router.push(`/${dash.id}`)}
              className="px-6 py-3 bg-blue-600 rounded-xl hover:bg-blue-700 transition-all text-lg font-semibold shadow-lg"
            >
              {dash.label}
            </button>
          ))}
        </div>
        <button
          onClick={handleLogout}
          className="mt-8 px-5 py-2 bg-red-600 rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </ProtectedPage>
  );
}
