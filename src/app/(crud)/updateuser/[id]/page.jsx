"use client";

import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function page({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");


  //fetch editing user's details to fill input fields
  useEffect(() => {
    axios.post(`/api/updateUser/${id}`)
    .then((user) => {
        console.log(user.data.user.email);
        
        setEmail(user.data.user.email)
        setName(user.data.user.name)
        setCity(user.data.user.city)
    })
    .catch((err) => console.log("axios update user error-->", err)
    )
  }, [])


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/updateUser/${id}`, { email, name, city})
    .then((user) => {
        console.log("updated user-->", user.data.user.email);
        
        setEmail(user.data.user.email)
        setName(user.data.user.name)
        setCity(user.data.user.city)
        router.push("/userlist")
    })
    .catch((err) => console.log("error while updating user-->", err)
    )
  }


  return (
    <>
      <div className="w-full flex justify-center items-center min-h-screen bg-gray-900 px-4 py-12">
        <form
            onSubmit={handleSubmit}
          className="w-full max-w-md p-8 rounded-2xl bg-gray-800 shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-transform transform hover:shadow-gray-900"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8 tracking-wide">
            Edit User
          </h2>

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-semibold text-gray-300"
            >
              Your Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              id="email"
              placeholder="name@example.com"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-semibold text-gray-300"
            >
              Your Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              id="name"
              placeholder="John Doe"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="city"
              className="block mb-2 text-sm font-semibold text-gray-300"
            >
              Your City
            </label>
            <input
              onChange={(e) => setCity(e.target.value)}
              value={city}
              type="text"
              id="city"
              placeholder="New York"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-500"
          >
            Update
          </button>
        </form>
      </div>
    </>
  );
}

export default page;
