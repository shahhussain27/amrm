"use client";

export const Auth = {
  login(username: string, password: string) {
    if (username === "admin" && password === "admin") {
      localStorage.setItem("auth", "true");
      return true;
    }
    return false;
  },

  logout() {
    localStorage.removeItem("auth");
  },

  isAuthenticated() {
    return typeof window !== "undefined" && localStorage.getItem("auth") === "true";
  },
};
