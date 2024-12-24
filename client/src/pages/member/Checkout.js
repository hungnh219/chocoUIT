import React, { useEffect, useState } from "react";
import axios from "../../axios"

import payment from "assets/payment.svg";
import { useSelector } from "react-redux";
import { formatMoney } from "ultils/helpers";
import { Button, Congrat, InputForm, Paypal } from "components";
import withBaseComponent from "hocs/withBaseComponent";
import { getCurrent } from "store/user/asyncActions";
import path from "ultils/path";

const Checkout = ({ dispatch, navigate }) => {
  const { currentCart, current } = useSelector((state) => state.user);
  const [isSuccess, setIsSuccess] = useState(false);
  useEffect(() => {
    if (isSuccess) dispatch(getCurrent());
  }, [isSuccess]);

  return (
    <div className="p-8 w-full grid grid-cols-10 h-full max-h-screen overflow-y-auto gap-6">
      {isSuccess && <Congrat />}
      <div className="w-full flex justify-center items-center col-span-4">
        <img src={payment} alt="payment" className="h-[70%] object-contain" />
      </div>
      <div className="flex w-full flex-col justify-center col-span-6 gap-6">
        <h2 className="text-3xl mb-6 font-bold">Checkout your order</h2>
        <div className="flex w-full gap-6">
          <div className="flex-1">
            <table className="table-auto h-fit">
              <thead>
                <tr className="border bg-gray-200">
                  <th className="p-2 text-left">Products</th>
                  <th className="text-center p-2">Quantity</th>
                  <th className="text-right p-2">Price</th>
                </tr>
              </thead>
              <tbody>
                {currentCart?.map((el) => (
                  <tr className="border" key={el._id}>
                    <td className="text-left p-2">{el.title}</td>
                    <td className="text-center p-2">{el.quantity}</td>
                    <td className="text-right p-2">
                      {formatMoney(el.price) + " VND"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex-1 flex flex-col justify-between gap-[45px]">
            <div className="flex flex-col gap-6">
              <span className="flex items-center gap-8 text-sm">
                <span className="font-medium">Subtotal:</span>
                <span className="text-main font-bold">{`${formatMoney(
                  currentCart?.reduce(
                    (sum, el) => +el?.price * el.quantity + sum,
                    0
                  )
                )} VND`}</span>
              </span>
              <span className="flex items-center gap-8 text-sm">
                <span className="font-medium">Address:</span>
                <span className="text-main font-bold">{current?.address}</span>
              </span>
            </div>
            <button className="w-full mx-auto custom-bg-color-momo py-3 text-2xl hover:bg-pink-600 font-sf-momo px-4 rounded text-white font-bold" 
                    onClick={()=>{
                      
                      let pr=currentCart && currentCart.length > 0
                      ? currentCart.reduce((sum, el) => +el?.price * el.quantity + sum, 0)
                      : "100000";
                      // pr *= 1000;
                      // let pr = currentCart && currentCart.length > 0
                      //   ? currentCart.reduce((sum, el) => +el?.price * el.quantity + sum, 0).toString()
                      //   : "100000";
                      // let pr = "100000";
                      const data = {
                        // priceGlobal: toString(pr),
                        priceGlobal: pr,
                      };
                      console.log("current cart",currentCart);
                      console.log(pr);
                      console.log(typeof(toString(pr)));
                      
                      // let pr = currentCart.price;
                      // console.log(pr);
                      // const data = {
                      //   priceGlobal: pr, // Sử dụng giá trị subtotal được tính
                      // };

                      // Gửi yêu cầu POST sử dụng Axios
                      fetch('http://localhost:5000/api/order/momopayment/', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        // body: JSON.stringify(data)
                        body: JSON.stringify({
                          priceGlobal: pr
                        })
                      })
                      .then(response => {
                        if (!response.ok) {
                          throw new Error('Network response was not ok');
                        }
                        return response.json();
                      })
                      .then(data => {
                        console.log('Response from server:', data);
                        // Xử lý kết quả nếu cần
                        window.open(data.payUrl, '_blank');
                        // console.log(data.payUrl, 'Momo Payment', 800, 600);
                      })
                      .catch(error => {
                        console.error('There was a problem with your fetch operation:', error);
                        // Xử lý lỗi nếu cần
                      });
                    }}
            >momo </button>

            <div className="w-full mx-auto">
              <Paypal
                payload={{
                  products: currentCart,
                  total: Math.round(
                    +currentCart?.reduce(
                      (sum, el) => +el?.price * el.quantity + sum,
                      0
                    ) / 23500
                  ),
                  address: current?.address,
                }}
                setIsSuccess={setIsSuccess}
                amount={Math.round(
                  +currentCart?.reduce(
                    (sum, el) => +el?.price * el.quantity * 1000 + sum,
                    0
                  ) / 23500
                )}
              />
            </div>
            <div>
              <Button
                handleOnClick={() => {
                  // dispatch(showCart());
                  navigate(`/${path.HOME}`);
                }}
                style="rounded w-full bg-main py-3 mt-2 text-lg text-white font-semibold hover:bg-amber-300	"
              >
                Quay lại trang chủ
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withBaseComponent(Checkout);
