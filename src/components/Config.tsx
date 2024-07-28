import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../context";
import Layout from "./Layout";

// Config component for setting store name and admin password
const Config: React.FC = () => {
  const [storeName, setStoreName] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const { setStoreName: stName, setHasSetup } = useAppContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("storeName", storeName);
    localStorage.setItem("adminPassword", adminPassword);
    localStorage.setItem("isAdmin", "true");
    localStorage.setItem("hasSetup", "true");
    toast.success("Config saved successfully!");
    stName(storeName);
    setHasSetup(true);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label
          htmlFor="storeName"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Store Name
        </label>
        <input
          id="storeName"
          type="text"
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
          placeholder="Store Name"
          required
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="adminPassword"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Admin Password
        </label>
        <input
          id="adminPassword"
          type="password"
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.target.value)}
          placeholder="Admin Password"
          required
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center justify-center bg-slate-800 text-white px-4 py-2 rounded-md text-sm font-medium"
      >
        Save Details
      </button>
    </form>
  );
};

// Login component for admin login
const Login: React.FC = () => {
  const [password, setPassword] = useState("");
  const { setIsAdmin } = useAppContext();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPassword = localStorage.getItem("adminPassword");
    if (password === storedPassword) {
      localStorage.setItem("isLoggedIn", "true");
      setIsAdmin(true);
      window.location.href = "/admin";
    } else {
      toast.error("Incorrect password");
    }
  };

  return (
    <Layout>
      <div className="space-y-4 my-40">
        <form
          onSubmit={handleLogin}
          className="w-96 mx-auto rounded-lg p-6 border flex flex-col gap-4"
        >
          <div className="space-y-2">
            <label
              htmlFor="adminPassword"
              className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Admin Password
            </label>
            <input
              id="adminPassword"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin Password"
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-6 py-2 justify-center rounded-md text-sm font-medium bg-slate-800 text-white"
          >
            Login
          </button>
        </form>
      </div>
    </Layout>
  );
};

export { Config, Login };
