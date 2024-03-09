import React from "react";
import avatar from "../assets/avatar.png";
function Profile() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 container mx-auto mt-8">
        {/* Personal Details Column */}
        <div className="md:col-span-1">
          <div className="bg-white p-8 shadow-md rounded-md h-full">
            <h2 className="text-2xl font-bold mb-4">Personal Details</h2>

            {/* Avatar */}
            <div className="mb-4">
              <img
                src={avatar}
                alt="User Avatar"
                className="w-20 h-20 rounded-full"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-600"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>

            {/* LinkedIn */}
            <div className="mb-4">
              <label
                htmlFor="linkedin"
                className="block text-sm font-medium text-gray-600"
              >
                LinkedIn
              </label>
              <input
                type="text"
                id="linkedin"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-1 space-y-8">
          {/* Solved Problems Card */}
          {/* // Inside the Solved Problems Card */}
          <div className="bg-white p-8 shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4">Solved Problems</h2>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-500">150</p>
                <p className="text-gray-600">Total Solved</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-500">75%</p>
                <p className="text-gray-600">Success Rate</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-500">20 min</p>
                <p className="text-gray-600">Avg Time/Problem</p>
              </div>
            </div>

            {/* Additional Content */}
            {/* Add content for the solved problems card */}
          </div>
          {/* Recently Solved Questions Card */}
          <div className="bg-white p-8 shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4">
              Recently Solved Questions
            </h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4 border-b">Question</th>
                  <th className="py-2 px-4 border-b">Difficulty</th>
                  <th className="py-2 px-4 border-b">Date Solved</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b">Two Sum</td>
                  <td className="py-2 px-4 border-b">Easy</td>
                  <td className="py-2 px-4 border-b">2022-03-09</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">Reverse Linked List</td>
                  <td className="py-2 px-4 border-b">Medium</td>
                  <td className="py-2 px-4 border-b">2022-03-08</td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
