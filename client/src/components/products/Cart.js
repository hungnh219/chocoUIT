import Button from "components/buttons/Button";
import withBaseComponent from "hocs/withBaseComponent";
import React, { memo } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import { showCart } from "store/app/appSlice";
import { formatMoney } from "ultils/helpers";
import { ImBin } from "react-icons/im";
import { apiRemoveCart } from "apis";
import { getCurrent } from "store/user/asyncActions";
import { toast } from "react-toastify";
import path from "ultils/path";
import Swal from "sweetalert2";
import { createSearchParams } from "react-router-dom";

const Cart = ({ dispatch, navigate, location }) => {
  const { currentCart, current } = useSelector((state) => state.user);
  const removeCart = async (pid, color) => {
    const response = await apiRemoveCart(pid, color);
    if (response.success) {
      dispatch(getCurrent());
    } else toast.error(response.mes);
  };

  const handleSubmit = () => {
    if (!current?.address)
      return Swal.fire({
        icon: "info",
        title: "Almost!",
        text: "Please update your address before checkout.",
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: "Go update",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed)
          navigate({
            pathname: `/${path.MEMBER}/${path.PERSONAL}`,
            search: createSearchParams({
              redirect: location.pathname,
            }).toString(),
          });
      });
    else window.open(`/${path.CHECKOUT}`, "_blank");
  };

  // Fix category page
  // Payment method
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed w-[30%] h-screen bg-black grid grid-rows-10 text-white p-6"
    >
      <header className="border-b border-gray-500 flex justify-between items-center row-span-1 h-full font-bold text-2xl">
        <span>Giỏ hàng phụ</span>
        <span
          onClick={() => dispatch(showCart())}
          className="p-2 cursor-pointer"
        >
          <AiFillCloseCircle size={24} />
        </span>
      </header>
      <section className="row-span-7 flex flex-col gap-3 h-[90%] max-h-[90%] overflow-y-auto py-3">
        {!currentCart && (
          <span className="text-xs italic">Your cart is empty.</span>
        )}
        {currentCart &&
          currentCart?.map((el) => (
            <div key={el._id} className="flex justify-between items-center">
              <div className="flex gap-2">
                <img
                  src={el.thumbnail}
                  alt="thumb"
                  className="w-12 h-12 object-cover"
                />
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-main">{el.title}</span>
                  <span className="text-xs">{el.color}</span>
                  <span className="text-xs">{`Quantity: ${el.quantity}`}</span>
                  <span className="text-sm">
                    {formatMoney(el.price) + " VND"}
                  </span>
                </div>
              </div>
              <span
                onClick={() => removeCart(el.product?._id, el.color)}
                className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer"
              >
                <ImBin size={16} />
              </span>
            </div>
          ))}
      </section>
      <div className="flex flex-col justify-between h-full text-sm -mt-4">
        <div className="flex items-center justify-between pt-4 border-t">
          <span>Tạm tính:</span>
          <span>
            {formatMoney(
              currentCart?.reduce(
                (sum, el) => sum + Number(el.price) * el.quantity,
                0
              )
            ) + " VND"}
          </span>
        </div>
        {/* <span className="text-center text-gray-300 italic text-xs">
          Shipping, taxes, and discounts calculated at checkout.
        </span> */}
        <Button
            handleOnClick={() => {
              dispatch(showCart());
              navigate(`/${path.MEMBER}/${path.DETAIL_CART}`);
            }}
            fw={1}
          >
            Giỏ hàng
          </Button>
          <Button
            handleOnClick={handleSubmit}
            fw={1}
          >
            Thanh toán
          </Button>
      </div>
    </div>
  );
};

export default withBaseComponent(memo(Cart));
