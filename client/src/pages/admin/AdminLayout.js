import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import path from "ultils/path";
import { useSelector } from "react-redux";
import { AdminSidebar } from "components";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";


const AdminLayout = () => {
  const [isShow, setIsShow] = useState(false);
  const { isLoggedIn, current } = useSelector((state) => state.user);
  if (!isLoggedIn || !current || +current.role !== 1945)
    return <Navigate to={`/${path.LOGIN}`} replace={true} />;
  return (
    <div className="flex w-full bg-gray-100 min-h-screen relative text-gray-900 ">
      <Link to={`/${path.HOME}`} className="cursor-pointer z-10 absolute top-4 right-3 flex items-center gap-2 px-2 py-1 bg-yellow-600 rounded text-white hover:bg-yellow-500 hover:-translate-y-1 hover:scale-105 duration-300">
        <FaArrowLeft />
        Về trang chủ
      </Link>
      <div className={isShow ? "w-[20%]" : ""}>
        {isShow ? (
          <AdminSidebar setIsShow={setIsShow}/>
        ) : (
          <div
            onClick={() => {
              setIsShow(true);
            }}
            className="cursor-pointer z-10 absolute top-4 left-4 opacity-75 hover:-translate-y-1 hover:scale-110 hover:opacity-100 duration-300 "
          >
            <FaBars size={24} />
          </div>
        )}
      </div>
      <div className="w-[80%] flex-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
