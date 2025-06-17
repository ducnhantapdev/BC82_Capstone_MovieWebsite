import React from "react";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gray-300">
      {children}
    </div>
  );
}
