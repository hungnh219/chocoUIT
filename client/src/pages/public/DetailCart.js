import { Breadcrumb, Button } from "components";
import OrderItem from "components/products/OrderItem";
import withBaseComponent from "hocs/withBaseComponent";
import { useSelector } from "react-redux";
import { Link, createSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { formatMoney } from "ultils/helpers";
import path from "ultils/path";

const DetailCart = ({ location, navigate }) => {
  const { currentCart, current } = useSelector((state) => state.user);
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
  return (
    <div className="w-full px-3 flex flex-col items-center">
      <div className="py-4 w-full flex justify-center items-center border-b-2 border-main">
        <div className="w-main">
          <h3 className="font-semibold text-3xl uppercase text-center text-main">
            Giỏ hàng
          </h3>
          {/* <Breadcrumb category={location?.pathname?.replace('/', '')?.split('-')?.join(' ')} /> */}
        </div>
      </div>
      <div className="flex flex-col w-main mx-auto my-8 border-x-2 border-main">
        <div className="w-full text-white mx-auto bg-main text-lg font-semibold py-3 grid grid-cols-10">
          <span className="col-span-4 w-full text-center px-4 border-r-2">
            Sản phẩm
          </span>
          <span className="col-span-2 w-full text-center px-4 border-r-2">
            Số lượng
          </span>
          <span className="col-span-2 w-full text-center px-4 border-r-2">
            Giá
          </span>
          <span className="col-span-2 w-full text-center px-4">Xóa</span>
        </div>
        {currentCart?.map((el) => (
          <OrderItem
            key={el._id}
            dfQuantity={el.quantity}
            color={el.color}
            title={el.title}
            thumbnail={el.thumbnail}
            price={el.price}
            pid={el.product?._id}
          />
        ))}
      </div>
      <div className="w-main mx-auto flex flex-col mb-12 justify-center items-end gap-3">
        <span className="flex items-center gap-8 text-sm">
          <span>Subtotal:</span>
          <span className="text-main font-bold">{`${formatMoney(
            currentCart?.reduce((sum, el) => +el?.price * el.quantity + sum, 0)
          )} VND`}</span>
        </span>
        <span className="text-xs italic">
          Shipping, taxes, and discounts calculated at checkout
        </span>
        <Button handleOnClick={handleSubmit}>Checkout</Button>
      </div>
    </div>
  );
};

export default withBaseComponent(DetailCart);
