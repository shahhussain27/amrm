"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Auth } from "../utils/auth";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (Auth.isAuthenticated()) {
      router.push("/");
    }
  }, [router]);

  const handleLogin = () => {
    if (Auth.login(username, password)) {
      router.push("/");
    } else {
      setError("Invalid username or password!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Login</h1>

      <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-80">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-3 rounded bg-gray-700 outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-700 outline-none"
        />

        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded font-semibold"
        >
          Login
        </button>
      </div>
    </div>
  );
}
