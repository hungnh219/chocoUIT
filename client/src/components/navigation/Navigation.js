import React, { memo } from "react";
import { navigation } from "ultils/contants";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="w-main h-[48px] py-2 text-sm flex items-center justify-center">
      {navigation.map((el) => (
        <NavLink
          to={el.path}
          key={el.id}
          className={({ isActive }) =>
            isActive
              ? "mx-6 py-2 font-semibold text-base hover:text-main text-main shadow-[0px_4px_0px_0px_rgba(236,193,61,1)]"
              : "mx-6 py-2 font-semibold text-base hover:text-main"
          }
        >
          {el.value}
        </NavLink>
      ))}
    </div>
  );
};

export default memo(Navigation);
