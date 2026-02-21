"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/register", { email, password, name })
      .then((result) => {
        console.log("axios says", result);
        Swal.fire({
          icon: "success",
          title: "Registerd successfuly",
          text: `you can login now...`,
        });
        router.push("/login");
      })
      .catch((error) => {
        console.log("registation ERROR:", error);
        Swal.fire({
          icon: "info",
          title: "Alredy registerd!",
          text: error.response.data.error + " try to login!",
        });
        router.push("/login");
      });

    setEmail("");
    setPassword("");
    setName("");
  };

  return (
    <>
      <div className="w-full flex justify-center items-center min-h-screen bg-gray-900 px-4 py-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-8 rounded-2xl bg-gray-800 shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-transform transform hover:shadow-gray-900"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8 tracking-wide">
            Register New Account
          </h2>

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-semibold text-gray-300"
            >
              Your Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-semibold text-gray-300"
            >
              Your Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-semibold text-gray-300"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex items-start mb-6">
            <input
              id="terms"
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
              required
            />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-300">
              I agree with the{" "}
              <a href="#" className="text-blue-400 hover:underline">
                terms and conditions
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-500"
          >
            Register
          </button>
          <div className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-500 hover:text-blue-400 font-medium transition duration-200"
            >
              Login
            </a>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
