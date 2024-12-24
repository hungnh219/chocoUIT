import React, { useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";

function NavigationBar() {
  const location = useLocation();

  useEffect(() => {
    console.log("Current path is:", location.pathname);
    // Có thể thực hiện thêm một số logic ở đây nếu cần
  }, [location]);

  return (
    <div className="w-main border p-4 flex justify-between mt-6 m-auto mr-7 font-semibold ">
      <NavLink
        to="/products"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "hover:text-main"
            : "hover:text-main"
        }
      >
        Tất cả
      </NavLink>
      {/* <NavLink
        to="/bánh%20mì?brand=Bánh+mì&page=1"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "hover:text-main"
            : "hover:text-main"
        }
      >
        Bánh mì
      </NavLink>
      <NavLink
        to="/hamburger?brand=Hamburger&page=1"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "hover:text-main"
            : "hover:text-main"
        }
      >
        Hamburger
      </NavLink>
      <NavLink
        to="/bánh%20ngọt?brand=Bánh+ngọt&page=1"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "hover:text-main"
            : "hover:text-main"
        }
      >
        Bánh ngọt
      </NavLink>
      <NavLink
        to="/bánh%20mặn?brand=Bánh+mặn&page=1"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "hover:text-main"
            : "hover:text-main"
        }
      >
        Bánh mặn
      </NavLink>
      <NavLink
        to="/bánh%20kem?brand=Bánh+kem&page=1"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "hover:text-main"
            : "hover:text-main"
        }
      >
        Bánh kem
      </NavLink>
      <NavLink
        to="/khác?brand=Đồ+ăn&page=1"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "hover:text-main"
            : "hover:text-main"
        }
      >
        Khác
      </NavLink> */}
      <NavLink
        to="/chocolate?brand=Chocolate&page=1"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "hover:text-main"
            : "hover:text-main"
        }
      >
        Chocolate
      </NavLink>
      <NavLink
        to="/nguyên%20liệu?brand=Nguyên+liệu&page=1"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "hover:text-main"
            : "hover:text-main"
        }
      >
        Nguyên liệu
      </NavLink>
      <NavLink
        to="/ly?brand=Ly&page=1"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "hover:text-main"
            : "hover:text-main"
        }
      >
        Ly
      </NavLink>
      <NavLink
        to="/combo?brand=Combo&page=1"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "hover:text-main"
            : "hover:text-main"
        }
      >
        Combo
      </NavLink>
    </div>
  );
}

export default NavigationBar;
