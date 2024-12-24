import React, { memo, Fragment, useState } from "react"
import avatar from "assets/avatarDefault.png"
import { memberSidebar } from "ultils/contants"
import { NavLink, Link } from "react-router-dom"
import clsx from "clsx"
import { AiOutlineCaretDown, AiOutlineCaretRight } from "react-icons/ai"
import { useSelector } from "react-redux"
import { FaArrowLeft } from "react-icons/fa";

const activedStyle =
  "px-4 py-2 flex items-center gap-2  bg-gray-500 text-gray-100"
const notActivedStyle = "px-4 py-2 flex items-center gap-2  hover:bg-blue-100"

const MemberSidebar = () => {
  const [actived, setActived] = useState([])
  const { current } = useSelector((state) => state.user)
  const handleShowTabs = (tabID) => {
    if (actived.some((el) => el === tabID))
      setActived((prev) => prev.filter((el) => el !== tabID))
    else setActived((prev) => [...prev, tabID])
  }

  return (
    <div className=" bg-main h-screen py-4 w-[20%] flex-none fixed z-10">
      <div className="w-full flex flex-col items-center justify-center py-4">
        <img
          src={current?.avatar || avatar}
          alt="logo"
          className="w-16 h-16 object-cover rounded-full"
        />
        <small>{`${current?.lastname} ${current?.firstname}`}</small>
      </div>
      <div>
        {memberSidebar.map((el, idx) => (
          <Fragment key={idx}>
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
        <NavLink to={"/"} className={clsx(`absolute top-4 left-2 opacity-70 hover:opacity-100 hover:-translate-y-1 hover:scale-105 duration-300`)}>
          <FaArrowLeft size={24} />
        </NavLink>
      </div>
    </div>
  )
}

export default memo(MemberSidebar)
