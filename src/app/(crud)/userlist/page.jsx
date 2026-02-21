"use client";

import { useCart } from "@/context/CartContext";
import axios from "axios";
import React, { useEffect, useState } from "react";

function page() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [triger, setTriger] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const totalPages = Math.ceil(users.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  //delete user
  const handleDelete = (id) => {
    axios
      .delete(`/api/deleteUser/${id}`)
      .then((response) => {
        console.log("user deleted", response);
        setTriger((prev) => (prev += 1));
      })
      .catch((err) => {
        console.error("axios delete error-->", err);
      });
  };

  useEffect(() => {
    axios
      .get("/api/userList")
      .then((userList) => {
        console.log("userList -->", userList);

        setUsers(userList.data);

        setIsLoading(false);
      })
      .catch((err) => {
        console.error("axios fetching error-->", err);
      });
  }, [triger]);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      {isLoading ? (
        <>
          <div className="w-full min-h-screen mx-auto bg-gray-900 text-white p-9 rounded-xl flex flex-col justify-center items-center gap-5">
            <div className="flex w-96 flex-col gap-6">
              <div className="skeleton h-40 w-full"></div>
              <div className="skeleton h-5 w-36"></div>
              <div className="skeleton h-5 w-full"></div>
              <div className="skeleton h-5 w-full"></div>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full min-h-screen mx-auto bg-gray-900 text-white p-9 rounded-xl flex flex-col justify-center items-center gap-5">
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-400">
            User List ({users.length})
          </h2>

          <ul className="flex flex-col flex-wrap gap-6 w-full px-40 py-10">
            {currentUsers.map((user) => (
              <li
                key={user._id}
                className="flex items-center justify-between bg-gray-800 border border-gray-700 rounded-xl shadow-md hover:shadow-lg transition-all px-6 py-4 gap-4 hover:scale-[1.01]"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-8 w-full">
                  <p className="text-sm text-gray-400">
                    <span className="font-medium text-white">Email:</span>{" "}
                    {user.email}
                  </p>
                  <p className="text-sm text-gray-400">
                    <span className="font-medium text-blue-300">Name:</span>{" "}
                    {user.name}
                  </p>
                  <p className="text-sm text-gray-400">
                    <span className="font-medium text-teal-300">City:</span>{" "}
                    {user.city}
                  </p>
                </div>

                <div className="flex gap-2">
                  <a
                    href={`/updateuser/${user._id}`}
                    className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-500 text-white rounded-md transition"
                  >
                    Edit
                  </a>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="px-3 py-1 text-sm bg-red-600 hover:bg-red-500 text-white rounded-md transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* 🔢 Pagination Controls */}
          <div className="flex justify-center items-center gap-4 pb-10">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50"
            >
              ⬅️ Previous
            </button>

            <span className="text-white">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50"
            >
              Next ➡️
            </button>
          </div>
          <a
            href="/adduser"
            className="px-3 p-2 text-sm bg-blue-600 hover:bg-blue-500 text-white rounded-md transition"
          >
            Add User
          </a>
        </div>
      )}
    </div>
  );
}

export default page;
