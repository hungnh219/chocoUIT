import SelectQuantity from "components/common/SelectQuantity";
import React, { useEffect, useState } from "react";
import { formatMoney } from "ultils/helpers";
import { updateCart } from "store/user/userSlice";
import withBaseComponent from "hocs/withBaseComponent";
import { apiRemoveCart } from "apis";
import { getCurrent } from "store/user/asyncActions";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { ImBin } from "react-icons/im";
const OrderItem = ({
  dispatch,
  color,
  dfQuantity = 1,
  price,
  title,
  thumbnail,
  pid,
}) => {
  const [quantity, setQuantity] = useState(() => dfQuantity);
  const handleQuantity = (number) => {
    if (+number > 1) setQuantity(number);
  };
  const handleChangeQuantity = (flag) => {
    if (flag === "minus" && quantity === 1) return;
    if (flag === "minus") setQuantity((prev) => +prev - 1);
    if (flag === "plus") setQuantity((prev) => +prev + 1);
  };
  useEffect(() => {
    dispatch(updateCart({ pid, quantity, color }));
  }, [quantity]);
  // Set quantity
  //   detete Cart
  const removeCart = async (pid, color) => {
    const response = await apiRemoveCart(pid, color);
    if (response.success) {
      dispatch(getCurrent());
    } else toast.error(response.mes);
  };

  const [isActive, setActive] = useState(false);
  return (
    <div className="w-full mx-auto border-b-2 border-main font-bold py-3 grid grid-cols-10">
      <span className="col-span-4 w-full text-center">
        <div className="flex gap-2 px-4 py-3">
          <img
            src={thumbnail}
            alt="thumb"
            className="w-28 h-28 object-cover rounded"
          />
          <div className="flex flex-col items-start gap-1">
            <span className="text-sm text-main">{title}</span>
            <span className="text-[10px] font-main">{color}</span>
          </div>
        </div>
      </span>
      <span className="col-span-2 w-full">
        <div className="flex items-center justify-center h-full">
          <SelectQuantity
            quantity={quantity}
            handleQuantity={handleQuantity}
            handleChangeQuantity={handleChangeQuantity}
          />
        </div>
      </span>
      <span className="col-span-2 w-full h-full flex items-center justify-center text-center">
        <span className="text-lg">
          {formatMoney(price * quantity) + " VND"}
        </span>
      </span>
      <span
        onClick={() => removeCart(pid, color)}
        className="col-span-2 h-full w-full rounded-full flex items-center justify-center cursor-pointer"
      >
        {isActive ? (
          <ImBin size={16} color="white" />
        ) : (
          <ImBin size={16} color="black" />
        )}
      </span>
    </div>
  );
};

export default withBaseComponent(OrderItem);
