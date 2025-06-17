import { Button } from "@/components/ui/button";
import { PATH } from "@/routes/path";
import React from "react";
import { Outlet } from "react-router-dom";

export default function HomeLayout({ children }) {
  return (
    <div className="bg-black text-white min-h-screen font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-black via-black/80 to-transparent px-8 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-red-600">MovieHub</h1>
        <nav className="space-x-6 text-lg">
          <a href="#" className="hover:text-red-400">
            Home
          </a>
          <a href="#" className="hover:text-red-400">
            Movies
          </a>
          <a href="#" className="hover:text-red-400">
            My List
          </a>
        </nav>
      </header>

      {/* <Outlet /> */}
      {children}
      {/* Footer */}
      <footer className="bg-gray-900 mt-16 px-8 py-12 text-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-xl font-semibold mb-4 text-red-500">
              MovieHub
            </h4>
            <p className="text-sm">
              Trang web xem phim online với giao diện hiện đại, tốc độ cao, chất
              lượng HD. Cập nhật phim mới mỗi ngày.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Liên kết</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Trang chủ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Phim lẻ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Phim bộ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Thể loại
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Theo dõi chúng tôi</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white">
                Facebook
              </a>
              <a href="#" className="hover:text-white">
                YouTube
              </a>
              <a href="#" className="hover:text-white">
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-500">
          © 2025 MovieHub. Thiết kế bởi bạn & ChatGPT
        </div>
      </footer>
    </div>
  );
}
