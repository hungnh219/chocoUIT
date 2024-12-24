import React, { memo, Fragment, useState } from "react";
// import logo from "assets/uit-cake-logo-white.png";
import logo from "assets/chocouit-removed-background.png";
import { adminSidebar } from "ultils/contants";
import { NavLink, Link } from "react-router-dom";
import clsx from "clsx";
import { AiOutlineCaretDown, AiOutlineCaretRight } from "react-icons/ai";
import { IoMdCloseCircle } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";

const activedStyle =
  "px-4 py-2 flex items-center gap-2  bg-gray-500 text-gray-100";
const notActivedStyle = "px-4 py-2 flex items-center gap-2  hover:bg-blue-100";

const AdminSidebar = ({ setIsShow }) => {
  const [actived, setActived] = useState([]);
  const handleShowTabs = (tabID) => {
    if (actived.some((el) => el === tabID))
      setActived((prev) => prev.filter((el) => el !== tabID));
    else setActived((prev) => [...prev, tabID]);
  };

  return (
    <div className="fixed z-10 top-0 bottom-0 bg-main w-[20%] h-full py-4">
      <div
        onClick={() => {
          setIsShow(false);
        }}
        className="absolute top-[-6px] right-[-4px] p-4 hover:text-red-600 hover:-translate-y-1 hover:scale-110 duration-300 cursor-pointer"
      >
        <IoMdCloseCircle size={24} />
      </div>
      <Link
        to={"/"}
        className="flex flex-col justify-center items-center p-4 gap-2"
      >
        <img src={logo} alt="logo" className="w-[200px] object-contain" />
        <small className="text-white font-semibold text-base">
          Admin Workspace
        </small>
      </Link>
      <div>
        {adminSidebar.map((el) => (
          <Fragment key={el.id}>
            {el.type === "SINGLE" && (
              <NavLink
                to={el.path}
                className={({ isActive }) =>
                  clsx(isActive && activedStyle, !isActive && notActivedStyle)
                }
              >
                <span>{el.icon}</span>
                <span>{el.text}</span>
              </NavLink>
            )}
            {el.type === "PARENT" && (
              <div
                onClick={() => handleShowTabs(+el.id)}
                className="flex flex-col"
              >
                <div className="flex items-center justify-between px-4 py-2 hover:bg-blue-100 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <span>{el.icon}</span>
                    <span>{el.text}</span>
                  </div>
                  {actived.some((id) => id === el.id) ? (
                    <AiOutlineCaretRight />
                  ) : (
                    <AiOutlineCaretDown />
                  )}
                </div>
                {actived.some((id) => +id === +el.id) && (
                  <div className="flex flex-col">
                    {el.submenu.map((item) => (
                      <NavLink
                        key={el.text}
                        to={item.path}
                        onClick={(e) => e.stopPropagation()}
                        className={({ isActive }) =>
                          clsx(
                            isActive && activedStyle,
                            !isActive && notActivedStyle,
                            "pl-16"
                          )
                        }
                      >
                        {item.text}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default memo(AdminSidebar);
