import { Button } from "@/components/ui/button";
import { PATH } from "@/routes/path";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function HomeLayout({ children }) {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate(PATH.LOGIN);
  };

  return (
    <div>
      <header className=" h-[70px] flex flex-col justify-center items-center border-b">
        <div className="container   mx-auto flex items-center justify-between  ">
          <div className="logo">CyberSoft</div>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={handleLogin}>
              Đăng Nhập
            </Button>
            <Button>Đăng Ký</Button>
          </div>
        </div>
      </header>
      {/* <Outlet /> */}
      {children}
      <footer>Footer</footer>
    </div>
  );
}
