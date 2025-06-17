import React from "react";

export default function DasboardLayout({ children }) {
  return (
    <div>
      <div className="w-full flex">
        <div className="w-[200px] h-full bg-gray-500">Sidebar</div>
        <div className="">{children}</div>
      </div>
    </div>
  );
}
