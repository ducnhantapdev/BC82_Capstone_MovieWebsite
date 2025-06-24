import React from "react";

export default function DasboardLayout({ children }) {
  return (
    <div>
      <div className="flex min-h-screen bg-gray-100">
        <aside className="w-64 bg-[#001529] text-white">
          <div className="p-4 font-bold text-xl border-b border-gray-700">
            CYBERLEARN
          </div>
          <nav className="mt-4">
            <ul>
              <li className="px-6 py-3 hover:bg-[#1890ff] cursor-pointer">
                Users
              </li>
              <li className="px-6 py-3 bg-[#1890ff]">Films</li>
              <li className="px-6 py-3 hover:bg-[#1890ff] cursor-pointer">
                Add new
              </li>
              <li className="px-6 py-3 hover:bg-[#1890ff] cursor-pointer">
                Showtime
              </li>
            </ul>
          </nav>
        </aside>
        <div className="">{children}</div>
      </div>
    </div>
  );
}
